import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as process from 'process';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS liberando a origem do frontend
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Validação global 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // remove campos desconhecidos
      forbidNonWhitelisted: true, // erro se vier campo extra
      transform: true,            // transforma payload em DTO
    }),
  );

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  console.log(`API rodando em http://localhost:${port}`);
}
bootstrap();
