import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PedidoProduto } from './pedidoProduto.entity';
import { StatusEnum } from 'apps/pedido/src/enum/status.enum';
import { BadRequestException } from '@nestjs/common';

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  quantidade: number;

  @Column({ nullable: true })
  status: string;

  @Column({
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  data_cadastro: Date;

  @Column({ nullable: true })
  data_atualizacao: Date;

  @Column({ type: 'decimal', nullable: false })
  total: number;

  @Column({ nullable: false })
  id_pessoa: number;

  @OneToMany(
    () => PedidoProduto,
    (pedidoProduto: PedidoProduto) => pedidoProduto.pedido,
  )
  pedidoProduto: PedidoProduto;

  verificaStatus(status: StatusEnum) {
    if (this.status == status) {
      throw new BadRequestException({
        message: 'Status não pode ser igual ao do mesmo momento.',
      });
    }
  }
}
