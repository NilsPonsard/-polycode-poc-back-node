import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true,
  })
  name: string;

  @Column({
    length: 2000,
    unique: true,
  })
  email: string;

  @Column('text')
  hashedPassword: string;
}
