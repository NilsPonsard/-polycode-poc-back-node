import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CheckUser } from './check-user';

/**
 * Check if the user is authenticated and has his mail validated
 */
@Injectable()
export class AuthGuardValidMail implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const validUser = await CheckUser(request);

    if (!validUser) return false;

    return request.user.emailVerified;
  }
}
