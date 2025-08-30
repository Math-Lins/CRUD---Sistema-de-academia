import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsInt, Min, IsEnum, IsBoolean } from "class-validator";
import { Type } from 'class-transformer';

export enum DiaSemanaEnum {
  SEGUNDA = 'segunda',
  TERCA = 'terca',
  QUARTA = 'quarta',
  QUINTA = 'quinta',
  SEXTA = 'sexta',
  SABADO = 'sabado',
  DOMINGO = 'domingo',
}

export class CreateTreinoDto {
  @ApiProperty({ description: 'Nome do treino' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Descrição do treino', required: false })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({ description: 'ID do usuário dono do treino' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  usuarioId: number;

  @ApiProperty({ description: 'Duração estimada (minutos)', required: false, example: 45 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  duracao?: number;

  @ApiProperty({ description: 'Dia da semana sugerido', enum: Object.values(DiaSemanaEnum), required: false })
  @IsOptional()
  @IsEnum(DiaSemanaEnum, { message: `diaSemana deve ser um dos valores: ${Object.values(DiaSemanaEnum).join(', ')}` })
  diaSemana?: DiaSemanaEnum;

  @ApiProperty({ description: 'Se o treino está ativo', required: false, default: true })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}


