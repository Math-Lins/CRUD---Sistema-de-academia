import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiBody({
    description: 'Payload para criação de usuário',
    examples: {
      minimo: {
        summary: 'Exemplo mínimo',
        value: {
          nome: 'João Silva',
          email: 'joao@exemplo.com',
          senha: 'Senha123@'
        }
      },
      completo: {
        summary: 'Exemplo completo',
        value: {
          nome: 'Maria Souza',
          email: 'maria@exemplo.com',
          senha: 'Senha123@',
          telefone: '(11) 98888-1234',
          dataNascimento: '1995-04-10',
          tipo: 'instrutor',
          ativo: true
        }
      }
    }
  })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso' })
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiBody({
    description: 'Campos que podem ser atualizados (parcial)',
    examples: {
      alterarNome: {
        summary: 'Alterar nome',
        value: { nome: 'João Pedro' }
      },
      alterarSenhaTelefone: {
        summary: 'Alterar senha e telefone',
        value: { senha: 'NovaSenha456@', telefone: '(11) 97777-2222' }
      },
      alterarTipoStatus: {
        summary: 'Alterar tipo e status',
        value: { tipo: 'admin', ativo: false }
      }
    }
  })
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
