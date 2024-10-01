import { Pessoa } from '../entities/pessoa.entity';

export interface IPessoaRepo {
  findOne(id: number): Promise<Pessoa>;
}
