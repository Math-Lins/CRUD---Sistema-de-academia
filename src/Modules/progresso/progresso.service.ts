import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProgressoDto } from './dto/create-progresso.dto';
import { UpdateProgressoDto } from './dto/update-progresso.dto';
import { Progresso } from './entities/progresso.entity';

@Injectable()
export class ProgressoService {
  constructor(
    @InjectModel(Progresso)
    private readonly progressoModel: typeof Progresso,
  ) {}

  private calcularImc(peso?: number, altura?: number): number | undefined {
    if (!peso || !altura) return undefined;
    if (altura <= 0) return undefined;
    const imc = peso / (altura * altura);
    return Number(imc.toFixed(2));
  }

  async create(dto: CreateProgressoDto) {
    const data: any = { ...dto };
    // Converter dataRegistro para Date
    data.dataRegistro = new Date(dto.dataRegistro);
    if (!data.dataRegistro || isNaN(data.dataRegistro.getTime())) {
      data.dataRegistro = new Date();
    }
    // Calcular IMC se aplicável
    if (data.peso && data.altura) {
      data.imc = this.calcularImc(data.peso, data.altura);
    }
    return await this.progressoModel.create(data);
  }

  async findAll() {
    return await this.progressoModel.findAll({ order: [['dataRegistro', 'DESC']] });
  }

  async findOne(id: number) {
    const prog = await this.progressoModel.findByPk(id);
    if (!prog) throw new NotFoundException('Registro de progresso não encontrado');
    return prog;
  }

  async update(id: number, dto: UpdateProgressoDto) {
    const prog = await this.findOne(id);
    const data: any = { ...dto };
    if (data.dataRegistro) {
      const dt = new Date(data.dataRegistro as any);
      if (!isNaN(dt.getTime())) data.dataRegistro = dt; else delete data.dataRegistro;
    }
    if (data.peso || data.altura) {
      const peso = data.peso !== undefined ? data.peso : prog.peso;
      const altura = data.altura !== undefined ? data.altura : prog.altura;
      data.imc = this.calcularImc(peso, altura);
    }
    await prog.update(data);
    return prog;
  }

  async remove(id: number) {
    const prog = await this.findOne(id);
    await prog.destroy();
    return prog;
  }
}
