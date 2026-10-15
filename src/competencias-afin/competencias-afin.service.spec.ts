import { Test, TestingModule } from '@nestjs/testing';
import { CompetenciasAfinService } from './competencias-afin.service';

describe('CompetenciasAfinService', () => {
  let service: CompetenciasAfinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetenciasAfinService],
    }).compile();

    service = module.get<CompetenciasAfinService>(CompetenciasAfinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
