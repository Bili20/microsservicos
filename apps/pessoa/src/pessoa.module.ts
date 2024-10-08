import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeormConfig';
import { Endereco } from './models/entities/endereco.entity';
import { Pessoa } from './models/entities/pessoa.entity';
import { PessoaRepo } from './repository/pessoaRepo';
import { BuscaUmaPessoaController } from './useCase/buscaUmaPessoa/buscaUmaPessoa.controller';
import { BuscaUmaPessoaUseCase } from './useCase/buscaUmaPessoa/buscaUmapessoa.use-case';
import { CriaPessoaController } from './useCase/criaPessoa/criaPessoa.controller';
import { CriaPessoaUseCase } from './useCase/criaPessoa/criaPessoa.use-case';
import { CriaEnderecoUseCase } from './useCase/criaEndereco/criaEndereco.use-case';
import { BuscaUmEnderecoPrincipalUseCase } from './useCase/buscaEnderecoPrincipal/buscaEnderecoPrincipla.use-case';
import { EnderecoRepo } from './repository/enderecoRepo';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Pessoa, Endereco]),
  ],
  providers: [
    CriaPessoaUseCase,
    BuscaUmaPessoaUseCase,
    PessoaRepo,
    { provide: 'IPessoaRepo', useExisting: PessoaRepo },
    CriaEnderecoUseCase,
    BuscaUmEnderecoPrincipalUseCase,
    EnderecoRepo,
    { provide: 'IEnderecoRepo', useExisting: EnderecoRepo },
  ],
  controllers: [CriaPessoaController, BuscaUmaPessoaController],
})
export class PessoaModule {}
