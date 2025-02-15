import { Body, Controller, Get, HttpCode, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserRequest, RegisterUserRequest, ResetRequest, UpdateUserRequest, UpdateUserRespone, UserResponse } from '../model/user.model';
import { WebResponse } from 'src/model/web.model';
import { JwtGuard } from './guards/jwt.guard';

/*
    controller for user

    route
    login: PATCH /api/user
    register: POST /api/user
    get user by id: GET /api/user/:id
    refresh token: POST /api/user/refresh
    reset password: POST /api/user/reset
    send verification: PATCH /api/user/reset
*/

@Controller('/api/user')
export class UserController {
    constructor(
        private UserService: UserService
    ) { }


    @UseGuards(JwtGuard)
    @Get(':id')
    @HttpCode(200)
    async getUserById(
        @Param('id') id: string
    ): Promise<WebResponse<UserResponse>> {
        const result = await this.UserService.findByid(id);
        return {
            data: result,
        }
    }

    @UseGuards(JwtGuard)
    @Put()
    @HttpCode(200)
    async updateUser(
        @Body() request: UpdateUserRequest
    ): Promise<WebResponse<UpdateUserRespone>> {
        const result = await this.UserService.update(request);
        return {
            data: result,
        }
    }
}
