import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn, IsNumber } from 'class-validator';
import { BaseDataDto } from './base-data.dto';

enum OrderBy {
  DESC = 'DESC',
  ASC = 'ASC',
}

export abstract class BaseSearchDataDto extends BaseDataDto {
  // @ApiPropertyOptional()
  // @IsOptional()
  // @IsNumber()
  //   id?: number;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @IsNumber()
  size?: number;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  query?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'The sort order',
    enum: OrderBy,
  })
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  orderBy?: 'ASC' | 'DESC';
}
