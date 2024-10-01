import { Inject, Injectable } from '@nestjs/common';
import { IPessoaRepo } from '../models/interfaces/pessoaRepo.interface';

@Injectable()
export class BuscaUmaPessoaUseCase {
  constructor(
    @Inject('IPessoaRepo')
    private readonly pessoaRepo: IPessoaRepo,
  ) {}

  async execute(id: number) {
    try {
      const data = await this.pessoaRepo.findOne(id);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
