import { Inject } from '@nestjs/common';
import { IPessoaRepo } from '../models/interfaces/pessoaRepo.interface';

export class BuscaUmaPessoaUseCase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;

  async execute(idPessoa: number) {
    return this.pessoaRepo.findOne(idPessoa);
  }
}
