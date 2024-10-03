import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeormConfig';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Pedido } from './models/entities/pedido.entity';
import { CriaPedidoUseCase } from './useCase/criaPedido/criaPedido.use-case';
import { PedidoRepo } from './repository/pedidoRepo';
import { CriaPedidoController } from './useCase/criaPedido/criaPedido.controller';
import { CriaPedidoProdutoUseCase } from './useCase/criaPedidoProduto/criaPedidoProduto.use-case';
import { PedidoProdutoRepo } from './repository/pedidoProdutoRepo';
import { PedidoProduto } from './models/entities/pedidoProduto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ClientsModule.register([
      {
        name: 'NOTIFICACAO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'notificacao_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'PRODUTO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'produto_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([Pedido, PedidoProduto]),
  ],
  controllers: [CriaPedidoController],
  providers: [
    CriaPedidoUseCase,
    PedidoRepo,
    { provide: 'IPedidoRepo', useExisting: PedidoRepo },
    CriaPedidoProdutoUseCase,
    PedidoProdutoRepo,
    { provide: 'IPedidoProdutoRepo', useExisting: PedidoProdutoRepo },
  ],
})
export class PedidoModule {}
