import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateExercicioDto } from './dto/create-exercicio.dto';
import { UpdateExercicioDto } from './dto/update-exercicio.dto';
import { Exercicio } from './entities/exercicio.entity';

@Injectable()
export class ExerciciosService {
  constructor(
    @InjectModel(Exercicio)
    private readonly exercicioModel: typeof Exercicio,
  ) {}

  async create(createExercicioDto: CreateExercicioDto) {
    return await this.exercicioModel.create(createExercicioDto as any);
  }

  async findAll(filters?: { grupoMuscular?: string; dificuldade?: string; ativo?: boolean }) {
    const where: any = {};
    if (filters?.grupoMuscular) where.grupoMuscular = filters.grupoMuscular;
    if (filters?.dificuldade) where.dificuldade = filters.dificuldade;
    if (filters?.ativo !== undefined) where.ativo = filters.ativo;
    return await this.exercicioModel.findAll({ where });
  }

  async findOne(id: number) {
    return await this.exercicioModel.findByPk(id);
  }

  async update(id: number, updateExercicioDto: UpdateExercicioDto) {
    await this.exercicioModel.update(updateExercicioDto as any, {
      where: { id }
    });
    return await this.findOne(id);
  }

  async remove(id: number) {
    const exercicio = await this.findOne(id);
    await this.exercicioModel.destroy({ where: { id } });
    return exercicio;
  }
}
