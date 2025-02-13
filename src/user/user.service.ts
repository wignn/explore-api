import { JwtService } from '@nestjs/jwt';
import { ValidationService } from './../common/validate.service';
import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { Logger } from 'winston';
import { LoginUserRequest, RegisterUserRequest, UserResponse } from 'src/model/user.model';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private JwtService: JwtService
    ) {}

    async register(request:RegisterUserRequest):Promise<UserResponse>{
        this.logger.info(`Registering user ${JSON.stringify(request)}`);
        const registerRequest:RegisterUserRequest = this.validationService.validate(UserValidation.REGISTER, request);

        const totalUserWithSameUsername = await this.prismaService.user.count({
            where:{
                username:registerRequest.username
            }
        })

        if(totalUserWithSameUsername > 0){
            throw new Error('Username already exists');
        }
        
        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await this.prismaService.user.create({
            data: registerRequest,
        })

        return {
            id: user.id,
            username: user.username,
            name: user.name ?? ''
        }
    }

    async login(request: LoginUserRequest): Promise<UserResponse> {
        this.logger.info(`Logging in user ${JSON.stringify(request)}`);
        const loginRequest: LoginUserRequest = this.validationService.validate(UserValidation.LOGIN, request);

        const user = await this.prismaService.user.findFirst({
            where:{
                username: loginRequest.username
            }
        })

        if(!user){
            throw new Error('Invalid username or password');
        }

        const isPasswordMatch = await bcrypt.compare(loginRequest.password, user.password);

        if(!isPasswordMatch){
            throw new Error('Invalid username or password');
        }

        const data = await this.prismaService.user.update({
            where:{
                id: user.id
            },
            data:{
                lastLogin: new Date()
            }
        })

        const payload = {
            username: user.username,
            sub:{
                name: user.name,
            }
        }

        return {
            id: user.id,
            username: user.username,
            name: user.name ?? '',
            token: this.JwtService.sign(payload),
            backendTokens : {
                accessToken: await this.JwtService.signAsync(payload, {
                    expiresIn: '1h',
                    privateKey: process.env.JWT_PRIVATE_KEY,
                }),

                refreshToken: await this.JwtService.signAsync(payload, {
                    expiresIn: '7d',
                    privateKey: process.env.JWT_PRIVATE_KEY,
                })
            }
        }
    }
}
