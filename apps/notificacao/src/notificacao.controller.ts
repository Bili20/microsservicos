import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { NotificacaoService } from './notificacao.service';

@Controller()
export class NotificacaoController {
  constructor(private readonly notificacaoService: NotificacaoService) {}

  @MessagePattern('notificacao_queue')
  getHello(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('alooooo');
    return this.notificacaoService.execute(data, context);
  }
}
