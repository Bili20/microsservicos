import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  nome: string;

  @Column({ type: 'decimal', nullable: false })
  valor: number;

  @Column({ nullable: false, default: 0 })
  qtd_estoque: number;
}
