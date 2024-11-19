import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IPessoaRepo } from '../../models/interfaces/pessoaRepo.interface';
import { BuscaUmaPessoaUseCase } from '../buscaUmaPessoa/buscaUmapessoa.use-case';
import { Pessoa } from '../../models/entities/pessoa.entity';
import { AtualizaPessoaDTO } from '../../models/dtos/atualizaPessoa.dto';
import { AtualizaEnderecoUseCase } from '../atualizaEndereco/atualizaEndereco.use-case';

@Injectable()
export class AtualizaPessoaUseCase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;
  @Inject(BuscaUmaPessoaUseCase)
  private readonly buscaUmaPessoaUsecase: BuscaUmaPessoaUseCase;
  @Inject(AtualizaEnderecoUseCase)
  private readonly atualizaEnderecoUseCase: AtualizaEnderecoUseCase;

  async execute(id: number, param: AtualizaPessoaDTO) {
    try {
      const dataPessoa = await this.buscaUmaPessoaUsecase.execute(id);
      if (param.endereco) {
        await this.atualizaEnderecoUseCase.execute(
          dataPessoa.endereco[0].id,
          param.endereco,
        );
      }
      delete param.endereco;
      const pessoa = new Pessoa(param);
      if (Object.keys(pessoa).length > 0) {
        await this.pessoaRepo.update(id, pessoa);
      }
    } catch (e) {
      throw new HttpException(
        e.response ?? 'Erro ao atualizar dados da pessoa.',
        e.status ?? 400,
      );
    }
  }
}
