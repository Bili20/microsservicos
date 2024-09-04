import { Pessoa } from '../entities/pessoa.entity';

export interface IPessoaRepo {
  create(param: Pessoa): Promise<Pessoa>;
  findOne(id: number): Promise<Pessoa>;
}
