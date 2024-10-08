import { Controller, Inject } from '@nestjs/common';
import { AtualizaEstoqueUseCase } from './atualizaEstoque.use-case';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AtualizaEstoqueController {
  @Inject(AtualizaEstoqueUseCase)
  private readonly atualizaEstoqueUseCase: AtualizaEstoqueUseCase;

  @MessagePattern('produto_queue')
  async update(@Payload() data: any, @Ctx() context: RmqContext) {
    return await this.atualizaEstoqueUseCase.execute(data, context);
  }
}
