import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: 'v1',
    prefix: 'api/',
  });

  app.enableCors({ origin: '*' });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('E-commerce Platform')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  const port = process.env.PORT || 3000;

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
