import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity('pedid_produto')
export class PedidoProduto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  id_produto: number;

  @Column({ nullable: false })
  id_pedido: number;

  @Column({ nullable: false })
  quantidade: number;

  @ManyToOne(() => Pedido, (pedido: Pedido) => pedido.pedidoProduto)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;
}
