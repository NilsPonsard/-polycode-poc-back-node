import { ApiProperty } from '@nestjs/swagger';
import { AvailableLanguages } from './languages/generic';

export class Output {
  @ApiProperty()
  stdout: string;

  @ApiProperty()
  stderr: string;
}

export interface IRunner {
  run(language: string, code: string): Promise<Output>;
  getAvailableLanguages(): Promise<AvailableLanguages>;
}
