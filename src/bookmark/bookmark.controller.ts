import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { WebResponse } from 'src/model/web.model';
import { CreateBookmarkRequest, GetBookmarkResponse } from 'src/model/bookmark.model';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('api/bookmark')
export class BookmarkController {
    constructor(
        private BookmarkService: BookmarkService
    ) { }

    @Post()
    @HttpCode(200)
    async createBookmark(
        @Body() request: CreateBookmarkRequest
    ): Promise<WebResponse<string>> {
        const result = await this.BookmarkService.createBookmark(request);
        return {
            message: result,
        }
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    @HttpCode(200)
    async deleteBookmark(
        @Param('id') id: string,
    ): Promise<WebResponse<string>> {
        const result = await this.BookmarkService.deleteBookmark(id);
        return {
            message: result,
        }
    }

    @Get('list/:id')
    @HttpCode(200)
    async getBookmarkList(
        @Param('id') id: string,
    ): Promise<WebResponse<GetBookmarkResponse[]>> {
        const result = await this.BookmarkService.getBookmarkList(id);
        return {
            data: result,
        }
    }


    @Get('user/:userId')
    @HttpCode(200)
    async getBookmarkByUserId(
        @Param('userId') userId: string,
    ): Promise<WebResponse<GetBookmarkResponse[]>> {
        const result = await this.BookmarkService.getBookmarkByUserId(userId);
        return {
            data: result,
        }
    }    
}
