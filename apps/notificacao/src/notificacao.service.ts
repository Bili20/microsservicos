import { Inject, Injectable } from '@nestjs/common';
import { Ctx, RmqContext } from '@nestjs/microservices';
import { BuscaUmaPessoaUseCase } from './useCase/buscaUmaPessoa.use-case';
import { MailerService } from '@nestjs-modules/mailer';
import { Pessoa } from './models/entities/pessoa.entity';

@Injectable()
export class NotificacaoService {
  @Inject(BuscaUmaPessoaUseCase)
  private readonly buscaUmaPessoaUseCase: BuscaUmaPessoaUseCase;
  @Inject(MailerService)
  private readonly mailerService: MailerService;

  async execute(data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orinalMsg = context.getMessage();

    const pessoa = await this.buscaUmaPessoaUseCase.execute(
      data.param.id_pessoa,
    );
    console.log('alooooo');

    await this.enviaEmail(pessoa);
    channel.ack(orinalMsg);
  }

  private async enviaEmail(pessoa: Pessoa) {
    await this.mailerService.sendMail({
      to: pessoa.email,
      from: 'teste@gmail.com',
      subject: 'Monolito',
      html: `<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login</title>
  </head>
  <body class="content">
    <h1>Olá, ${pessoa.nome}</h1>
    <p>
    Em anexo, enviamos este documento que confirma o pedido.
    </p>
  </body>
</html>
`,
    });
  }
}
