import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ValidateMailDto {
  @IsNotEmpty()
  @ApiProperty()
  code: string;
}
