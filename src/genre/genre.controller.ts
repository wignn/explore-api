import { Body, Controller, Get, HttpCode, Inject, Param, Post, Put } from '@nestjs/common';
import { CreateGenreResponse, GetGenreResponse } from 'src/model/genre.model';
import { WebResponse } from 'src/model/web.model';
import { GenreService } from './genre.service';

@Controller('api/genre')
export class GenreController {
    constructor(
        private genreService: GenreService
    ){}

    @Get()
    @HttpCode(200)
    async getGenreList(): Promise<WebResponse<GetGenreResponse[]>> {
        const result = await this.genreService.getGenreList();
        return {
            data: result,
        };
    }

    @Post()
    @HttpCode(200)
    async createGenre(
        @Body() request: CreateGenreResponse
    ): Promise<WebResponse<CreateGenreResponse>> {
        const result = await this.genreService.createGenre(request);
        return {
            message: result,
        };
    }


    @Get(':id')
    @HttpCode(200)
    async getGenreById(
        @Body() id: string
    ): Promise<WebResponse<GetGenreResponse>> {
        const result = await this.genreService.getGenreById(id);
        return {
            data: result,
        };
    }

    @Put(':id')
    @HttpCode(200)
    async updateGenre(
        @Body() request: CreateGenreResponse,
        @Param('id') id: string
    ):Promise<WebResponse<string>> {
        const result = await this.genreService.updateGenre(id, request);
        return {
            message: result,
        };
    }



}
