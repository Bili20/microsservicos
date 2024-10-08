import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IPedidoRepo } from '../../models/interfaces/pedidoRepo.interface';
import { Pedido } from '../../models/entities/pedido.entity';
import { ProdutosQuantidadeDTO } from '../../models/dtos/produtosQuantidade.dto';
import { CriaPedidoDto } from '../../models/dtos/criaPedido.dto';
import { CriaPedidoProdutoUseCase } from '../criaPedidoProduto/criaPedidoProduto.use-case';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class CriaPedidoUseCase {
  @Inject('IPedidoRepo')
  private readonly pedidoRepo: IPedidoRepo;
  @Inject(CriaPedidoProdutoUseCase)
  private readonly criaPedidoProdutoUseCase: CriaPedidoProdutoUseCase;
  @Inject('PRODUTO_SERVICE')
  public readonly instanceProduto: ClientRMQ;
  @Inject('NOTIFICACAO_SERVICE')
  public readonly instanceNotificacao: ClientRMQ;
  @Inject('NOTA_FISCAL_SERVICE')
  public readonly intanceNotaFiscal: ClientRMQ;

  async execute(param: CriaPedidoDto) {
    try {
      const pedidoArray = this.geraArrayDosProdutosDoPedido(
        param.id_pessoa,
        param.produtos,
      );
      const pedido = await this.pedidoRepo.create(pedidoArray);
      await this.criaPedidoProdutoUseCase.execute({
        id_pedido: pedido.id,
        produtos: param.produtos,
      });
      param.id_pedido = pedido.id;
      this.instanceProduto.emit('produto_queue', {
        param,
      });
      this.instanceNotificacao.emit('notificacao_queue', { param });
      this.intanceNotaFiscal.emit('nota_fiscal_queue', { param });
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
