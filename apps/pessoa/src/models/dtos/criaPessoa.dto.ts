import { IsString } from '@nestjs/class-validator';
import { IsEmail, MinLength } from 'class-validator';

export class CriaPessoaDto {
  @IsString()
  nome: string;

  @IsString()
  documento: string;

  @IsString()
  data_nacimento: Date;

  @IsEmail()
  email: string;

  @IsString()
  sexo: string;

  @IsString()
  @MinLength(11)
  telefone: string;
}
