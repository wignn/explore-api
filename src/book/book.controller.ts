import { WebResponse } from '../model/web.model';
import { BookService } from './book.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  BookRes,
  CreateBookRequest,
  CreateBookResponse,
  UpdateBookResponse,
} from '../model/book.model';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('api/book')
export class BookController {
  constructor(private BookService: BookService) {}

  @UseGuards(JwtGuard)
  @Post()
  @HttpCode(200)
  async createBook(
    @Body() request: CreateBookRequest,
  ): Promise<WebResponse<CreateBookResponse>> {
    const result = await this.BookService.createBook(request);
    return {
      data: result,
    };
  }

  @Get('list')
  @HttpCode(200)
  async getBookList(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('genre') genre: string,
    @Query('status') status: string,
    @Query('language') language: string,
    @Query('author') author: string,
    @Query('title') title: string,
): Promise<WebResponse<{books: BookRes[], totalBooks: number, totalPage: number}>> {
    const result = await this.BookService.getBookList(page, limit, genre, status, language, author, title);
    return {
      data: { books: result.books, totalBooks: result.totalBooks, totalPage: result.totalPage },
    };
  }

  @Get(':id')
  @HttpCode(200)
  async getBook(@Param('id') query: string): Promise<WebResponse<BookRes>> {
    const result = await this.BookService.getBookQuery(query);
    return {
      data: result,
    };
  }

  @Get(':id/:page')
  @HttpCode(200)
  async getBookListPage(
    @Param('id') query: string,
    @Param('page') page: number,
  ): Promise<WebResponse<BookRes>> {
    const result = await this.BookService.getBookQueryPage(query, page);
    return {
      data: result,
    };
  }

  @UseGuards(JwtGuard)
  @Post(':id')
  @HttpCode(200)
  async updateBook(
    @Param('id') id: string,
    @Body() request: CreateBookRequest,
  ): Promise<WebResponse<UpdateBookResponse>> {
    const result = await this.BookService.updateBook(id, request);
    return {
      data: result,
    };
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteBook(@Param('id') id: string): Promise<WebResponse<string>> {
    const result = await this.BookService.deleteBook(id);
    return {
      message: result,
    };
  }
}
