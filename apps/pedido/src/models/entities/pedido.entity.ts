import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PedidoProduto } from './pedidoProduto.entity';

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  quantidade: number;

  @Column({
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  data_cadastro: Date;

  @Column({ type: 'decimal', nullable: false })
  total: number;

  @Column({ nullable: false, default: 'Em aguardo' })
  status: string;

  @Column({ nullable: false })
  id_pessoa: number;

  @OneToMany(
    () => PedidoProduto,
    (pedidoProduto: PedidoProduto) => pedidoProduto.pedido,
  )
  pedidoProduto: PedidoProduto;
}
