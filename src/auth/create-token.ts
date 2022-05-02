import { AccessToken } from 'src/entities/accessToken.entity';
import { RefreshToken } from 'src/entities/refreshToken.entity';
import { User } from 'src/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { accessExpiration, refreshExpiration, sign } from './jwt';

export function createAccessToken(user: User): { token: string } {
  const token = uuidv4();

  const accessToken = new AccessToken();
  accessToken.token = token;
  accessToken.user = user;

  accessToken.save();

  return { token };
}

export function createRefreshToken(user: User): { token: string } {
  const token = uuidv4();

  const refreshToken = new RefreshToken();
  refreshToken.token = token;
  refreshToken.user = user;

  refreshToken.save();
  return { token };
}

export function newTokenPair(user: User) {
  const accessToken = sign(createAccessToken(user), accessExpiration);
  const refreshToken = sign(createRefreshToken(user), refreshExpiration);

  return { accessToken, refreshToken };
}
