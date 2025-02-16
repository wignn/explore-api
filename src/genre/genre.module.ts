import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { AdminGuard } from '../book/guard/admin.guard';
import { JwtService } from '@nestjs/jwt';


@Module({
    providers: [GenreService, AdminGuard, JwtService],
    controllers: [GenreController],
    
})
export class GenreModule {}
