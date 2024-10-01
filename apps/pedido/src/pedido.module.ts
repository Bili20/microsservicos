import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeormConfig';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Pedido } from './models/entities/pedido.entity';
import { CriaPedidoUseCase } from './useCase/criaPedido/criaPedido.use-case';
import { PedidoRepo } from './repository/pedidoRepo';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { CriaPedidoController } from './useCase/criaPedido/criaPedido.controller';
import { CriaPedidoProdutoUseCase } from './useCase/criaPedidoProduto/criaPedidoProduto.use-case';
import { PedidoProdutoRepo } from './repository/pedidoProdutoRepo';
import { PedidoProduto } from './models/entities/pedidoProduto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ClientsModule.register([
      {
        name: 'PEDIDO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'pedido_queue',
          queueOptions: {
            durable: true,
            bindExchange: {
              exchange: 'pedido_exchange',
              exchangeType: 'fanout',
            },
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([Pedido, PedidoProduto]),
  ],
  controllers: [CriaPedidoController],
  providers: [
    CriaPedidoUseCase,
    RabbitmqService,
    PedidoRepo,
    { provide: 'IPedidoRepo', useExisting: PedidoRepo },
    CriaPedidoProdutoUseCase,
    PedidoProdutoRepo,
    { provide: 'IPedidoProdutoRepo', useExisting: PedidoProdutoRepo },
  ],
})
export class PedidoModule {}
