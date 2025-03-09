import { Body, Controller, Get, HttpCode, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {  UpdateUserRequest, UpdateUserRespone, UserGetResponse, } from '../model/user.model';
import { WebResponse } from '../model/web.model';
import { JwtGuard } from '../guards/jwt.guard';
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
    ): Promise<WebResponse<UserGetResponse>> {
        const result = await this.UserService.findByid(id);
        return {
            data: result,
        }
    }

    @UseGuards(JwtGuard)
    @Put(":id")
    @HttpCode(200)
    async updateUser(
        @Param('id') id: string,
        @Body() request: UpdateUserRequest
    ): Promise<WebResponse<UpdateUserRespone>> {
        const result = await this.UserService.update(id, request);
        return {
            data: result,
        }
    }
}
