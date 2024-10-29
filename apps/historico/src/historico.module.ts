import { Module } from '@nestjs/common';
import { HistoricoController } from './historico.controller';
import { HistoricoService } from './historico.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeormConfig';
import { Historico } from './models/entities/historico.entity';
import { HistoricoRepo } from './repository/historicoRepo';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Historico]),
  ],
  controllers: [HistoricoController],
  providers: [
    HistoricoService,
    HistoricoRepo,
    { provide: 'IHistoricoRepo', useExisting: HistoricoRepo },
  ],
})
export class HistoricoModule {}
