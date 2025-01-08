import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe({
    transform: true, 
    transformOptions: {
      enableImplicitConversion: true, 
    }
    }))
  app.setGlobalPrefix('/v1/api')

  const config = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/v1/api/docs', app, documentFactory);

  await app.listen(configService.get('NESTJS_PORT'));
}
bootstrap();
