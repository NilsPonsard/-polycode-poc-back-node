import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AccessToken } from 'src/entities/accessToken.entity';
import { AuthGuard } from './auth.guard';

import { accessExpiration, verify } from './jwt';

/**
 * Check if the user is authenticated and adds the user info to the request object :
 * - request.user
 * - request.accessToken
 */
@Injectable()
export class AuthGuardValidMail implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return (
      new AuthGuard().canActivate(context) &&
      context.switchToHttp().getRequest().user.validated
    );
  }
}
