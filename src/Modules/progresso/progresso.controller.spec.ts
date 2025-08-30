import { Test, TestingModule } from '@nestjs/testing';
import { ProgressoController } from './progresso.controller';
import { ProgressoService } from './progresso.service';

describe('ProgressoController', () => {
  let controller: ProgressoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressoController],
      providers: [ProgressoService],
    }).compile();

    controller = module.get<ProgressoController>(ProgressoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
