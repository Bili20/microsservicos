import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CriaPedidoUseCase } from './criaPedido.use-case';
import { CriaPedidoDto } from '../models/dtos/criaPedido.dto';

@Controller('pedido')
export class CriaPedidoController {
  @Inject(CriaPedidoUseCase)
  private readonly criaPedidoUseCase: CriaPedidoUseCase;

  @Post()
  async create(@Body() param: CriaPedidoDto) {
    return await this.criaPedidoUseCase.execute(param);
  }
}
