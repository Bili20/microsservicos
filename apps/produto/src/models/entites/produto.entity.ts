import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CriaProdutoDto } from '../dtos/criaProduto.dto';

@Entity('produto')
export class Produto {
  constructor(props?: CriaProdutoDto) {
    Object.assign(this, props);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  nome: string;

  @Column({ type: 'decimal', nullable: false })
  valor: number;

  @Column({ nullable: false })
  qtd_estoque: number;
}
