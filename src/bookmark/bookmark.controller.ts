import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { WebResponse } from '../model/web.model';
import { CreateBookmarkRequest, GetBookmarkResponse } from '../model/bookmark.model';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('api/bookmark')
export class BookmarkController {
    constructor(
        private BookmarkService: BookmarkService
    ) { }

    @Post()
    @HttpCode(200)
    async createBookmark(
        @Body() request: CreateBookmarkRequest
    ): Promise<WebResponse<{
        id: string,
        bookId: string,
        userId: string
    }>> {
        const result = await this.BookmarkService.createBookmark(request);
        return {
            data: result,
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


    @Get('isBookmarked/:userId/:bookId')
    @HttpCode(200)
    async isBookmarked(
        @Param('userId') userId: string,
        @Param('bookId') bookId: string,
    ): Promise<WebResponse<string>> {
        const result = await this.BookmarkService.isBookmark(userId, bookId);
        return {
            data: result,
        }
    }
}
