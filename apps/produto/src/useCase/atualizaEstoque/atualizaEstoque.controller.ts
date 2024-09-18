import { Controller, Inject } from '@nestjs/common';
import { AtualizaEstoqueUseCase } from './atualizaEstoque.use-case';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Produto } from '../../models/entites/produto.entity';

@Controller()
export class AtualizaEstoqueController {
  @Inject(AtualizaEstoqueUseCase)
  private readonly atualizaEstoqueUseCase: AtualizaEstoqueUseCase;

  @MessagePattern('pedido_queue')
  async update(@Payload() data: string, @Ctx() context: RmqContext) {
    return await this.atualizaEstoqueUseCase.execute(data, context);
  }
}
