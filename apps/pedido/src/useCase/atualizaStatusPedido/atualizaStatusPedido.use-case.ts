import { Inject, Injectable } from '@nestjs/common';
import { IPedidoRepo } from '../../models/interfaces/pedidoRepo.interface';
import { AtualizaStatusDto } from '../../models/dtos/atualizaStatus.dto';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class AtualizaStatusPedidoUseCase {
  @Inject('IPedidoRepo')
  private readonly pedidoRepo: IPedidoRepo;
  @Inject('HISTORICO_SERVICE')
  public readonly intanceHistorico: ClientRMQ;

  async execute(id: number, data: AtualizaStatusDto) {
    const pedido = await this.pedidoRepo.findOne(id);
    delete pedido.pedidoProduto;
    pedido.verificaStatus(data.status);
    pedido.data_atualizacao = new Date();
    pedido.status = data.status;

    await this.pedidoRepo.update(id, pedido);

    const param = { id_pedido: id, status: data.status };

    this.intanceHistorico.emit('historico_queue', { param });
  }
}
