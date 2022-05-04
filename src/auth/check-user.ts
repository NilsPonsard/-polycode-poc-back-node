import { AccessToken } from 'src/entities/accessToken.entity';
import { accessExpiration, verify } from './jwt';

export async function CheckUser(request: any): Promise<boolean> {
  const authorization = request.headers?.authorization as undefined | string;

  if (!authorization) return false;
  const content = await verify(authorization.replace('Bearer ', ''));

  const token = typeof content != 'string' ? content?.token : undefined;
  if (!token) return false;

  const queryResult = await AccessToken.findOne({
    where: { token },
    relations: { user: true },
  });

  if (!queryResult) return false;

  const { user, createdAt } = queryResult;

  if (createdAt.getTime() + accessExpiration * 1000 < Date.now()) {
    // delete old token
    AccessToken.delete({ token });
    return false;
  }
  if (!user) return false;

  request.user = user;
  request.accessToken = token;
  return true;
}
