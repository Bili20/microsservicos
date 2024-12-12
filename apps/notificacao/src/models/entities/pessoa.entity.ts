import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pessoa')
export class Pessoa {
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
}
