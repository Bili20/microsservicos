import { Pedido } from '../entities/pedido.entity';

export interface IPedidoRepo {
  create(param: Pedido): Promise<Pedido>;
}
