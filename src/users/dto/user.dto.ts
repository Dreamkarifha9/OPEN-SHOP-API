import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { BaseDataDto } from 'src/shared/dto';

export class UserDto extends BaseDataDto {
    @ApiProperty({ default: null })
    @IsString()
    @Type(() => String)
    id: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    user_name: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    password: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    email: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    first_name: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    last_name: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    salt: string;
}
