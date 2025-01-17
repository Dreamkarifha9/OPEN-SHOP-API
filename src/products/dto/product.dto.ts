import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { BaseDataDto } from 'src/shared/dto';

export class productDto extends BaseDataDto {
    @ApiProperty({ default: null })
    @IsString()
    @Type(() => String)
    id: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    name: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    description: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    sn: string;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    price: number;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    price_sale: number;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    category_id: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    user_id: string;

}
