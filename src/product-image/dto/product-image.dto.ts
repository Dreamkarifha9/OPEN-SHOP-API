import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { BaseDataDto } from 'src/shared/dto';

export class productImageDto extends BaseDataDto {
    @ApiProperty({ default: null })
    @IsString()
    @Type(() => String)
    id: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    product_id: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    image_key: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    url: string;



}
