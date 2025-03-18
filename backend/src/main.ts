import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';   

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allow all origins (change this to a specific domain for better security)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,   Authorization',
    credentials: true, // Allow cookies/auth headers if needed
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
