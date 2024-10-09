import { Produto } from '../entities/produto.entity';

export interface IProdutoRepo {
  findOne(idProduo: number): Promise<Produto>;
}
