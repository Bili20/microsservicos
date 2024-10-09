import { Injectable } from '@nestjs/common';
import { IProdutoRepo } from '../models/interfaces/produtoRepo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from '../models/entities/produto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdutoRepo implements IProdutoRepo {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepo: Repository<Produto>,
  ) {}

  async findOne(idProduo: number): Promise<Produto> {
    return await this.produtoRepo.findOne({ where: { id: idProduo } });
  }
}
