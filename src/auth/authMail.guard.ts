import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

/**
 * Check if the user is authenticated and has his mail validated
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
