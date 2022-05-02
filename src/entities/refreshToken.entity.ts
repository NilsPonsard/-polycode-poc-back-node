import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RefreshToken extends BaseEntity {
  @PrimaryColumn()
  token: string;

  @ManyToOne(() => User /*, (user) => user.refreshTokens */)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
