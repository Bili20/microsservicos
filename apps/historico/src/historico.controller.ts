import { Controller, Get, Inject } from '@nestjs/common';
import { HistoricoService } from './historico.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class HistoricoController {
  @Inject(HistoricoService) private readonly historicoService: HistoricoService;

  @MessagePattern('historico_queue')
  execute(@Payload() data: any, @Ctx() context: RmqContext) {
    this.historicoService.execute(data, context);
  }
}
