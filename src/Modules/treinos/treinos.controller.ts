import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TreinosService } from './treinos.service';
import { CreateTreinoDto, DiaSemanaEnum } from './dto/create-treino.dto';
import { UpdateTreinoDto } from './dto/update-treino.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Treinos')
@Controller('treinos')
export class TreinosController {
  constructor(private readonly treinosService: TreinosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo treino' })
  @ApiResponse({ status: 201, description: 'Treino criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiBody({
    description: 'Payload para criação de treino',
    examples: {
      basico: {
        summary: 'Exemplo básico',
        value: {
          nome: 'Treino A',
          usuarioId: 1
        }
      },
      completo: {
        summary: 'Exemplo completo',
        value: {
          nome: 'Treino Hipertrofia Superior',
          descricao: 'Peito, ombro e tríceps',
          usuarioId: 1,
          duracao: 55,
          diaSemana: DiaSemanaEnum.SEGUNDA,
          ativo: true
        }
      }
    }
  })
  create(@Body() createTreinoDto: CreateTreinoDto) {
    return this.treinosService.create(createTreinoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar treinos (opcional filtrar por usuarioId, diaSemana, ativo)' })
  @ApiResponse({ status: 200, description: 'Lista de treinos retornada com sucesso' })
  findAll(
    @Query('usuarioId') usuarioId?: string,
    @Query('diaSemana') diaSemana?: string,
    @Query('ativo') ativo?: string,
  ) {
    const filtros: any = {};
    if (usuarioId) filtros.usuarioId = Number(usuarioId);
    if (diaSemana) filtros.diaSemana = diaSemana;
    if (ativo !== undefined) filtros.ativo = ativo === 'true';
    return this.treinosService.findAll(filtros);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar treino por ID' })
  @ApiParam({ name: 'id', description: 'ID do treino' })
  @ApiResponse({ status: 200, description: 'Treino encontrado' })
  @ApiResponse({ status: 404, description: 'Treino não encontrado' })
  findOne(@Param('id') id: string) {
    return this.treinosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar treino' })
  @ApiParam({ name: 'id', description: 'ID do treino' })
  @ApiResponse({ status: 200, description: 'Treino atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Treino não encontrado' })
  @ApiBody({
    description: 'Campos que podem ser atualizados (parcial)',
    examples: {
      alterarNome: { summary: 'Alterar nome', value: { nome: 'Treino B' } },
      alterarDuracao: { summary: 'Alterar duração', value: { duracao: 60 } },
      alterarDia: { summary: 'Alterar dia da semana', value: { diaSemana: DiaSemanaEnum.QUARTA } },
      inativar: { summary: 'Inativar treino', value: { ativo: false } }
    }
  })
  update(@Param('id') id: string, @Body() updateTreinoDto: UpdateTreinoDto) {
    return this.treinosService.update(+id, updateTreinoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover treino' })
  @ApiParam({ name: 'id', description: 'ID do treino' })
  @ApiResponse({ status: 200, description: 'Treino removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Treino não encontrado' })
  remove(@Param('id') id: string) {
    return this.treinosService.remove(+id);
  }
}
