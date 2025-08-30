import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEnum, IsBoolean, IsUrl } from 'class-validator';

export class CreateExercicioDto {
  @ApiProperty({ description: 'Nome do exercício' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Descrição do exercício', required: false })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({ description: 'Grupo muscular trabalhado' })
  @IsNotEmpty()
  @IsString()
  grupoMuscular: string;

  @ApiProperty({ description: 'Equipamento necessário', required: false })
  @IsOptional()
  @IsString()
  equipamento?: string;

  @ApiProperty({ 
    description: 'Nível de dificuldade', 
    enum: ['iniciante', 'intermediario', 'avancado'],
    default: 'iniciante'
  })
  @IsOptional()
  @IsEnum(['iniciante', 'intermediario', 'avancado'])
  dificuldade?: string;

  @ApiProperty({ description: 'Instruções de execução', required: false })
  @IsOptional()
  @IsString()
  instrucoes?: string;

  @ApiProperty({ description: 'URL do vídeo demonstrativo', required: false })
  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @ApiProperty({ description: 'Status do exercício', default: true })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
