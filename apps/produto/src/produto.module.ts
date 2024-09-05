import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './models/entites/produto.entity';
import { CriaProdutoUseCase } from './useCase/criaProduto/criaProduto.use-case';
import { ProdutoRepo } from './repository/produtoRepo';
import { CriaprodutoController } from './useCase/criaProduto/criaProduto.controller';
import { typeOrmConfig } from './config/typeormConfig';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ClientsModule.register([
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
    TypeOrmModule.forFeature([Produto]),
  ],
  providers: [
    CriaProdutoUseCase,
    ProdutoRepo,
    { provide: 'IProdutoRepo', useExisting: ProdutoRepo },
  ],
  controllers: [CriaprodutoController],
})
export class ProdutoModule {}
