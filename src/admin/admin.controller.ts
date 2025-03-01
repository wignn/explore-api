import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { WebResponse } from 'src/model/web.model';
import { JwtService } from '@nestjs/jwt';

@Controller('api/admin')
export class AdminController {
    constructor(
        private AdminService: AdminService
    ) {}

    @UseGuards(JwtService)
    @Get('user')
    @HttpCode(200)
    async getUserList(): Promise<WebResponse<any>> {
        const result = await this.AdminService.getUserList();
        return {
            data: result
        }
    }

    @UseGuards(JwtService)
    @Get('user/session')
    @HttpCode(200)
    async getUserSession(): Promise<WebResponse<any>> {
        const result = await this.AdminService.getUserSession();
        return {
            data: result
        }
    }

    @UseGuards(JwtService)
    @Get('chapter')
    @HttpCode(200)
    async getChapterList(): Promise<WebResponse<any>> {
        const result = await this.AdminService.getChapterList();
        return {
            data: result
        }
    }

    @UseGuards(JwtService)
    @Get('genre')
    @HttpCode(200)
    async getGenreList(): Promise<WebResponse<any>> {
        const result = await this.AdminService.getGenreList();
        return {
            data: result
        }
    }

    @UseGuards(JwtService)
    @Get('bookmark')
    @HttpCode(200)
    async getBookmarkList(): Promise<WebResponse<any>> {
        const result = await this.AdminService.getBookmarkList();
        return {
            data: result
        }
    }

    @UseGuards(JwtService)
    @Get('book')
    @HttpCode(200)
    async getBookList(): Promise<WebResponse<any>> {
        const result = await this.AdminService.getBookList();
        return {
            data: result
        }
    }
}
