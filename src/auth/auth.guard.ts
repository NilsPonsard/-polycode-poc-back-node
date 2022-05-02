import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AccessToken } from 'src/entities/accessToken.entity';
import { User } from 'src/entities/user.entity';
import { accessExpiration, verify } from './jwt';

declare module 'express' {
  interface Request {
    accessToken: string;
    user: User;
  }
}
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
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

    if (!user) return false;
    if (createdAt.getTime() + accessExpiration * 1000 < Date.now())
      return false;

    request.user = user;
    request.accessToken = token;
    return true;
  }
}
