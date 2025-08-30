import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class AuthDto {
    @ApiProperty({ description: 'Email do usuário' })
    @IsNotEmpty()
    @IsEmail()
    @Transform(({ value }) => typeof value === 'string' ? value.trim().toLowerCase() : value)
    email: string;

    @ApiProperty({ description: 'Senha do usuário (mínimo 6 caracteres)' })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    senha: string;
}

