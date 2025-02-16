import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validate.service';
import { BookGenreRequest, BookGenreResponse, CreateGenreRequest, GenreBookListResponse, GetGenreResponse } from 'src/model/genre.model';
import { Logger } from 'winston';
import { BookmarkValidation } from './bookmark.validation';

@Injectable()
export class GenreService {
    constructor(
        private ValidationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER)
        private logger: Logger,
        private PrismaService: PrismaService
    ) { }


    async createGenre(request: CreateGenreRequest): Promise<string> {
        this.logger.info(`Creating new genre ${JSON.stringify(request)}`);
        const createGenreRequest: CreateGenreRequest = this.ValidationService.validate(BookmarkValidation.CREATE, request);

        const genre = await this.PrismaService.genre.findFirst({
            where: {
                title: createGenreRequest.title,
            },  
        })

        if(genre){
            throw new HttpException(`Genre already exist`, 400);
        }


        await this.PrismaService.genre.create({
            data: createGenreRequest,
        });

        return "Genre created";
    }

    async getGenreList(): Promise<GetGenreResponse[]> {
        this.logger.info(`Getting genre list`);
        const genreList = await this.PrismaService.genre.findMany();
        return genreList.map((genre) => ({
            id: genre.id,
            title: genre.title,
            description: genre.description,
        }));
    }

    async getGenreById(id: string): Promise<GetGenreResponse> {
        this.logger.info(`Getting genre by id ${id}`);
        console.log(id);
        const genre = await this.PrismaService.genre.findFirst({
            where: {
                id: id,
            },
        });

        if (!genre) {
            throw new HttpException(`Genre not found`, 404);
        }

        return {
            id: genre.id,
            title: genre.title,
            description: genre.description,
        };
    }

    async updateGenre(id: string, request: CreateGenreRequest): Promise<string> {
        this.logger.info(`Updating genre ${id} with ${JSON.stringify(request)}`);
        const updateGenreRequest: CreateGenreRequest = this.ValidationService.validate(BookmarkValidation.UPDATE, request);

        await this.PrismaService.genre.update({
            where: {
                id: id,
            },
            data: updateGenreRequest,
        });

        return "Genre updated";
    }




    async deleteGenre(id: string): Promise<string> {
        this.logger.info(`Deleting genre ${id}`);
        const genre = await this.PrismaService.genre.findFirst({
            where: {
                id: id,
            },
        });

        if (!genre) {
            throw new HttpException(`Genre not found`, 404);
        }

        await this.PrismaService.genre.delete({
            where: {
                id: id,
            },
        });

        return "Genre deleted";
    }

    /*
    below is the code for relation table between genre and book
    */


    async createBookGenreRelation(request: BookGenreRequest): Promise<string> {
        this.logger.info(`Creating book genre relation ${request}`);
        const genre = await this.PrismaService.genre.findFirst({
            where: {
                id: request.genreId,
            },
        });

        if (!genre) {
            throw new HttpException(`Genre not found`, 404);
        }

        const book = await this.PrismaService.book.findFirst({
            where: {
                id: request.bookId,
            },
        });

        if (!book) {
            throw new HttpException(`Book not found`, 404);
        }

        await this.PrismaService.bookGenre.create({
            data: {
                genreId: request.genreId,
                bookId: request.bookId,
            },
        });

        return "Book genre relation created";
    }

    async getBookListByGenreId(id: string): Promise<BookGenreRequest[]> {
        this.logger.info(`Getting book list by genre id ${id}`);
        const genre = await this.PrismaService.bookGenre.findFirst({
            where: {
                genreId: id,
            },
            include: {
                Book: true,
            },
        });
   
     
        if (!genre) {
            throw new HttpException(`Genre not found`, 404);
        }

        return [genre].map((genre) => ({
            genreId: genre.genreId,
            bookId: genre.bookId,
            book: genre.Book,
        }));
    }


    async deleteBookGenreRelation(request: BookGenreRequest): Promise<string> {
        this.logger.info(`Deleting book genre relation ${request}`);
        const genre = await this.PrismaService.genre.findFirst({
            where: {
                id: request.genreId,
            },
        });

        if (!genre) {
            throw new HttpException(`Genre not found`, 404);
        }

        const book = await this.PrismaService.book.findFirst({
            where: {
                id: request.bookId,
            },
        });

        if (!book) {
            throw new HttpException(`Book not found`, 404);
        }

        await this.PrismaService.bookGenre.deleteMany({
            where: {
                genreId: request.genreId,
                bookId: request.bookId,
            },
        });

        return "Book genre relation deleted";
    }

    async getGenreBookList(): Promise<any> {
        this.logger.info(`Getting genre book list`);
        
        const genreList = await this.PrismaService.bookGenre.findMany({
            include: {
                Book: true,
            },
        });
        return genreList.map((genre) => ({
            genreId: genre.genreId,      
            book: genre.Book
        }));
    }
    
}