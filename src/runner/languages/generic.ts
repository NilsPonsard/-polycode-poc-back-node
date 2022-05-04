import { ApiProperty } from '@nestjs/swagger';

export class Output {
  @ApiProperty()
  stdout: string;

  @ApiProperty()
  stderr: string;
}
