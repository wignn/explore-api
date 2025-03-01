import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AdminService, JwtService],
  controllers: [AdminController]
})
export class AdminModule {}
