import { HttpException, Inject, Injectable } from '@nestjs/common';
import { IProdutoRepo } from '../../models/interfaces/produtoRepo.interface';
import { CriaProdutoDto } from '../../models/dtos/criaProduto.dto';
import { Produto } from '../../models/entites/produto.entity';

@Injectable()
export class CriaProdutoUseCase {
  @Inject('IProdutoRepo')
  private readonly produtoRepo: IProdutoRepo;

  async execute(param: CriaProdutoDto) {
    try {
      const produto = new Produto(param);
      produto.nome = produto.nome.toLowerCase();
      await this.produtoRepo.create(produto);
    } catch (e) {
      if (e.code == 23505) {
        e.response = 'Produto já cadastrado.';
      }
      throw new HttpException(
        e.response ?? 'Erro ao cadastrar produto.',
        e.status ?? 400,
      );
    }
  }
}
