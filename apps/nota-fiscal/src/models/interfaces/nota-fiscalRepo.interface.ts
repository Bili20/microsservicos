import { NotaFiscal } from '../entities/nota-fiscal.entity';

export interface INotaFiscalRepo {
  create(param: NotaFiscal): Promise<void>;
}
