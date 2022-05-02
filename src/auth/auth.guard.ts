import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AccessTokens } from 'src/entities/accessTokens.entity';
import { accessExpiration, verify } from './jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers?.authorization as undefined | string;

    if (!authorization) return false;
    const content = await verify(authorization);

    const token = typeof content != 'string' ? content?.token : undefined;
    if (!token) return false;

    const { user, createdAt } = await AccessTokens.findOne({
      where: { token },
    });

    if (!user) return false;
    if (createdAt.getTime() + accessExpiration * 1000 < Date.now())
      return false;

    request.user = user;
    return true;
  }
}
