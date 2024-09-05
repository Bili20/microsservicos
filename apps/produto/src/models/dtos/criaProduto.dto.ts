import { IsString } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';

export class CriaProdutoDto {
  @IsString()
  nome: string;

  @IsNumber()
  valor: number;

  @IsNumber()
  qtd_estoque: number;
}
