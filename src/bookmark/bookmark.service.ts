import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validate.service';
import {
  CreateBookmarkRequest,
  GetBookmarkResponse,
} from '../model/bookmark.model';
import { Logger } from 'winston';
import { BookmarkValidation } from './bookmark.validation';

@Injectable()
export class BookmarkService {
  constructor(
    private ValidationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private logger: Logger,
    private PrismaService: PrismaService,
  ) {}

  async createBookmark(request: CreateBookmarkRequest): Promise<string> {
    this.logger.info(`Creating new bookmark ${JSON.stringify(request)}`);
    const createBookmarkRequest: CreateBookmarkRequest =
      this.ValidationService.validate(BookmarkValidation.CREATE, request);

    await this.PrismaService.bookmark.create({
      data: createBookmarkRequest,
    });

    return 'Bookmark created';
  }

  async deleteBookmark(id: string): Promise<string> {
    this.logger.info(`Deleting bookmark ${id}`);
    await this.PrismaService.bookmark.delete({
      where: {
        id: id,
      },
    });

    return 'Bookmark deleted';
  }

  async getBookmarkList(id: string): Promise<GetBookmarkResponse[]> {
    this.logger.info(`Getting bookmark list`);
    const bookmarkList = await this.PrismaService.bookmark.findMany({
      where: {
        OR: [
          {
            bookId: id,
          },
          {
            userId: id,
          },
        ],
      },
      include: {
        Book: {
          include: {
            Chapter: true,
          },
        },
      }
    });
    return bookmarkList.map((bookmark) => ({
      id: bookmark.id,
      bookId: bookmark.bookId,
      userId: bookmark.userId,
      book: bookmark.Book,
      chapter: bookmark.Book.Chapter.map((chapter) => ({
        id: chapter.id,
        title: chapter.title,
        description: chapter.description,
        content: chapter.content,
        bookId: chapter.bookId,
        createdAt: chapter.createdAt,
        updatedAt: chapter.updatedAt,
      })),
    }));
  }

  async getBookmarkByUserId(userId: string): Promise<GetBookmarkResponse[]> {
    this.logger.info(`Getting bookmark list by user id ${userId}`);
    const bookmarkList = await this.PrismaService.bookmark.findMany({
      where: {
        userId: userId,
      },
      include: {
        Book: {
          select: {
            Chapter: true,
          },
        },
      },
    });
    return bookmarkList.map((bookmark) => ({
      id: bookmark.id,
      bookId: bookmark.bookId,
      userId: bookmark.userId,
      chapter: bookmark.Book.Chapter.map((chapter) => ({
        id: chapter.id,
        title: chapter.title,
        description: chapter.description,
        content: chapter.content,
        bookId: chapter.bookId,
        createdAt: chapter.createdAt,
        updatedAt: chapter.updatedAt,
      })),
    }));
  }


  async isBookmark(userId: string, bookId: string): Promise<any> {
    this.logger.info(`Checking bookmark by user id ${userId} and book id ${bookId}`);
    const bookmark = await this.PrismaService.bookmark.findFirst({
      where: {
        userId: userId,
        bookId: bookId,
      },
    });

    if (!bookmark) {
      return null;
    }
    return {
      id: bookmark?.id,
    }
  }
}
