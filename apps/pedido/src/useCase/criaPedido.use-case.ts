import { Inject, Injectable } from '@nestjs/common';
import { IPedidoRepo } from '../models/interfaces/pedidoRepo.interface';

@Injectable()
export class CriaPedidoUseCase {
  @Inject('IPedidoRepo')
  private readonly pedidoRepo: IPedidoRepo;

  async execute() {}
}
