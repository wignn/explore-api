import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [BookmarkService, JwtService],
  controllers: [BookmarkController]
})
export class BookmarkModule {}
