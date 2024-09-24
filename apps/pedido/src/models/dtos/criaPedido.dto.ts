import { IsArray, IsNumber } from 'class-validator';
import { ProdutosQuantidadeDTO } from './produtosQuantidade.dto';

export class CriaPedidoDto {
  @IsNumber()
  id_pessoa: number;

  @IsArray()
  produtos: ProdutosQuantidadeDTO[];
}