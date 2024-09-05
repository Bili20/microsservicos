import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './models/entities/endereco.entity';
import { Pessoa } from './models/entities/pessoa.entity';
import { CriaPessoaUseCase } from './useCase/criaPessoa/criaPessoa.use-case';
import { CriaPessoaController } from './useCase/criaPessoa/criaPessoa.controller';
import { PessoaRepo } from './repository/pessoaRepo';
import { BuscaUmaPessoaUseCase } from './useCase/buscaUmaPessoa/buscaUmapessoa.use-case';
import { BuscaUmaPessoaController } from './useCase/buscaUmaPessoa/buscaUmaPessoa.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { typeOrmConfig } from './config/typeormConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
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
