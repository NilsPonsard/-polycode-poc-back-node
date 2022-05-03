import { randomUUID } from 'crypto';
import { AccessToken } from 'src/entities/accessToken.entity';
import { RefreshToken } from 'src/entities/refreshToken.entity';
import { User } from 'src/entities/user.entity';
import { accessExpiration, refreshExpiration, sign } from './jwt';

export function createToken(
  user: User,
  tokenEntity: RefreshToken | AccessToken,
) {
  const token = randomUUID();

  tokenEntity.token = token;
  tokenEntity.user = user;

  tokenEntity.save();
  return { token };
}

export async function newTokenPair(user: User) {
  const accessToken = await sign(
    createToken(user, new AccessToken()),
    accessExpiration,
  );

  const refreshToken = await sign(
    createToken(user, new RefreshToken()),
    refreshExpiration,
  );

  return { accessToken, refreshToken };
}
