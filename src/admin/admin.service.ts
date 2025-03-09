
import { Inject, Injectable, Get } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { Logger } from 'winston';

@Injectable()
export class AdminService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private logger: Logger,
        private PrismaService: PrismaService
    ) { }

    async getUserList(): Promise<any> {
        this.logger.info(`Getting user list`);
        const user = await this.PrismaService.user.findMany()

        return user.map((user) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.isAdmin,
            status: user.lastLogin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt

        }))
    }


    async getUserSession(): Promise<any> {
        this.logger.info(`Getting user session`);
        const user = await this.PrismaService.user.findMany({
            where: {
                lastLogin: {
                    not: null
                }
            }
        })

        return user.map((user) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.isAdmin,
            status: user.lastLogin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }))
    }


    async getChapterList(): Promise<any> {
        this.logger.info(`Getting chapter list`);
        const chapter = await this.PrismaService.chapter.findMany()

        return chapter.map((chapter) => ({
            id: chapter.id,
            title: chapter.title,
            bookId: chapter.bookId,
            createdAt: chapter.createdAt,
            updatedAt: chapter.updatedAt
        }))
    }

    async getGenreList(): Promise<any> {
        this.logger.info(`Getting genre list`);
        const genre = await this.PrismaService.genre.findMany()

        return genre.map((genre) => ({
            id: genre.id,
            title: genre.title,
            createdAt: genre.createdAt,
            updatedAt: genre.updatedAt
        }))
    }


    async getBookmarkList(): Promise<any> {
        this.logger.info(`Getting bookmark list`);
        const bookmark = await this.PrismaService.bookmark.findMany()

        return bookmark.map((bookmark) => ({
            id: bookmark.id,
            userId: bookmark.userId,
            bookId: bookmark.bookId,
            createdAt: bookmark.createdAt,
            updatedAt: bookmark.updatedAt
        }))
    }

    async getBookList(): Promise<any> {
        this.logger.info(`Getting book list`);
        const book = await this.PrismaService.book.findMany({
            include: {
                genre: {
                    select: {
                        bookId: true,
                        genreId: true
                    }
                }
                
            }
        })

        return book.map((book) => ({
            id: book.id,
            title: book.title,
            cover: book.cover,
            genre: book.genre.map((genre) => ({ id: genre.genreId })),
            
        }))

    }


}
