import { WebResponse } from 'src/model/web.model';
import { BookService } from './book.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { BookRes, CreateBookRequest, UpdateBookResponse } from 'src/model/book.model';
import { BookGuard } from './guard/book.guard';

@Controller('api/book')
export class BookController {
    constructor(
        private BookService: BookService
    ) {}
    @UseGuards(BookGuard)
    @Post()
    @HttpCode(200)
    async createBook(
        @Body() request: CreateBookRequest
    ): Promise<WebResponse<string>> {
        const result = await this.BookService.createBook(request);
        return {
            message: result,
        }
    }

    @Get('list')
    @HttpCode(200)
    async getBookList(): Promise<WebResponse<BookRes[]>> {
        const result = await this.BookService.getBookList();
        return {
            data: result,

        }
    }


    @UseGuards(BookGuard)
    @Post(':id')
    @HttpCode(200)
    async updateBook(
        @Param('id') id: string,
        @Body() request: CreateBookRequest,
    ): Promise<WebResponse<UpdateBookResponse>> {
        const result = await this.BookService.updateBook(id, request);
        return {
            data: result,
        }
    }

    

    @UseGuards(BookGuard)
    @Delete(':id')
    @HttpCode(200)
    async deleteBook(
        @Param('id') id: string,
    ): Promise<WebResponse<string>> {
        const result = await this.BookService.deleteBook(id);
        return {
            message: result,
        }
    }
}
