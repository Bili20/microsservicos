import { IsArray, IsNumber } from 'class-validator';
import { ProdutosQuantidadeDTO } from './produtosQuantidade.dto';
import { Pedido } from '../entities/pedido.entity';

export class CriaPedidoDto {
  @IsNumber()
  id_pessoa: number;

  @IsNumber()
  id_pedido: number;

  @IsArray()
  produtos: ProdutosQuantidadeDTO[];
}
