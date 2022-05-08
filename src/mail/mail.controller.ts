import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { sendResetPasswordMail, sendValidationMail } from './send';
import { Request } from 'express';
import { ValidateMailDto } from './dto/validate-mail.dto';
import { ResetPassword, validateMail } from './validate';
import { SendResetPasswordMailDto } from './dto/send-reset-mail.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  @Post('resend')
  @ApiBearerAuth('authorization')
  @UseGuards(AuthGuard)
  async resend(@Req() request: Request) {
    await sendValidationMail(request.user);
    return { message: 'Mail sent' };
  }

  @HttpCode(200)
  @Post('validate')
  async validate(@Body() validateMailDto: ValidateMailDto) {
    const result = await validateMail(validateMailDto.code);

    if (!result) throw new HttpException('Invalid code', 401);

    return { message: 'Mail validated' };
  }

  @Post('send-reset')
  async sendResetMail(@Body() body: SendResetPasswordMailDto) {
    await sendResetPasswordMail(body.email);
    return { message: 'Mail sent' };
  }

  @Post('reset')
  @HttpCode(200)
  async resetPassword(@Body() body: ResetPasswordDto) {
    const result = await ResetPassword(body.code, body.newPassword);
    if (!result) throw new HttpException('Invalid code', 401);

    return { message: 'Password reset' };
  }
}
