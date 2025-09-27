/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TrpcRouter } from './trpc/trpc.router';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Set up tRPC
  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  // Set up traditional Swagger for non-tRPC endpoints (if any)
  const config = new DocumentBuilder()
    .setTitle('Delbot API')
    .setDescription('The Delbot API documentation')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/api`
  );
  Logger.log(
    `📚 tRPC is available at: http://localhost:${port}/trpc`
  );
  Logger.log(
    `📚 Swagger documentation is available at: http://localhost:${port}/api/docs`
  );
}

bootstrap();
