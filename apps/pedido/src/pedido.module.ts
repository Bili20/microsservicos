import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeormConfig';
import { Pedido } from './models/entities/pedido.entity';
import { PedidoProduto } from './models/entities/pedidoProduto.entity';
import { PedidoProdutoRepo } from './repository/pedidoProdutoRepo';
import { PedidoRepo } from './repository/pedidoRepo';
import { CriaPedidoController } from './useCase/criaPedido/criaPedido.controller';
import { CriaPedidoUseCase } from './useCase/criaPedido/criaPedido.use-case';
import { CriaPedidoProdutoUseCase } from './useCase/criaPedidoProduto/criaPedidoProduto.use-case';
import { AtualizaStatusPedidoUseCase } from './useCase/atualizaStatusPedido/atualizaStatusPedido.use-case';
import { AtualizaStatusPedidoController } from './useCase/atualizaStatusPedido/atualizaStatusPedido.controller';

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
      {
        name: 'NOTA_FISCAL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'nota_fiscal_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'HISTORICO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'historico_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([Pedido, PedidoProduto]),
  ],
  controllers: [CriaPedidoController, AtualizaStatusPedidoController],
  providers: [
    CriaPedidoUseCase,
    AtualizaStatusPedidoUseCase,
    PedidoRepo,
    { provide: 'IPedidoRepo', useExisting: PedidoRepo },
    CriaPedidoProdutoUseCase,
    PedidoProdutoRepo,
    { provide: 'IPedidoProdutoRepo', useExisting: PedidoProdutoRepo },
  ],
})
export class PedidoModule {}
