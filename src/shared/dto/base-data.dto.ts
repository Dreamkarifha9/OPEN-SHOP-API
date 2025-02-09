import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsString, IsDate } from 'class-validator';
import { TransformBoolean } from '../decorators/transform-boolean.decorator';

export abstract class BaseDataDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @TransformBoolean()
  active?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  @TransformBoolean()
  deleted?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  created_at?: Date;

  @ApiPropertyOptional({ default: 'null' })
  @IsOptional()
  @IsString()
  created_by?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  updated_at?: Date;

  @ApiPropertyOptional({ default: 'null' })
  @IsOptional()
  @IsString()
  updated_by?: string;
}
