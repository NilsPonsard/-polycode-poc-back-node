import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Token extends BaseEntity {
  @PrimaryColumn()
  accessToken: string;

  @Column({ unique: true })
  refreshToken: string;

  @ManyToOne(() => User /*, (user) => user.accessTokens*/)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
