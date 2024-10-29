import { StatusEnum } from 'apps/pedido/src/enum/status.enum';
import { IsEnum } from 'class-validator';

export class AtualizaStatusDto {
  @IsEnum(StatusEnum)
  status: StatusEnum;
}
