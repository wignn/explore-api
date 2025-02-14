import { Body, Controller, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserRequest, RegisterUserRequest, UserResponse } from '../model/user.model';
import { WebResponse } from 'src/model/web.model';
import { JwtGuard } from './guards/jwt.guard';

@Controller('/api/user')
export class UserController {
    constructor(
        private UserService: UserService
    ) { }
    @Post()
    @HttpCode(200)
    async register(
        @Body() request: RegisterUserRequest
    ): Promise<WebResponse<UserResponse>> {
        const result = await this.UserService.register(request);
        return {
            data: result,
        }
    }

    @Patch()
    @HttpCode(200)
    async login(
        @Body() request: LoginUserRequest
    ): Promise<WebResponse<UserResponse>> {
        const result = await this.UserService.login(request);
        console.log(result);
        return {
            data: result,
        }
    }

    @UseGuards(JwtGuard)
    @Get()
    @HttpCode(200)
    async getUserById(
        @Param('id') id: string
    ): Promise<WebResponse<UserResponse>> {
        const result = await this.UserService.findByid(id);
        return {
            data: result,
        }
    }


}
