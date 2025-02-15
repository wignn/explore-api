import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validate.service';
import { CreateBookmarkRequest, GetBookmarkResponse } from 'src/model/bookmark.model';
import { Logger } from 'winston';
import { BookmarkValidation } from './bookmark.validation';

@Injectable()
export class BookmarkService {
    constructor(
        private ValidationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER)
        private logger: Logger,
        private PrismaService: PrismaService
    ) {}


    async createBookmark(request: CreateBookmarkRequest): Promise<string> {
        this.logger.info(`Creating new bookmark ${JSON.stringify(request)}`);
        const createBookmarkRequest: CreateBookmarkRequest = this.ValidationService.validate(BookmarkValidation.CREATE, request);

        await this.PrismaService.bookmark.create({
            data: createBookmarkRequest,
        });
        
        return "Bookmark created";
    } 


    async deleteBookmark(id: string): Promise<string> {
        this.logger.info(`Deleting bookmark ${id}`);
        await this.PrismaService.bookmark.delete({
            where: {
                id: id,
            }

        });

        return "Bookmark deleted";
    }


    async getBookmarkList(): Promise<GetBookmarkResponse[]> {
        this.logger.info(`Getting bookmark list`);
        const bookmarkList = await this.PrismaService.bookmark.findMany();
        return bookmarkList.map((bookmark) => ({
            id: bookmark.id,
            bookId: bookmark.bookId,
            userId: bookmark.userId,
        }));
    }



    async getBookmarkByUserId(userId: string): Promise<GetBookmarkResponse[]> {
        this.logger.info(`Getting bookmark list by user id ${userId}`);
        const bookmarkList = await this.PrismaService.bookmark.findMany({
            where: {
                userId: userId,
            },
        });
        return bookmarkList.map((bookmark) => ({
            id: bookmark.id,
            bookId: bookmark.bookId,
            userId: bookmark.userId,
        }));
    }
}
