import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { GenreController } from './genre/genre.controller';
import { GenreService } from './genre/genre.service';
import { GenreModule } from './genre/genre.module';
import { JwtService } from '@nestjs/jwt';
import { ChapterModule } from './chapter/chapter.module';
import { AdminModule } from './admin/admin.module';
import { TestModule } from 'test/test.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    BookModule,
    AuthModule,
    BookmarkModule,
    GenreModule,
    ChapterModule,
    AdminModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
