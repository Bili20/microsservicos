import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pessoa } from './pessoa.entity';
import { CriaEnderecoDto } from '../dtos/criaEndereco.dto';

@Entity('endereco')
export class Endereco {
  constructor(props?: CriaEnderecoDto) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  bairro: string;

  @Column({ nullable: false })
  numero: number;

  @Column({ nullable: false })
  estado: string;

  @Column({ nullable: false })
  cidade: string;

  @Column({ nullable: false })
  cep: string;

  @Column({ nullable: false, default: false })
  principal: boolean;

  @Column({ nullable: false })
  id_pessoa: number;

  @ManyToOne(() => Pessoa, (pessoa: Pessoa) => pessoa.endereco)
  @JoinColumn({ name: 'id_pessoa' })
  pessoa: Pessoa;
}
