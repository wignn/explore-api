import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { GenreModule } from './genre/genre.module';
import { JwtService } from '@nestjs/jwt';
import { ChapterModule } from './chapter/chapter.module';
import { AdminModule } from './admin/admin.module';
import { TestModule } from '../test/test.module';
import { ApiKeyMiddleware } from './middleware/auth/auth.middleware';

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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .exclude('/', '/swagger-ui', '/swagger-json')
      .forRoutes('*'); 
  }
}


