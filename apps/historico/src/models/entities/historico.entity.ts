import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from '../../enum/status.enum';

@Entity({ name: 'historico' })
export class Historico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  id_pedido: number;

  @Column({ nullable: false })
  status: StatusEnum;
}
