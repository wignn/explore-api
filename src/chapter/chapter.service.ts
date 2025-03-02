import { HttpException, Inject, Injectable } from '@nestjs/common';
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
    ) { }

    async createChapter(request: createChapterRequest): Promise<string> {
        this.logger.info(`Creating new chapter ${JSON.stringify(request)}`);
        const createChapterRequest: createChapterRequest = this.ValidationService.validate(ChapterValidation.CREATE, request);

        const book = await this.PrismaService.book.count({
            where: {
                id: createChapterRequest.bookId
            }
        });
        if (!book) {
            new HttpException('Book not found', 400);
        }

        const lastChapter = await this.PrismaService.chapter.findFirst({
            where: { bookId: createChapterRequest.bookId },
            orderBy: { chapterNum: 'desc' },
            select: { chapterNum: true }
        });

        const newChapterNum = lastChapter ? lastChapter.chapterNum + 1 : 1;

        await this.PrismaService.chapter.create({
            data: {
                ...createChapterRequest,
                chapterNum: newChapterNum
            },
        });

        await this.PrismaService.book.update({
            where: {
                id: createChapterRequest.bookId
            },
            data: {
                updatedAt: new Date()
            }
        })

        this.logger.info(`Chapter created`);
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
            chapterNum: chapter.chapterNum
        }));
    }


    async getChapterByID(chapterId: string): Promise<chapterResponse> {
        this.logger.info(`Getting chapter list by book id ${chapterId}`);
        const chapterList = await this.PrismaService.chapter.findFirst({
            where: {
                id: chapterId
            }, include: {
                Book: {
                    select: {
                        Chapter: true
                    }
                }

            }

        })

        return chapterList

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
        this.logger.info(`Chapter updated`);

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

        this.logger.info(`Chapter deleted`);
        return "Chapter deleted";
    }
}
