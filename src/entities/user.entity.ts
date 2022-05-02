import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    length: 2000,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  hashedPassword: string;

  @Column({
    default: false,
  })
  emailVerified: boolean;
}
