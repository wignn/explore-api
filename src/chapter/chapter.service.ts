import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validate.service';
import { chapterResponse, createChapterRequest } from 'src/model/chapter.model';
import { Logger } from 'winston';
import { ChapterValidation } from './chapter.validation';

@Injectable()
export class ChapterService {
    constructor(
        private ValidationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER)
        private logger: Logger,
        private PrismaService: PrismaService
    ) {}

    async createChapter(request: createChapterRequest):Promise<string> {
        this.logger.info(`Creating new chapter ${JSON.stringify(request)}`);
        const createChapterRequest: createChapterRequest = this.ValidationService.validate(ChapterValidation.CREATE, request);

        await this.PrismaService.chapter.create({
            data: createChapterRequest,
        });

        return "Chapter created";
    }


    async getChapterList(): Promise<chapterResponse[]> {
        this.logger.info(`Getting chapter list`);
        const chapterList = await this.PrismaService.chapter.findMany();
        return chapterList.map((chapter) => ({
            id: chapter.id,
            title: chapter.title,
            content: chapter.content,
            bookId: chapter.bookId,
            description: chapter.description, 
            createdAt: chapter.createdAt,
            updatedAt: chapter.updatedAt,
        }));
    }


    async getChapterByID(bookId: string): Promise<chapterResponse[]> {
        this.logger.info(`Getting chapter list by book id ${bookId}`);
        const chapterList = await this.PrismaService.chapter.findMany({
            where: {
            OR: [
                { bookId: bookId },
                { id: bookId }
            ]
            }
        });
        return chapterList.map((chapter) => ({
            id: chapter.id,
            title: chapter.title,
            content: chapter.content,
            bookId: chapter.bookId,
            description: chapter.description, 
            createdAt: chapter.createdAt,
            updatedAt: chapter.updatedAt,
        }));
    }

    async updateChapter(id: string, request: createChapterRequest): Promise<chapterResponse> {
        this.logger.info(`Updating chapter ${id} with ${JSON.stringify(request)}`);

        const updateChapterRequest: createChapterRequest = this.ValidationService.validate(ChapterValidation.UPDATE, request);

        const chapter = await this.PrismaService.chapter.update({
            where: {
                id: id,
            },
            data: updateChapterRequest,
        })

        return {
            ...chapter,
            createdAt: chapter.createdAt,
            updatedAt: chapter.updatedAt
        };
    }

    async deleteChapter(id: string): Promise<string> {
        this.logger.info(`Deleting chapter ${id}`);

        await this.PrismaService.chapter.delete({
            where: {
                id: id,
            }
        });

        return "Chapter deleted";
    }
}
