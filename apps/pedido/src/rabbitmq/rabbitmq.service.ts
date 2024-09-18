import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
  @Inject('PEDIDO_SERVICE')
  public readonly instance: ClientRMQ;
}
