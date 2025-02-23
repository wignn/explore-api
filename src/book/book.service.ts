import { request } from 'http';
import { Inject, Injectable } from '@nestjs/common';
import { ValidationService } from '../common/validate.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { BookRes, CreateBookRequest, CreateBookResponse, updateBookRequest, UpdateBookResponse } from 'src/model/book.model';
import { BookValidation } from './book.validation';

@Injectable()
export class BookService {
    constructor(
        private ValidationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER)
        private logger: Logger,
        private PrismaService: PrismaService
    ) { }


    async createBook(request: CreateBookRequest): Promise<CreateBookResponse> {
        this.logger.info(`Creating new book ${JSON.stringify(request)}`);
        const createBookRequest: CreateBookRequest = this.ValidationService.validate(BookValidation.CREATE, request);

        const book = await this.PrismaService.book.create({
            data: createBookRequest,
        });

        return {
            id: book.id,
            title: book.title,
            cover: book.cover,
            author: book.author
        };
    }

    async getBookList(): Promise<BookRes[]> {
        this.logger.info(`Getting book list`);
        const bookList = await this.PrismaService.book.findMany({
            include: {
                genre: {
                    include: {
                        Genre: {
                            select: {
                                title: true,
                                id: true
                            }
                        },
                        
                    }
                },
                bookMark: true,
                Chapter: true
            }
        });
    
        return bookList.map((book) => ({
            id: book.id,
            title: book.title,
            cover: book.cover,
            asset: book.asset ?? '',
            author: book.author,
            description: book.description,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
            popular: book.popular,
            genre: book.genre.map((g) => ({
                id: g.Genre.id,
                title: g.Genre.title
            })),
            chapter: book.Chapter.map((c) => ({
                id: c.id,
                title: c.title,
                content: c.content,
                updatedAt: c.updatedAt,
                description: c.description
            })),
            bookmark: book.bookMark.map((b) => ({
                id: b.id,
                userId: b.userId,
                bookId: b.bookId
            }))
        }));
    }
    


    async getBookQuery(query: string): Promise<any> {
        this.logger.info(`Getting book by id ${query}`);
        const book = await this.PrismaService.book.findFirst({
            where: {
                OR: [
                    
                    {
                        id: query
                        
                    },
                    {
                        title: query
                    }
                ]
            },
            include: {
                genre: {
                    include: {
                        Genre: {
                            select: {
                                title: true,
                                id: true
                            }
                        }
                    }
                },
                Chapter: true
            }
        });
        return book
    }



    async updateBook(id: string, request: updateBookRequest): Promise<UpdateBookResponse> {
        this.logger.info(`Updating book ${id} with ${JSON.stringify(request)}`);

        const updateBookRequest: updateBookRequest = this.ValidationService.validate(BookValidation.UPDATE, request);

        const book = await this.PrismaService.book.update({
            where: {
                id: id,
            },
            data: updateBookRequest,
        })

        return {
            ...book,
            asset: book.asset ?? ''
        };
    }


    async deleteBook(id: string): Promise<string> {
        this.logger.info(`Deleting book ${id} with ${JSON.stringify(request)}`);

        await this.PrismaService.book.delete({
            where: {
                id: id,
            }
        });

        return "Book deleted";
    }
}
