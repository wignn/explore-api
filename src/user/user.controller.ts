import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserRequest, UserResponse } from '../model/user.model';
import { WebResponse } from 'src/model/web.model';

@Controller('/api/user')
export class UserController {
    constructor(
        private UserService: UserService
    ){}
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
}
