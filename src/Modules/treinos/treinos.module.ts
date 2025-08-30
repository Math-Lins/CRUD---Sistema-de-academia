import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TreinosService } from './treinos.service';
import { TreinosController } from './treinos.controller';
import { Treino } from './entities/treino.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Treino]), 
  ],
  controllers: [TreinosController],
  providers: [TreinosService],
  exports: [TreinosService],
})
export class TreinosModule {}
