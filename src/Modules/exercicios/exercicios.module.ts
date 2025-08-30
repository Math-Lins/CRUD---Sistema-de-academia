import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExerciciosService } from './exercicios.service';
import { ExerciciosController } from './exercicios.controller';
import { Exercicio } from './entities/exercicio.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Exercicio]), 
  ],
  controllers: [ExerciciosController],
  providers: [ExerciciosService],
  exports: [ExerciciosService],
})
export class ExerciciosModule {}
