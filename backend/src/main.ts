import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/filter-handled.exception';
import { CatchEverythingFilter } from './exceptions/filter-unhandled.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Filter request
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter)); // use global filter

  // Validate request
  app.useGlobalPipes(new ValidationPipe());

  // Config CORS
  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
  console.log('Allowed origins:', allowedOrigins);
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization, Accept-Language',
  });

  await app.listen(process.env.SERVER_PORT ?? 8080);
}
bootstrap();
