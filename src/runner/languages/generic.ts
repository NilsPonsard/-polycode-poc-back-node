import { ApiProperty } from '@nestjs/swagger';

export class AvailableLanguages {
  @ApiProperty()
  languages: string[];
}
