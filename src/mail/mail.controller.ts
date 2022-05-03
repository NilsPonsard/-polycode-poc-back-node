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
import { sendValidationMail } from './send';
import { Request } from 'express';
import { ValidateMailDto } from './dto/validate-mail.dto';
import { validateMail } from './validate';

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
}
