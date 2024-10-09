import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Endereco } from './endereco.entity';

@Entity('pessoa')
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false, unique: true })
  documento: string;

  @Column({ nullable: false })
  data_nacimento: Date;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  telefone: string;

  @Column({ nullable: false })
  sexo: string;

  @OneToMany(() => Endereco, (endereco: Endereco) => endereco.pessoa)
  endereco: Endereco;
}
