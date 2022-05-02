import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class AccessToken extends BaseEntity {
  @PrimaryColumn()
  token: string;

  @ManyToOne(() => User /*, (user) => user.accessTokens*/)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
