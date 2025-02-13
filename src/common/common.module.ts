import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { ValidationService } from './validate.service';
import { ErrorFilter } from './error.filter';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
    format: winston.format.json(),
    transports:[
        new winston.transports.Console()
    ]
    }),
    ConfigModule.forRoot({
        isGlobal: true,
    }),
  ],
  providers: [PrismaService, ValidationService, {
    provide: "APP_FILTER",
    useClass: ErrorFilter,
  }],
  exports: [PrismaService, ValidationService],
})
export class CommonModule {}

