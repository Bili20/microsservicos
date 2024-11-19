import { Inject, Injectable } from '@nestjs/common';
import { Endereco } from '../../models/entities/endereco.entity';
import { IEnderecoRepo } from '../../models/interfaces/enderecorepo.interface';
import { BuscaUmEnderecoPrincipalUseCase } from '../buscaEnderecoPrincipal/buscaEnderecoPrincipla.use-case';
import { AtualizaEnderecoDTO } from '../../models/dtos/atualizaEndereco.dto';

@Injectable()
export class AtualizaEnderecoUseCase {
  @Inject('IEnderecoRepo')
  private readonly enderecoRepo: IEnderecoRepo;
  @Inject(BuscaUmEnderecoPrincipalUseCase)
  private readonly buscaUmEnderecoPrincipalUseCase: BuscaUmEnderecoPrincipalUseCase;

  async execute(id: number, param: AtualizaEnderecoDTO) {
    if (param.principal == true) {
      const endereco = await this.buscaUmEnderecoPrincipalUseCase.execute(
        param.id_pessoa,
      );
      if (endereco && endereco.id != id) {
        endereco.principal = false;
        await this.enderecoRepo.update(endereco.id, endereco);
      }
    }

    const endereco = new Endereco(param);
    await this.enderecoRepo.update(id, endereco);
  }
}
