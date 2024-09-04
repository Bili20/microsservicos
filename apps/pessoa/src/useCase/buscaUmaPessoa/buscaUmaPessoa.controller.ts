import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { BuscaUmaPessoaUseCase } from './buscaUmapessoa.use-case';

@Controller('pessoa')
export class BuscaUmaPessoaController {
  @Inject(BuscaUmaPessoaUseCase)
  private readonly buscaUmaPessoaUseCase: BuscaUmaPessoaUseCase;

  @Get(':id')
  async buscapessoa(@Param('id') id: number) {
    return await this.buscaUmaPessoaUseCase.execute(id);
  }
}
