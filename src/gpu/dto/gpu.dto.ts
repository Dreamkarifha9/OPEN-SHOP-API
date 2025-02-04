import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { BaseDataDto } from 'src/shared/dto';

export class gpuDto extends BaseDataDto {
    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    id: number;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    manufacturer: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    model: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    series: string;

    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    release_year: number;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    architecture: string;

    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    memory_size: number;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    memory_type: string;

    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    core_clock: number;

    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    boost_clock: number;

    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    cuda_cores: number;
}
