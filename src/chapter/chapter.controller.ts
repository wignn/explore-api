import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { WebResponse } from 'src/model/web.model';
import { chapterResponse, createChapterRequest } from 'src/model/chapter.model';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('api/chapter')
export class ChapterController {
    constructor(
        private chapterService: ChapterService
    ) {}


    @UseGuards(JwtGuard)
    @Post()
    @HttpCode(200)
    async createChapter(
        @Body() request: createChapterRequest
    ): Promise<WebResponse<string>> {
        const result = await this.chapterService.createChapter(request);
        return {
            message:    result
        }
    }

    

    @Get('list')
    @HttpCode(200)
    async getChapterList(): Promise <WebResponse<chapterResponse[]>> {
        const result = await this.chapterService.getChapterList();
        return {
            data: result
        }
    }


    @Get(':bookId')
    @HttpCode(200)
    async getChapterByID(
        @Param('bookId') bookId: string): Promise <WebResponse<chapterResponse>> {
        const result = await this.chapterService.getChapterByID(bookId);
        return {
            data: result
        }
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    @HttpCode(200)
    async deleteChapter(
        @Param('id') id: string): Promise <WebResponse<string>> {
        const result = await this.chapterService.deleteChapter(id);
        return {
            message: result
        }
    }

}
