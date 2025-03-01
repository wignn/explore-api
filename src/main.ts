import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ApiKeyMiddleware } from './middleware/auth/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.enableCors();
  app.use(new ApiKeyMiddleware().use);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
