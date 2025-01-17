import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseDataDto } from 'src/shared/dto';

export class CategorieDto extends BaseDataDto {
    @ApiProperty({ default: null })
    @IsString()
    @Type(() => String)
    id: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    name: string;

}
