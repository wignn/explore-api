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

@Module({
  imports: [
    CommonModule,
    UserModule,
    BookModule,
    AuthModule,
    BookmarkModule,
    GenreModule,
    
  ],
  controllers: [AppController, GenreController],
  providers: [AppService, GenreService],
})
export class AppModule {}
