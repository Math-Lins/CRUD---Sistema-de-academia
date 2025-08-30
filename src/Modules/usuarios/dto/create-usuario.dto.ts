import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsDateString, IsEnum, IsBoolean } from 'class-validator';

// Enum formal para permitir uso correto de @IsEnum
export enum TipoUsuarioEnum {
  ALUNO = 'aluno',
  INSTRUTOR = 'instrutor',
  ADMIN = 'admin',
}

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Nome completo do usuário' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Email do usuário' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsNotEmpty()
  @IsString()
  senha: string;

  @ApiProperty({ description: 'Telefone do usuário', required: false })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiProperty({ description: 'Data de nascimento', required: false })
  @IsOptional()
  @IsDateString()
  dataNascimento?: string;

  @ApiProperty({ 
    description: 'Tipo de usuário', 
    enum: Object.values(TipoUsuarioEnum),
    default: TipoUsuarioEnum.ALUNO
  })
  @IsOptional()
  @IsEnum(TipoUsuarioEnum, { message: `tipo deve ser um dos valores: ${Object.values(TipoUsuarioEnum).join(', ')}` })
  tipo?: TipoUsuarioEnum;

  @ApiProperty({ description: 'Status do usuário', default: true })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
