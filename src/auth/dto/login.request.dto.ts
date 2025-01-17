import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class LoginRequest {
    @IsNotEmpty()
    // username or email
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    identifier: string;

    @IsNotEmpty()
    @MinLength(8)
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    password: string;
}