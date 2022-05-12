import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CheckUser } from './check-user';

declare module 'express' {
  interface Request {
    accessToken: string | undefined;
    user: User | undefined;
  }
}

/**
 * Check if the user is authenticated and adds the user info to the request object :
 * - request.user
 * - request.accessToken
 */
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return CheckUser(request);
  }
}
