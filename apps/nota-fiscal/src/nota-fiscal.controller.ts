import { Controller, Inject } from '@nestjs/common';
import { NotaFiscalService } from './nota-fiscal.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class NotaFiscalController {
  @Inject(NotaFiscalService)
  private readonly notaFiscalService: NotaFiscalService;

  @MessagePattern('nota_fiscal_queue')
  execute(@Payload() data: any, @Ctx() context: RmqContext) {
    return this.notaFiscalService.execute(data, context);
  }
}
