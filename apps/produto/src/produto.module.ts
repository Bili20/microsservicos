import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeormConfig';
import { Produto } from './models/entites/produto.entity';
import { ProdutoRepo } from './repository/produtoRepo';
import { AtualizaEstoqueController } from './useCase/atualizaEstoque/atualizaEstoque.controller';
import { AtualizaEstoqueUseCase } from './useCase/atualizaEstoque/atualizaEstoque.use-case';
import { CriaprodutoController } from './useCase/criaProduto/criaProduto.controller';
import { CriaProdutoUseCase } from './useCase/criaProduto/criaProduto.use-case';
import { BuscaProdutosController } from './useCase/buscaProdutos/buscaProdutos.controller';
import { BuscaProdutosUseCase } from './useCase/buscaProdutos/buscaProdutos.use-case';
import { BuscaUmProdutoUseCase } from './useCase/buscaUmProduto/buscaUmProduto.use-case';
import { BuscaUmProdutoController } from './useCase/buscaUmProduto/buscaUmProduto.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Produto]),
  ],
  providers: [
    CriaProdutoUseCase,
    AtualizaEstoqueUseCase,
    BuscaProdutosUseCase,
    BuscaUmProdutoUseCase,
    ProdutoRepo,
    { provide: 'IProdutoRepo', useExisting: ProdutoRepo },
  ],
  controllers: [
    CriaprodutoController,
    BuscaProdutosController,
    BuscaUmProdutoController,
    AtualizaEstoqueController,
  ],
})
export class ProdutoModule {}
