import { Module } from '@nestjs/common';
import { NotificacaoController } from './notificacao.controller';
import { NotificacaoService } from './notificacao.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeormConfig';
import { Pessoa } from './models/entities/pessoa.entity';
import { BuscaUmaPessoaUseCase } from './useCase/buscaUmaPessoa.use-case';
import { PessoaRepo } from './repository/pessoaRepo';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Pessoa]),
    MailerModule.forRoot({
      transport: {
        host: null,
        port: 1025,
        ignoreTLS: true,
        secure: false,
      },
      defaults: {
        from: '"',
      },
    }),
  ],
  controllers: [NotificacaoController],
  providers: [
    NotificacaoService,
    BuscaUmaPessoaUseCase,
    PessoaRepo,
    { provide: 'IPessoaRepo', useExisting: PessoaRepo },
  ],
})
export class NotificacaoModule {}
