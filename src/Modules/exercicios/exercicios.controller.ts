import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ExerciciosService } from './exercicios.service';
import { CreateExercicioDto } from './dto/create-exercicio.dto';
import { UpdateExercicioDto } from './dto/update-exercicio.dto';

@ApiTags('Exercícios')
@Controller('exercicios')
export class ExerciciosController {
  constructor(private readonly exerciciosService: ExerciciosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo exercício' })
  @ApiResponse({ status: 201, description: 'Exercício criado com sucesso' })
  @ApiBody({
    description: 'Payload para criação de exercício',
    examples: {
      minimo: {
        summary: 'Exemplo mínimo',
        value: {
          nome: 'Supino Reto',
          grupoMuscular: 'Peito'
        }
      },
      completo: {
        summary: 'Exemplo completo',
        value: {
          nome: 'Remada Curvada',
          descricao: 'Exercício para dorsais com barra',
          grupoMuscular: 'Costas',
          equipamento: 'Barra',
          dificuldade: 'intermediario',
          instrucoes: 'Mantenha a coluna neutra e puxe a barra até o abdômen',
          videoUrl: 'https://exemplo.com/videos/remada.mp4',
          ativo: true
        }
      }
    }
  })
  create(@Body() createExercicioDto: CreateExercicioDto) {
    return this.exerciciosService.create(createExercicioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar exercícios (filtros opcionais: grupoMuscular, dificuldade, ativo)' })
  @ApiResponse({ status: 200, description: 'Lista de exercícios' })
  findAll(
    @Query('grupoMuscular') grupoMuscular?: string,
    @Query('dificuldade') dificuldade?: string,
    @Query('ativo') ativo?: string,
  ) {
    const filtros: any = {};
    if (grupoMuscular) filtros.grupoMuscular = grupoMuscular;
    if (dificuldade) filtros.dificuldade = dificuldade;
    if (ativo !== undefined) filtros.ativo = ativo === 'true';
    return this.exerciciosService.findAll(filtros);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar exercício por ID' })
  @ApiParam({ name: 'id', description: 'ID do exercício' })
  @ApiResponse({ status: 200, description: 'Exercício encontrado' })
  findOne(@Param('id') id: string) {
    return this.exerciciosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar exercício' })
  @ApiParam({ name: 'id', description: 'ID do exercício' })
  @ApiResponse({ status: 200, description: 'Exercício atualizado' })
  @ApiBody({
    description: 'Campos que podem ser atualizados (parcial)',
    examples: {
      alterarNome: { summary: 'Alterar nome', value: { nome: 'Supino Inclinado' } },
      alterarDificuldade: { summary: 'Alterar dificuldade', value: { dificuldade: 'avancado' } },
      inativar: { summary: 'Inativar exercício', value: { ativo: false } }
    }
  })
  update(@Param('id') id: string, @Body() updateExercicioDto: UpdateExercicioDto) {
    return this.exerciciosService.update(+id, updateExercicioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover exercício' })
  @ApiParam({ name: 'id', description: 'ID do exercício' })
  @ApiResponse({ status: 200, description: 'Exercício removido com sucesso' })
  remove(@Param('id') id: string) {
    return this.exerciciosService.remove(+id);
  }
}
