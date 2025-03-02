import { logoutRequest } from './../model/user.model';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validate.service';
import { Logger } from 'winston';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginUserRequest, RegisterUserRequest, ResetRequest, UserResponse } from 'src/model/user.model';
import { sendMail } from 'src/utils/mailer';
import { authValidation } from './auth.validation';

@Injectable()
export class AuthService {
    constructor(
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) { }


    async login(request: LoginUserRequest): Promise<UserResponse> {
        this.logger.info(`Logging in user ${JSON.stringify(request)}`);
        const loginRequest: LoginUserRequest = this.validationService.validate(
            authValidation.LOGIN,
            request,
        );

        const user = await this.prismaService.user.findFirst({
            where: {
                username: loginRequest.username,
            },
        });

        if (!user) {
            throw new HttpException('Invalid username or password', 400);
        }

        const isPasswordMatch = await bcrypt.compare(
            loginRequest.password,
            user.password,
        );

        if (!isPasswordMatch) {
            throw new HttpException('Invalid username or password', 400);
        }

        const data = await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: {
                token: uuidv4(),
                lastLogin: new Date(),
            },
        });

        const payload = {
            username: user.username,
            isAdmin: user.isAdmin,
            sub: {
                name: user.name,
            },
        };

        return {
            id: data.id,
            username: data.username,
            name: data.name ?? "",
            isAdmin: data.isAdmin,
            token: data.token ?? "",
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '1h',
                    privateKey: process.env.JWT_SECRET_KEY,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    privateKey: process.env.JWT_REFRESH_TOKEN
                }),
            },
        };
    }



    async register(request: RegisterUserRequest): Promise<UserResponse> {
        this.logger.info(`Registering new user ${JSON.stringify(request)}`);
        const registerRequest: RegisterUserRequest =
            this.validationService.validate(authValidation.REGISTER, request);

        const totalUserWithSameUsername = await this.prismaService.user.count({
            where: {
                username: registerRequest.username,
            },
        });

        const totalUserWithSameEmail = await this.prismaService.user.count({
            where: {
                email: registerRequest.email,
            },
        })


        if (totalUserWithSameUsername != 0 || totalUserWithSameEmail != 0) {
            this.logger.info(`Username already exists`);
            throw new HttpException('Username already exists', 409);
        }
        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await this.prismaService.user.create({
            data: {
                ...registerRequest,
                profilePic:'https://files.edgestore.dev/93ti9i3vqygrxg8l/myPublicImage/_public/b7608d16-14b6-4e2c-8efd-1ded26235976.png'
            }
        });

        return {
            id: user.id,
            isAdmin: user.isAdmin,
            username: user.username,
            name: user.name ?? "",
        };
    }


    async resetPassword(request: ResetRequest): Promise<string> {
        this.logger.info(`reset password user ${JSON.stringify(request)}`);

        const resetUser: ResetRequest = this.validationService.validate(
            authValidation.RESET_PASSWORD,
            request,
        );

        const totalUserWithSameEmail = await this.prismaService.user.count({
            where: {
                email: resetUser.email,
            },
        });

        if (totalUserWithSameEmail === 0) {
            throw new HttpException('email not exists', 400);
        }

        const valToken = await this.prismaService.user.findFirst({
            where: { valToken: resetUser.valToken },
        });

        if (!valToken) {
            throw new HttpException('Invalid token', 400);
        }

        resetUser.password = await bcrypt.hash(resetUser.password, 10);

        await this.prismaService.user.update({
            where: { email: resetUser.email },
            data: {
                password: resetUser.password,
                valToken: null,
            },
        });

        return 'reset successful';
    }




    async sendMailVerification(request: { email: string }): Promise<string> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: request.email,
            },
        });

        if (!user) {
            throw new HttpException('User not found', 404);
        }

        const valToken = uuidv4();

        await this.prismaService.user.update({
            where: {
                email: request.email,
            },
            data: {
                valToken,
            },
        });
       

        const result = sendMail({ email: request.email, subject: 'Email verification', text: 'Email verification', valtoken: valToken });

        return result;
    }


    async logout(request: logoutRequest): Promise<string> {
        console.log(request)
        if (!request.username) {
            throw new HttpException('User not found', 404);
        }
        const logoutUser: logoutRequest = this.validationService.validate(
            authValidation.LOGOUT,
            request,
        )

        const isValid = await this.prismaService.user.findFirst({
            where: {
                token:request.token
            }
        })


        if(!isValid){
            throw new HttpException('Unauthorized', 401);
        }


        await this.prismaService.user.update({
            where: {
                username: logoutUser.username,
            },
            data: {
                token: null,
            },
        });

        return 'logout successful';
    }


    async refreshToken(user: any): Promise<UserResponse> {
        const payload = {
            username: user.username,
            sub: {
                name: user.name,
            },
        };

        console.log(payload)
        return {
            id: user.id,
            username: user.username,
            name: user.name,
            isAdmin: user.isAdmin,
            token: user.token,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '1h',
                    privateKey: process.env.JWT_SECRET_KEY,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    privateKey: process.env.JWT_REFRESH_TOKEN,
                }),
            },
        };
    }

}
