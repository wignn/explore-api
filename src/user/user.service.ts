
import { ValidationService } from './../common/validate.service';
import {
    UpdateUserRequest,
    UpdateUserRespone,
    UserGetResponse,
} from './../model/user.model';
import { PrismaService } from '../common/prisma.service';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UserValidation } from './user.validation';


/*
   service for user controller

*/
@Injectable()
export class UserService {
    constructor(
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
    ) { }


    async findByid(request: string): Promise<UserGetResponse> {
        const user = await this.prismaService.user.findFirst({
            where: {
                OR: [
                    { id: request },
                    { username: { contains: request } },
                    { email: request },
                ],
            },
            include: {
                bookmarks: true
            },
            
        });

        if (!user) {
            throw new HttpException(`User not found`, 404);
        }

        return {
            id: user.id,
            username: user.username,
            name: user.name ?? "",
            profilePic: user.profilePic ?? "",
            email: user.email,
            createdAt: user.createdAt.toISOString(),
            token: user.token ?? "",
            isAdmin: user.isAdmin,
            lastLogin: user.lastLogin?.toISOString() ?? "",
            bookmarks: user.bookmarks.map((bookmark) => ({
                id: bookmark.id,
                bookId: bookmark.bookId
            }))
        
        };
    }


    async update(id: string,  request: UpdateUserRequest): Promise<UpdateUserRespone> {
        this.logger.info(`Updating user ${JSON.stringify(request)}`);
        const updateUser: UpdateUserRequest = this.validationService.validate(
            UserValidation.UPDATE,
            request,
        );

        const user = await this.prismaService.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new HttpException('User not found', 400);
        }

        await this.prismaService.user.update({
            where: { id},
            data: updateUser,
        });

        return {
            id: user.id,
            bio: updateUser.bio,
            name: updateUser.name,
            profilePic: updateUser.profilePic,
        };
    }

    async findUserByToken(token: string) {
        const user = await this.prismaService.user.findFirst({
            where: {
                token,
            },
        });

        return user;
    }

}
