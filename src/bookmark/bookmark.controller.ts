import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { WebResponse } from 'src/model/web.model';
import { request } from 'http';
import { CreateBookmarkRequest, GetBookmarkResponse } from 'src/model/bookmark.model';

@Controller('bookmark')
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

    @Get('list')
    @HttpCode(200)
    async getBookmarkList(): Promise<WebResponse<GetBookmarkResponse[]>> {
        const result = await this.BookmarkService.getBookmarkList();
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
