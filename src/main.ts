import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Explore API')
    .setDescription('Explore API')
    .setVersion('1.0')
    .addServer('http://localhost:4000', 'development')
    .addServer('https://low-merilyn-wignn-9201e186.koyeb.app', 'production')
    .addApiKey({ type: 'apiKey', in: 'header', name: 'x-api-key', description: 'API Key' })
    .addTag('Explore')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
