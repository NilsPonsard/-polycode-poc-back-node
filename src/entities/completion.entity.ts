import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

// Stores when a user completed an exercise
@Entity()
export class Completion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  collectionId: string;

  @Column()
  exerciseId: string;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
