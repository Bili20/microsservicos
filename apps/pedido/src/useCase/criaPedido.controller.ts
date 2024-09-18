import { Controller, Inject, Post } from '@nestjs/common';
import { CriaPedidoUseCase } from './criaPedido.use-case';

@Controller('pedido')
export class CriaPedidoController {
  @Inject(CriaPedidoUseCase)
  private readonly criaPedidoUseCase: CriaPedidoUseCase;

  @Post()
  async create() {
    return await this.criaPedidoUseCase.execute();
  }
}
