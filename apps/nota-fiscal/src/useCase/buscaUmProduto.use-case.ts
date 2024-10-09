import { Inject, Injectable } from '@nestjs/common';
import { IProdutoRepo } from '../models/interfaces/produtoRepo.interface';

@Injectable()
export class BuscaUmProdutoUseCase {
  @Inject('IProdutoRepo')
  private readonly produtoRepo: IProdutoRepo;

  async execute(idProduto: number) {
    return await this.produtoRepo.findOne(idProduto);
  }
}
