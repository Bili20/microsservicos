import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IProdutoRepo } from '../../models/interfaces/produtoRepo.interface';
import { Produto } from '../../models/entites/produto.entity';

@Injectable()
export class AtualizaEstoqueUseCase {
  @Inject('IProdutoRepo')
  private readonly produtoRepo: IProdutoRepo;

  async execute(quantidade: number, produto: Produto) {
    if (quantidade > produto.qtd_estoque) {
      throw new BadRequestException({
        message: 'Sem quantidade de produto em estoque.',
      });
    }
    const valorDesconto = produto.qtd_estoque - quantidade;
    produto.qtd_estoque = valorDesconto;
    await this.produtoRepo.update(produto.id, produto);
  }
}
