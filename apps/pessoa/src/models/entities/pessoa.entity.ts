import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Endereco } from './endereco.entity';
import { CriaPessoaDto } from '../dtos/criaPessoa.dto';
@Entity('pessoa')
export class Pessoa {
  constructor(props?: CriaPessoaDto) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'documento', nullable: false, unique: true })
  documento: string;

  @Column({ name: 'data_nascimento', nullable: false })
  data_nacimento: Date;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'telefone', nullable: false })
  telefone: string;

  @Column({ name: 'sexo', nullable: false })
  sexo: string;

  @OneToMany(() => Endereco, (endereco: Endereco) => endereco.pessoa)
  endereco: Endereco;
}
