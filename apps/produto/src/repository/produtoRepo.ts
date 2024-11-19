import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from '../models/entites/produto.entity';
import { IProdutoRepo } from '../models/interfaces/produtoRepo.interface';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutoRepo implements IProdutoRepo {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepo: Repository<Produto>,
  ) {}

  async create(param: Produto): Promise<void> {
    await this.produtoRepo.save(param);
  }

  async findOne(id: number): Promise<Produto> {
    return await this.produtoRepo.findOne({ where: { id: id } });
  }

  async find(): Promise<Produto[]> {
    return await this.produtoRepo.find({ take: 1000 });
  }

  async update(id: number, param: Produto): Promise<void> {
    await this.produtoRepo.update(id, param);
  }
}
