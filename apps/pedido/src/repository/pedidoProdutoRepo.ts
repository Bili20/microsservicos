import { InjectRepository } from '@nestjs/typeorm';
import { PedidoProduto } from '../models/entities/pedidoProduto.entity';
import { IPedidoProdutoRepo } from '../models/interfaces/pedidoProdutoRepo.interface';
import { Repository } from 'typeorm';

export class PedidoProdutoRepo implements IPedidoProdutoRepo {
  constructor(
    @InjectRepository(PedidoProduto)
    private readonly pedidoProduto: Repository<PedidoProduto>,
  ) {}
  async create(param: PedidoProduto): Promise<PedidoProduto> {
    return await this.pedidoProduto.save(param);
  }
}
