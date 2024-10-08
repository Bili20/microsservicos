import { InjectRepository } from '@nestjs/typeorm';
import { INotaFiscalRepo } from '../models/interfaces/nota-fiscalRepo.interface';
import { NotaFiscal } from '../models/entities/nota-fiscal.entity';
import { Repository } from 'typeorm';

export class NotaFiscalRepo implements INotaFiscalRepo {
  constructor(
    @InjectRepository(NotaFiscal)
    private readonly notaFiscalRepo: Repository<NotaFiscal>,
  ) {}

  async create(param: NotaFiscal): Promise<void> {
    await this.notaFiscalRepo.save(param);
  }
}
