import { Inject, Injectable } from '@nestjs/common';
import { IProdutoRepo } from '../../models/interfaces/produtoRepo.interface';

@Injectable()
export class BuscaProdutosUseCase {
  @Inject('IProdutoRepo')
  private readonly produtoRepo: IProdutoRepo;

  async execute() {
    return await this.produtoRepo.find();
  }
}
