import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientRMQ } from '@nestjs/microservices';
import { IPessoaRepo } from '../../models/interfaces/pessoaRepo.interface';

@Injectable()
export class BuscaUmaPessoaUseCase {
  constructor(
    @Inject('IPessoaRepo')
    private readonly pessoaRepo: IPessoaRepo,
    @Inject('PESSOA_SERVICE')
    public rabbitClient: ClientRMQ,
  ) {}

  async execute(id: number) {
    try {
      const data = await this.pessoaRepo.findOne(id);
      console.log(this.rabbitClient);
      this.rabbitClient.emit('pessoa_acahada', data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
