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
import { Endereco } from './models/entities/endereco.entity';
import { Produto } from './models/entities/produto.entity';
import { ProdutoRepo } from './repository/produtoRepo';
import { BuscaUmProdutoUseCase } from './useCase/buscaUmProduto.use-case';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([NotaFiscal, Pessoa, Endereco, Produto]),
  ],
  controllers: [NotaFiscalController],
  providers: [
    NotaFiscalService,
    NotaFiscalRepo,
    { provide: 'INotaFiscalRepo', useExisting: NotaFiscalRepo },
    BuscaUmaPessoaUseCase,
    PessoaRepo,
    { provide: 'IPessoaRepo', useExisting: PessoaRepo },
    BuscaUmProdutoUseCase,
    ProdutoRepo,
    { provide: 'IProdutoRepo', useExisting: ProdutoRepo },
  ],
})
export class NotaFiscalModule {}
