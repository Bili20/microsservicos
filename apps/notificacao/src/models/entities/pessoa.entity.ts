import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
