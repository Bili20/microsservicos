import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CriaPessoaUseCase } from './criaPessoa.use-case';
import { CriaPessoaDto } from '../../models/dtos/criaPessoa.dto';
import { CriaEnderecoDto } from '../../models/dtos/criaEndereco.dto';

@Controller('pessoa')
export class CriaPessoaController {
  @Inject(CriaPessoaUseCase)
  private readonly criaPessoaUsecase: CriaPessoaUseCase;

  @Post()
  async criaPessoa(
    @Body() param: CriaPessoaDto & { endereco?: CriaEnderecoDto },
  ) {
    await this.criaPessoaUsecase.execute(param);
  }
}
