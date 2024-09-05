import { NestFactory } from '@nestjs/core';
import { PedidoModule } from './pedido.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    PedidoModule,
    new FastifyAdapter(),
  );
  await app.listen(3002);
}
bootstrap();
