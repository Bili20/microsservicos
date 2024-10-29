import { StatusEnum } from 'apps/pedido/src/enum/status.enum';
import { IsArray, IsEnum, IsNumber } from 'class-validator';
import { ProdutosQuantidadeDTO } from './produtosQuantidade.dto';

export class CriaPedidoDto {
  @IsNumber()
  id_pessoa: number;

  @IsNumber()
  id_pedido: number;

  @IsEnum(StatusEnum)
  status: StatusEnum;

  @IsArray()
  produtos: ProdutosQuantidadeDTO[];
}
