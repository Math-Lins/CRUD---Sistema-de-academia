import { Test, TestingModule } from '@nestjs/testing';
import { ProgressoService } from './progresso.service';

describe('ProgressoService', () => {
  let service: ProgressoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgressoService],
    }).compile();

    service = module.get<ProgressoService>(ProgressoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
