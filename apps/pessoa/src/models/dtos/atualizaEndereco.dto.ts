import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { CriaEnderecoDto } from './criaEndereco.dto';

export class AtualizaEnderecoDTO extends CriaEnderecoDto {
  @IsString()
  @IsOptional()
  bairro: string;

  @IsNumber()
  @IsOptional()
  numero: number;

  @IsString()
  @IsOptional()
  estado: string;

  @IsString()
  @IsOptional()
  cidade: string;

  @IsBoolean()
  @IsOptional()
  principal: boolean;

  @IsString()
  @MinLength(8)
  @IsOptional()
  cep: string;
}
