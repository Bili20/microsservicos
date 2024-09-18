import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeormConfig';
import { Produto } from './models/entites/produto.entity';
import { ProdutoRepo } from './repository/produtoRepo';
import { AtualizaEstoqueController } from './useCase/atualizaEstoque/atualizaEstoque.controller';
import { AtualizaEstoqueUseCase } from './useCase/atualizaEstoque/atualizaEstoque.use-case';
import { CriaprodutoController } from './useCase/criaProduto/criaProduto.controller';
import { CriaProdutoUseCase } from './useCase/criaProduto/criaProduto.use-case';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Produto]),
  ],
  providers: [
    CriaProdutoUseCase,
    AtualizaEstoqueUseCase,
    ProdutoRepo,
    { provide: 'IProdutoRepo', useExisting: ProdutoRepo },
  ],
  controllers: [CriaprodutoController, AtualizaEstoqueController],
})
export class ProdutoModule {}
