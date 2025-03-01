import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ChapterService, JwtService],
  controllers: [ChapterController]
})
export class ChapterModule {}
