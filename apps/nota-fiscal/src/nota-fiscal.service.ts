import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { INotaFiscalRepo } from './models/interfaces/nota-fiscalRepo.interface';
import { Ctx, RmqContext } from '@nestjs/microservices';
import { NotaFiscal } from './models/entities/nota-fiscal.entity';
import { BuscaUmaPessoaUseCase } from './useCase/buscaUmaPessoa.use-case';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { DadoEmpresa } from './constants/contants';

@Injectable()
export class NotaFiscalService {
  @Inject('INotaFiscalRepo')
  private readonly notaFiscalrepo: INotaFiscalRepo;
  @Inject(BuscaUmaPessoaUseCase)
  private readonly buscaUmaPessoaUseCase: BuscaUmaPessoaUseCase;

  async execute(data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orinalMsg = context.getMessage();

    const notaFiscal = new NotaFiscal();
    notaFiscal.id_pedido = data.param.id_pedido;
    notaFiscal.anexo = 'anexo';
    await this.notaFiscalrepo.create(notaFiscal);
    await this.geraPdfNotaFiscal(data);

    channel.ack(orinalMsg);
  }

  private async geraPdfNotaFiscal(pedido: any) {
    const doc = new PDFDocument();
    const pessoa = await this.buscaUmaPessoaUseCase.execute(
      pedido.param.id_pessoa,
    );
    console.log(pessoa);
    const numeroNota = pedido.param.id_pedido;
    const dataCadastro = new Date().toLocaleDateString();
    const filePath = 'nota_fiscal' + numeroNota + '.pdf';

    doc.fontSize(18).text('Nota Fiscal', { align: 'center' });
    doc.text('-----------------------------------------------------------');
    doc.moveDown();
    doc.fontSize(12).text(`Número: ${numeroNota}`);
    doc.text(`Data de emissão: ${dataCadastro}`);
    doc.moveDown();
    doc.text(`Comprador: ${pessoa.nome}`);
    doc.text(`Documento: ${pessoa.documento}`);
    doc.text(`Endereço: `);
    // doc.text(`Bairro: ${pessoa.endereco[0].bairro}`);
    // doc.text(`Numero: ${pessoa.endereco[0].numero}`);
    // doc.text(`Cidade: ${pessoa.endereco[0].cidade}`);
    // doc.text(`Cep: ${pessoa.endereco[0].cep}`);
    doc.moveDown();
    doc.text(`Vendedor: ${DadoEmpresa.nome}`);
    doc.text(`CNPJ: ${DadoEmpresa.cnpj}`);
    doc.text(`Endereço: ${DadoEmpresa.endereco}`);
    doc.moveDown();

    doc.fontSize(18).text('Produtos', { align: 'center' });
    doc.text('-----------------------------------------------------------');
    // for (const produto of produtos) {
    //   doc.fontSize(12).text(`Nome: ${produto.nome}`);
    //   doc.text(`Valor: R$ ${produto.valor}`);
    //   doc.text(`Quantidade: ${produto.quantidade}`);
    //   doc.moveDown();
    // }
    doc.fontSize(18).text(`Total: R$ ${pedido.total}`);
    const writeStream = fs.createWriteStream('./notas/' + filePath);

    doc.pipe(writeStream);
    doc.end();
    console.log('alo');
    writeStream.on('error', (err) => {
      throw new BadRequestException({
        messgae: 'Erro ao salvar o arquivo:',
        err,
      });
    });
    return {
      filePath,
      pessoa,
      numero: numeroNota,
      data: dataCadastro,
      total: pedido.total,
    };
  }
}
