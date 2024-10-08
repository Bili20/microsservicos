import { InjectRepository } from '@nestjs/typeorm';
import { IPessoaRepo } from '../models/interfaces/pessoaRepo.interface';
import { Pessoa } from '../models/entities/pessoa.entity';
import { Repository } from 'typeorm';

export class PessoaRepo implements IPessoaRepo {
  constructor(
    @InjectRepository(Pessoa) private readonly pessoarepo: Repository<Pessoa>,
  ) {}

  async findOne(idPessoa: number): Promise<Pessoa> {
    return await this.pessoarepo.query(
      `SELECT * FROM pessoa WHERE id = ${idPessoa} JOIN endereco ON endereco.id_pessoa = pessoa.id`,
    );
  }
}
