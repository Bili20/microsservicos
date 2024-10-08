import { Module } from '@nestjs/common';
import { NotaFiscalService } from './nota-fiscal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeormConfig';
import { NotaFiscalRepo } from './repository/nota-fiscalRepo';
import { NotaFiscal } from './models/entities/nota-fiscal.entity';
import { NotaFiscalController } from './nota-fiscal.controller';
import { Pessoa } from './models/entities/pessoa.entity';
import { BuscaUmaPessoaUseCase } from './useCase/buscaUmaPessoa.use-case';
import { PessoaRepo } from './repository/pessoaRepo';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([NotaFiscal, Pessoa]),
  ],
  controllers: [NotaFiscalController],
  providers: [
    NotaFiscalService,
    NotaFiscalRepo,
    { provide: 'INotaFiscalRepo', useExisting: NotaFiscalRepo },
    BuscaUmaPessoaUseCase,
    PessoaRepo,
    { provide: 'IPessoaRepo', useExisting: PessoaRepo },
  ],
})
export class NotaFiscalModule {}
