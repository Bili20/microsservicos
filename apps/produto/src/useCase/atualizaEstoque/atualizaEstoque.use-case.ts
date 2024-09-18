import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IProdutoRepo } from '../../models/interfaces/produtoRepo.interface';
import { Produto } from '../../models/entites/produto.entity';
import { Ctx, RmqContext } from '@nestjs/microservices';

@Injectable()
export class AtualizaEstoqueUseCase {
  @Inject('IProdutoRepo')
  private readonly produtoRepo: IProdutoRepo;

  async execute(data: string, @Ctx() context: RmqContext) {
    console.log(data);
    const channel = context.getChannelRef();
    const orinalMsg = context.getMessage();

    // if (data.quantidade > data.produto.qtd_estoque) {
    //   throw new BadRequestException({
    //     message: 'Sem quantidade de produto em estoque.',
    //   });
    // }
    // const valorDesconto = data.produto.qtd_estoque - data.quantidade;
    // data.produto.qtd_estoque = valorDesconto;
    // await this.produtoRepo.update(data.produto.id, data.produto);

    channel.ack(orinalMsg);
  }
}
