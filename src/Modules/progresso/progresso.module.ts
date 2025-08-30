import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProgressoService } from './progresso.service';
import { ProgressoController } from './progresso.controller';
import { Progresso } from './entities/progresso.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Progresso]), 
  ],
  controllers: [ProgressoController],
  providers: [ProgressoService],
  exports: [ProgressoService],
})
export class ProgressoModule {}
