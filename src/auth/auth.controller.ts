import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body, HttpCode, Patch, UseGuards } from '@nestjs/common';
import { RegisterUserRequest, LoginUserRequest, ResetRequest, UserResponse } from '../model/user.model';
import { WebResponse } from 'src/model/web.model';
import { JwtGuard } from 'src/guards/jwt.guard';
@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('register')
    @HttpCode(200)
    async register(
        @Body() request: RegisterUserRequest
    ): Promise<WebResponse<UserResponse>> {
        const result = await this.authService.register(request);
        return {
            data: result,
        }
    }

    @Patch('login')
    @HttpCode(200)
    async login(
        @Body() request: LoginUserRequest
    ): Promise<WebResponse<UserResponse>> {
        const result = await this.authService.login(request);
        console.log(result);
        return {
            data: result,
        }
    }

    @UseGuards(JwtGuard)
    @Post('refresh')
    @HttpCode(200)
    async refreshToken(
        @Body() request: LoginUserRequest
    ): Promise<WebResponse<UserResponse>> {
        const result = await this.authService.refreshToken(request)
        return {
            data: result,
        }
    }

    @Post('password/reset')
    @HttpCode(200)
    async resetpassword(
        @Body() request: ResetRequest
    ): Promise<WebResponse<string>> {
        const result = await this.authService.resetPassword(request)
        return {
            message: result,
        }
    }

    @Patch('password/verify')
    @HttpCode(200)
    async sendVerification(
        @Body() request: { email: string }
    ): Promise<WebResponse<string>> {
        const result = await this.authService.sendMailVerification(request)
        return {
            message: result,
        }
    }
}
