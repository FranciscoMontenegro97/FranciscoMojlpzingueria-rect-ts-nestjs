import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: 'http://localhost:5173', // URL de tu frontend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Accept'],
  });

  await app.listen(3000);
}
bootstrap();