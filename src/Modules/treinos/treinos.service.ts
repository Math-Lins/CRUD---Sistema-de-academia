import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTreinoDto } from './dto/create-treino.dto';
import { UpdateTreinoDto } from './dto/update-treino.dto';
import { Treino } from './entities/treino.entity';

@Injectable()
export class TreinosService {
  constructor(
    @InjectModel(Treino)
    private readonly treinoModel: typeof Treino,
  ) {}

  async create(dto: CreateTreinoDto) {
    const data: any = { ...dto };
    if (data.ativo === undefined) data.ativo = true;
    return await this.treinoModel.create(data);
  }

  async findAll(filters?: { usuarioId?: number; diaSemana?: string; ativo?: boolean }) {
    const where: any = {};
    if (filters?.usuarioId) where.usuarioId = filters.usuarioId;
    if (filters?.diaSemana) where.diaSemana = filters.diaSemana;
    if (filters?.ativo !== undefined) where.ativo = filters.ativo;
    return await this.treinoModel.findAll({ where });
  }

  async findOne(id: number) {
    const treino = await this.treinoModel.findByPk(id);
    if (!treino) throw new NotFoundException('Treino não encontrado');
    return treino;
  }

  async update(id: number, dto: UpdateTreinoDto) {
    const treino = await this.findOne(id);
    await treino.update(dto);
    return treino;
  }

  async remove(id: number) {
    const treino = await this.findOne(id);
    await treino.destroy();
    return treino;
  }
}
