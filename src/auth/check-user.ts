import { Token } from 'src/entities/Token.entity';
import { accessExpiration, verify } from './jwt';

export async function CheckUser(request: any): Promise<boolean> {
  const authorization = request.headers?.authorization as undefined | string;

  if (!authorization) return false;
  const content = await verify(authorization.replace('Bearer ', ''));

  const accessToken = typeof content != 'string' ? content?.token : undefined;
  if (!accessToken) return false;

  const queryResult = await Token.findOne({
    where: { accessToken },
    relations: { user: true },
  });

  if (!queryResult) return false;

  const { user, createdAt } = queryResult;

  if (createdAt.getTime() + accessExpiration * 1000 < Date.now()) {
    // delete old accessToken
    accessToken.delete({ accessToken });
    return false;
  }
  if (!user) return false;

  request.user = user;
  request.accessToken = accessToken;
  return true;
}
