import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendResetPasswordMailDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}
