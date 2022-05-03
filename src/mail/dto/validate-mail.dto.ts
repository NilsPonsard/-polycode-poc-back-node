import { ApiProperty } from '@nestjs/swagger';

export class ValidateMailDto {
  @ApiProperty()
  code: string;
}
