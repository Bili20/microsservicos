import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Ctx, RmqContext } from '@nestjs/microservices';
import { IProdutoRepo } from '../../models/interfaces/produtoRepo.interface';

@Injectable()
export class AtualizaEstoqueUseCase {
  @Inject('IProdutoRepo')
  private readonly produtoRepo: IProdutoRepo;

  async execute(data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orinalMsg = context.getMessage();
    // falta validar quando der erro oqq deve acontecer.
    await Promise.all(
      data.param.produtos.map(async (data) => {
        const produto = await this.produtoRepo.findOne(data.id_produto);
        if (data.quantidade > produto.qtd_estoque) {
          throw new BadRequestException({
            message: 'Sem quantidade de produto em estoque.',
          });
        }

        const valorDesconto = produto.qtd_estoque - data.quantidade;
        produto.qtd_estoque = valorDesconto;

        await this.produtoRepo.update(data.id_produto, produto);
      }),
    );
    channel.ack(orinalMsg);
  }
}
