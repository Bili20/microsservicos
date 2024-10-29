import { Inject, Injectable } from '@nestjs/common';
import { Ctx, RmqContext } from '@nestjs/microservices';
import { Historico } from './models/entities/historico.entity';
import { IHistoricoRepo } from './models/interfaces/historicoRepo.interface';

@Injectable()
export class HistoricoService {
  @Inject('IHistoricoRepo')
  private readonly historicoRepo: IHistoricoRepo;

  async execute(data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orinalMsg = context.getMessage();

    const historico = new Historico();
    historico.id_pedido = data.param.id_pedido;
    historico.status = data.param.status;
    await this.historicoRepo.create(historico);

    channel.ack(orinalMsg);
  }
}
