import { Inject, Injectable } from '@nestjs/common';
import { CriaEnderecoDto } from '../../models/dtos/criaEndereco.dto';
import { Endereco } from '../../models/entities/endereco.entity';
import { IEnderecoRepo } from '../../models/interfaces/enderecorepo.interface';
import { BuscaUmEnderecoPrincipalUseCase } from '../buscaEnderecoPrincipal/buscaEnderecoPrincipla.use-case';

@Injectable()
export class CriaEnderecoUseCase {
  @Inject('IEnderecoRepo')
  private readonly enderecoRepo: IEnderecoRepo;
  @Inject(BuscaUmEnderecoPrincipalUseCase)
  private readonly buscaUmEnderecoPrincipalUseCase: BuscaUmEnderecoPrincipalUseCase;

  async execute(param: CriaEnderecoDto) {
    if (param.principal == true) {
      const endereco = await this.buscaUmEnderecoPrincipalUseCase.execute(
        param.id_pessoa,
      );
      if (endereco) {
        endereco.principal = false;
        await this.enderecoRepo.update(endereco.id, endereco);
      }
    }
    const endereco = new Endereco(param);
    await this.enderecoRepo.create(endereco);
    return;
  }
}
