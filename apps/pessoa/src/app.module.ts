import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaModule } from './useCase/pessoa.module';
import { typeOrmConfig } from './config/typeormConfig';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PessoaModule],
})
export class AppModule {}
