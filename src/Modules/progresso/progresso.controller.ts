import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProgressoService } from './progresso.service';
import { CreateProgressoDto } from './dto/create-progresso.dto';
import { UpdateProgressoDto } from './dto/update-progresso.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Progresso')
@Controller('progresso')
export class ProgressoController {
  constructor(private readonly progressoService: ProgressoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo registro de progresso' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiBody({
    description: 'Payload para criação de progresso',
    examples: {
      minimo: {
        summary: 'Exemplo mínimo',
        value: {
          usuarioId: 1,
          dataRegistro: '2025-08-30T12:00:00Z'
        }
      },
      completo: {
        summary: 'Exemplo completo',
        value: {
          usuarioId: 1,
            peso: 80.2,
            altura: 1.78,
            percentualGordura: 15.4,
            massaMuscular: 36.8,
            dataRegistro: '2025-08-30T12:00:00Z',
            observacoes: 'Boa evolução'
        }
      }
    }
  })
  create(@Body() createProgressoDto: CreateProgressoDto) {
    return this.progressoService.create(createProgressoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os registros de progresso (ordenados por data)' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findAll() {
    return this.progressoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar progresso por ID' })
  @ApiParam({ name: 'id', description: 'ID do registro de progresso' })
  @ApiResponse({ status: 200, description: 'Registro encontrado' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado' })
  findOne(@Param('id') id: string) {
    return this.progressoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar registro de progresso' })
  @ApiParam({ name: 'id', description: 'ID do registro de progresso' })
  @ApiResponse({ status: 200, description: 'Registro atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado' })
  @ApiBody({
    description: 'Campos que podem ser atualizados',
    examples: {
      pesoAltura: { summary: 'Atualizar peso e altura', value: { peso: 79.4, altura: 1.78 } },
      gorduraMassa: { summary: 'Atualizar composição corporal', value: { percentualGordura: 14.9, massaMuscular: 37.2 } },
      observacoes: { summary: 'Atualizar observações', value: { observacoes: 'Reduziu % gordura' } }
    }
  })
  update(@Param('id') id: string, @Body() updateProgressoDto: UpdateProgressoDto) {
    return this.progressoService.update(+id, updateProgressoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover registro de progresso' })
  @ApiParam({ name: 'id', description: 'ID do registro de progresso' })
  @ApiResponse({ status: 200, description: 'Registro removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado' })
  remove(@Param('id') id: string) {
    return this.progressoService.remove(+id);
  }
}
