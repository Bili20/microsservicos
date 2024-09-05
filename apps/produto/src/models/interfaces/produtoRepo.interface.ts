import { Produto } from '../entites/produto.entity';

export interface IProdutoRepo {
  create(param: Produto): Promise<void>;
  findOne(id: number): Promise<Produto>;
  update(id: number, param: Produto): Promise<void>;
}
