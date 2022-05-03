import { ApiProperty } from '@nestjs/swagger';

export class RunCodeDto {
  @ApiProperty()
  language: string;

  @ApiProperty()
  code: string;
}
