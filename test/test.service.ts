import { PrismaService } from '../src/common/prisma.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Book, User } from '@prisma/client';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) { }

  async deleteAll() {
    await this.deleteUser();
    // await this.deleteGenre();
    // await this.deleteBook();

  }

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  async getUser(): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        username: 'test',
      },
    });
  }

  async createUser() {

    const user = await this.prismaService.user.findUnique({
      where: {
        username: 'test',
      }
    })

    if (user) {
      return;
    }
    await this.prismaService.user.create({
      data: {
        username: 'test',
        name: 'test',
        email: 'test@gmail.com',
        password: await bcrypt.hash('test1234', 10),
        token: 'test',
        valToken: 'test',
      },
    });
  }

  async createBook() {
    await this.prismaService.book.create({
      data: {
        id: 'test',
        title: 'test',
        description: 'test',
        author: 'test',
        cover: 'test',
      },
    });
  }

  async deleteBook() {
    await this.prismaService.book.deleteMany({
      where: {
        title: 'test',
      },
    });
  }

  async getBook(): Promise<Book> {
    return this.prismaService.book.findFirst({
      where: {
        title: 'test',
      },
    });
  }


  async createGenre() {
    await this.prismaService.genre.create({
      data: {
        id: 'test',
        title: 'test',
        description: 'test',
      }

    })
  }

  async deleteGenre() {

    await this.prismaService.bookGenre.deleteMany({
      where: {
     
          bookId: "test",
        
      },
    })
    await this.prismaService.genre.deleteMany({
      where: {
        title: 'test',}
      })
  }
}
