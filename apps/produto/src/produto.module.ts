import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './models/entites/produto.entity';
import { CriaProdutoUseCase } from './useCase/criaProduto/criaProduto.use-case';
import { ProdutoRepo } from './repository/produtoRepo';
import { CriaprodutoController } from './useCase/criaProduto/criaProduto.controller';
import { typeOrmConfig } from './config/typeormConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
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
