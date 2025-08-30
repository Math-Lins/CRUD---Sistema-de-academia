import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { hashSync } from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario)
    private readonly usuarioModel: typeof Usuario,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const senhaHash = hashSync(createUsuarioDto.senha, 10);
    const emailNormalizado = createUsuarioDto.email.trim().toLowerCase();

    const dadosUsuario: any = {
      nome: createUsuarioDto.nome,
      email: emailNormalizado,
      senha: senhaHash,
      telefone: createUsuarioDto.telefone,
      tipo: createUsuarioDto.tipo || 'aluno',
      ativo: createUsuarioDto.ativo !== undefined ? createUsuarioDto.ativo : true,
    };

    if (createUsuarioDto.dataNascimento) {
      dadosUsuario.dataNascimento = new Date(createUsuarioDto.dataNascimento);
    }
    
    return await this.usuarioModel.create(dadosUsuario);
  }

  async findAll() {
    return await this.usuarioModel.findAll({
      attributes: { exclude: ['senha'] }, // Não retorna a senha
    });
  }

  async findOne(id: number) {
    return await this.usuarioModel.findOne({
      where: { id },
      attributes: { exclude: ['senha'] },
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const dadosAtualizacao: any = { ...updateUsuarioDto };
    
    if (updateUsuarioDto.senha) {
      dadosAtualizacao.senha = hashSync(updateUsuarioDto.senha, 10);
    }

    if (updateUsuarioDto.dataNascimento) {
      dadosAtualizacao.dataNascimento = new Date(updateUsuarioDto.dataNascimento);
    }

    await this.usuarioModel.update(dadosAtualizacao, {
      where: { id },
    });

    return await this.findOne(id);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    await this.usuarioModel.destroy({ where: { id } });
    return usuario;
  }
}
