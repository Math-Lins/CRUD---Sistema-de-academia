import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, Min, IsOptional, IsNumber, IsDateString, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProgressoDto {
	@ApiProperty({ description: 'ID do usuário', example: 1 })
	@IsNotEmpty()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	usuarioId: number;

	@ApiProperty({ description: 'Peso (kg)', required: false, example: 78.5 })
	@IsOptional()
	@Type(() => Number)
	@IsNumber({ maxDecimalPlaces: 2 })
	peso?: number;

	@ApiProperty({ description: 'Altura (m)', required: false, example: 1.75 })
	@IsOptional()
	@Type(() => Number)
	@IsNumber({ maxDecimalPlaces: 2 })
	altura?: number;

	@ApiProperty({ description: 'IMC', required: false, example: 25.63 })
	@IsOptional()
	@Type(() => Number)
	@IsNumber({ maxDecimalPlaces: 2 })
	imc?: number;

	@ApiProperty({ description: 'Percentual de gordura (%)', required: false, example: 14.2 })
	@IsOptional()
	@Type(() => Number)
	@IsNumber({ maxDecimalPlaces: 2 })
	percentualGordura?: number;

	@ApiProperty({ description: 'Massa muscular (kg)', required: false, example: 36.8 })
	@IsOptional()
	@Type(() => Number)
	@IsNumber({ maxDecimalPlaces: 2 })
	massaMuscular?: number;

	@ApiProperty({ description: 'Data do registro', example: '2025-08-29T12:00:00Z' })
	@IsNotEmpty()
	@IsDateString()
	dataRegistro: string;

	@ApiProperty({ description: 'Observações gerais', required: false })
	@IsOptional()
	@IsString()
	observacoes?: string;
}
