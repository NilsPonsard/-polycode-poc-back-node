import { ApiProperty } from '@nestjs/swagger';

export class Output {
  @ApiProperty()
  stdout: string;

  @ApiProperty()
  stderr: string;
}

export class AvailableLanguages {
  @ApiProperty()
  languages: string[];
}
