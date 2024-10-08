import { Pessoa } from '../entities/pessoa.entity';

export interface IPessoaRepo {
  findOne(idPessoa: number): Promise<Pessoa>;
}
