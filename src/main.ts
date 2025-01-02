import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe({transform: true}))
  app.setGlobalPrefix('/v1/api')
  await app.listen(configService.get('NESTJS_PORT'));
}
bootstrap();
