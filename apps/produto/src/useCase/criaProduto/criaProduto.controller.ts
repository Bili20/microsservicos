import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CriaProdutoUseCase } from './criaProduto.use-case';
import { CriaProdutoDto } from '../../models/dtos/criaProduto.dto';

@Controller('produto')
export class CriaprodutoController {
  @Inject(CriaProdutoUseCase)
  private readonly criaProdutoUseCase: CriaProdutoUseCase;

  @Post()
  async criaProduto(@Body() param: CriaProdutoDto) {
    return await this.criaProdutoUseCase.execute(param);
  }
}
