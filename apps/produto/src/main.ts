import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ProdutoModule } from './produto.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ProdutoModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
