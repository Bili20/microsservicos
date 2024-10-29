import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from '../models/entities/pedido.entity';
import { IPedidoRepo } from '../models/interfaces/pedidoRepo.interface';
import { Repository } from 'typeorm';

export class PedidoRepo implements IPedidoRepo {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidorepo: Repository<Pedido>,
  ) {}

  async create(param: Pedido): Promise<Pedido> {
    return await this.pedidorepo.save(param);
  }

  async findOne(id: number): Promise<Pedido> {
    return await this.pedidorepo.findOne({
      where: { id: id },
      relations: { pedidoProduto: true },
    });
  }

  async update(id: number, param: Pedido): Promise<void> {
    await this.pedidorepo.update(id, param);
  }
}
