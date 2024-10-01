import { NestFactory } from '@nestjs/core';
import { NotificacaoModule } from './notificacao.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificacaoModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        noAck: false,
        queue: 'notificacao_queue',
        queueOptions: {
          durable: true,
          bindExchange: {
            exchange: 'pedido_exchange',
            exchangeType: 'fanout',
          },
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
