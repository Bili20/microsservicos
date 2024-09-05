import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from '../models/entities/endereco.entity';
import { Pessoa } from '../models/entities/pessoa.entity';
import { CriaPessoaUseCase } from './criaPessoa/criaPessoa.use-case';
import { CriaPessoaController } from './criaPessoa/criaPessoa.controller';
import { PessoaRepo } from '../repository/pessoaRepo';
import { BuscaUmaPessoaUseCase } from './buscaUmaPessoa/buscaUmapessoa.use-case';
import { BuscaUmaPessoaController } from './buscaUmaPessoa/buscaUmaPessoa.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PESSOA_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'pessoa_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([Pessoa, Endereco]),
  ],
  providers: [
    CriaPessoaUseCase,
    BuscaUmaPessoaUseCase,
    PessoaRepo,
    { provide: 'IPessoaRepo', useExisting: PessoaRepo },
  ],
  controllers: [CriaPessoaController, BuscaUmaPessoaController],
})
export class PessoaModule {}
