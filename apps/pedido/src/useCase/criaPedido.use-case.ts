import { Inject, Injectable } from '@nestjs/common';
import { IPedidoRepo } from '../models/interfaces/pedidoRepo.interface';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class CriaPedidoUseCase {
  @Inject('IPedidoRepo')
  private readonly pedidoRepo: IPedidoRepo;
  @Inject(RabbitmqService)
  private readonly rabbitmqService: RabbitmqService;

  async execute() {
    this.rabbitmqService.instance.emit('pedido_queue', {
      message: 'Oi aqui é o pedido.',
    });
  }
}
