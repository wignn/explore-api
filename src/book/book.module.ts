import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [BookService, JwtService],
  controllers: [BookController]
})
export class BookModule {}
