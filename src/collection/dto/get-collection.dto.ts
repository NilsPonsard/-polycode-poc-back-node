import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { toNumber } from '../../utils/toNumber';

export class GetCollectionQuery {
  @Transform(({ value }) => toNumber(value, { default: 0, min: 0 }))
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  offset: number;

  @Transform(({ value }) => toNumber(value, { default: 30, min: 1, max: 100 }))
  @IsNumber()
  @ApiProperty()
  limit = 30;
}
