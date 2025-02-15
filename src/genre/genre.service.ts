import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validate.service';
import { CreateGenreRequest, GetGenreResponse, UpdateGenreRequest } from 'src/model/genre.model';
import { Logger } from 'winston';
import { BookmarkValidation } from './bookmark.validation';
import { WebResponse } from 'src/model/web.model';
import { UpdateBookResponse } from 'src/model/book.model';

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

        const bookmark = await this.PrismaService.genre.findFirst({
            where: {
                title: createGenreRequest.title,
            },  
        })

        if(!bookmark){
            throw new HttpException(`Genre with title ${createGenreRequest.title} already exist`, 400);
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
        const genre = await this.PrismaService.genre.findFirst({
            where: {
                id: id,
            },
        });

        if (!genre) {
            throw new HttpException(`Genre with id ${id} not found`, 404);
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
}