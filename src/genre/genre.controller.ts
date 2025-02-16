import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BookGenreRequest, CreateGenreResponse, GetGenreResponse } from 'src/model/genre.model';
import { WebResponse } from 'src/model/web.model';
import { GenreService } from './genre.service';
import { AdminGuard } from '../book/guard/admin.guard';

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

    @UseGuards(AdminGuard)
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
        @Param('id') id: string
    ): Promise<WebResponse<GetGenreResponse>> {
        console.log(id);
        const result = await this.genreService.getGenreById(id);
        return {
            data: result,
        };
    }


    @UseGuards(AdminGuard)
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

    @UseGuards(AdminGuard)
    @Delete(':id')
    @HttpCode(200)
    async deleteGenre(
        @Param('id') id: string
    ): Promise<WebResponse<string>> {
    
        const result = await this.genreService.deleteGenre(id);
        return {
            message: result,
        };
    }


    /*
    below is the code for relation table between genre and book
    */

    @Post('/book')
    @HttpCode(200)
    async createBookGenre(
        @Body() request: BookGenreRequest
    ){
        const result = await this.genreService.createBookGenreRelation(request);
        return {
            message: result,
        }; 
    }

    @Get('/book/list')
    @HttpCode(200)
    async getGenreBookList(){
        const result = await this.genreService.getGenreBookList();
        return {
            data: result,
        };
    }

    @Get('/book/:id')
    @HttpCode(200)
    async getBookGenre(
        @Param('id') id: string
    ){
        const result = await this.genreService.getBookListByGenreId(id);
        return {
            data: result,
        };
    }




    @Delete('/book/:genreId/:bookId')
    @HttpCode(200)
    async deleteBookGenre(
        @Param('genreId') genreId: string,
        @Param('bookId') bookId: string
    ) {
        const result = await this.genreService.deleteBookGenreRelation({ genreId, bookId });
        return {
            message: result,
        };
    }


    

}
