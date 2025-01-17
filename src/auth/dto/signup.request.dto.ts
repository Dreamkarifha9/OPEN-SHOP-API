import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { BaseDataDto } from 'src/shared/dto';

export class SignupRequestDto extends BaseDataDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    email: string;

    @IsNotEmpty()
    // alphanumeric characters and - are valid
    // you can change this as you like
    @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
    @MaxLength(20)
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    user_name: string;

    @IsNotEmpty()
    @MinLength(8)
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    password: string;

    @IsNotEmpty()
    @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
    @MaxLength(20)
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
    @MaxLength(20)
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    last_name: string;

}