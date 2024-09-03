import { Controller, Get } from '@nestjs/common';
import { ProdutoService } from './produto.service';

@Controller()
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  getHello(): string {
    return this.produtoService.getHello();
  }
}
