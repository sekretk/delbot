/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { generateOpenApi } from '@ts-rest/open-api';
import { appContract } from '@delbot/shared';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Generate OpenAPI spec from ts-rest contract
  const openApiDocument = generateOpenApi(appContract, {
    info: {
      title: 'Delbot API',
      description: 'The Delbot API documentation with type-safe contracts',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3000' }],
  });

  // Setup Swagger UI with generated OpenAPI spec
  SwaggerModule.setup('api/docs', app, openApiDocument);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/api`
  );
  Logger.log(
    `📚 Swagger documentation is available at: http://localhost:${port}/api/docs`
  );
}

bootstrap();
