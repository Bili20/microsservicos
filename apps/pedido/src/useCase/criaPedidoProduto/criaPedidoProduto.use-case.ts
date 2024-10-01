import { Inject, Injectable } from '@nestjs/common';
import { IPedidoProdutoRepo } from '../../models/interfaces/pedidoProdutoRepo.interface';
import { CriaPedidoProdutoDTO } from '../../models/dtos/criaPedidoProduto.dto';
import { PedidoProduto } from '../../models/entities/pedidoProduto.entity';

@Injectable()
export class CriaPedidoProdutoUseCase {
  @Inject('IPedidoProdutoRepo')
  private readonly pedidoProdutoRepo: IPedidoProdutoRepo;

  async execute(param: CriaPedidoProdutoDTO) {
    for (const produto of param.produtos) {
      const pedidoProduto = new PedidoProduto();
      pedidoProduto.id_pedido = param.id_pedido;
      pedidoProduto.id_produto = produto.id_produto;
      pedidoProduto.quantidade = produto.quantidade;
      await this.pedidoProdutoRepo.create(pedidoProduto);
    }
  }
}
