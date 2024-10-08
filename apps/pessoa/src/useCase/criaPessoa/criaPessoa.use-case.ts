import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IPessoaRepo } from '../../models/interfaces/pessoaRepo.interface';
import { CriaPessoaDto } from '../../models/dtos/criaPessoa.dto';
import { CriaEnderecoDto } from '../../models/dtos/criaEndereco.dto';
import { isCPF } from 'validation-br';
import { Pessoa } from '../../models/entities/pessoa.entity';
import { CriaEnderecoUseCase } from '../criaEndereco/criaEndereco.use-case';

@Injectable()
export class CriaPessoaUseCase {
  @Inject('IPessoaRepo')
  private readonly pessoaRepo: IPessoaRepo;
  @Inject(CriaEnderecoUseCase)
  private readonly criaEnderecoUseCase: CriaEnderecoUseCase;

  async execute(param: CriaPessoaDto & { endereco?: CriaEnderecoDto }) {
    try {
      if (!isCPF(param.documento)) {
        throw new BadRequestException({ message: 'Documento inválido.' });
      }
      const pessoa = new Pessoa();
      pessoa.nome = param.nome;
      pessoa.email = param.email;
      pessoa.documento = param.documento;
      pessoa.data_nacimento = param.data_nacimento;
      pessoa.sexo = param.sexo;
      pessoa.telefone = param.telefone;

      const dataPessoa = await this.pessoaRepo.create(pessoa);
      if (param.endereco) {
        param.endereco.id_pessoa = dataPessoa.id;
        await this.criaEnderecoUseCase.execute(param.endereco);
      }
    } catch (e) {
      if (e.code == 23505) {
        e.response = `cadastros existentes: ${e.detail}`;
      }
      throw new HttpException(
        e.response ?? 'Erro ao cadastrar pessoa.',
        e.status ?? 400,
      );
    }
  }
}
