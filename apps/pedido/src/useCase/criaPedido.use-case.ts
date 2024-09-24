import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IPedidoRepo } from '../models/interfaces/pedidoRepo.interface';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { Pedido } from '../models/entities/pedido.entity';
import { ProdutosQuantidadeDTO } from '../models/dtos/produtosQuantidade.dto';
import { CriaPedidoDto } from '../models/dtos/criaPedido.dto';

@Injectable()
export class CriaPedidoUseCase {
  @Inject('IPedidoRepo')
  private readonly pedidoRepo: IPedidoRepo;
  @Inject(RabbitmqService)
  private readonly rabbitmqService: RabbitmqService;

  async execute(param: CriaPedidoDto) {
    try {
      // quando der erro pesquisar oqq deve ser  feito com a fila.
      const pedido = this.geraArrayDosProdutosDoPedido(
        param.id_pessoa,
        param.produtos,
      );
      await this.pedidoRepo.create(pedido);

      this.rabbitmqService.instance.emit('pedido_queue', {
        param,
      });
    } catch (e) {
      throw new BadRequestException({ message: 'Erro ao gerar pedido.' });
    }
  }

  private geraArrayDosProdutosDoPedido(
    id_pessoa: number,
    produtos: ProdutosQuantidadeDTO[],
  ) {
    const pedido = new Pedido();
    pedido.quantidade = 0;
    pedido.id_pessoa = id_pessoa;
    pedido.total = 0;

    for (const produto of produtos) {
      pedido.quantidade = pedido.quantidade + produto.quantidade;

      return pedido;
    }
  }
}
