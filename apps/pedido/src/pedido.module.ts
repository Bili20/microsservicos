import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeormConfig';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Pedido } from './models/entities/pedido.entity';
import { CriaPedidoUseCase } from './useCase/criaPedido.use-case';
import { PedidoRepo } from './repository/pedidoRepo';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { CriaPedidoController } from './useCase/criaPedido.controller';

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
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([Pedido]),
  ],
  controllers: [CriaPedidoController],
  providers: [
    CriaPedidoUseCase,
    RabbitmqService,
    PedidoRepo,
    { provide: 'IPedidoRepo', useExisting: PedidoRepo },
  ],
})
export class PedidoModule {}
