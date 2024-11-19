import { Pessoa } from '../entities/pessoa.entity';

export interface IPessoaRepo {
  create(param: Pessoa): Promise<Pessoa>;
  findOne(id: number): Promise<Pessoa>;
  find(): Promise<Pessoa[]>;
  update(id: number, param: Pessoa): Promise<void>;
  delete(id: number): Promise<void>;
}
