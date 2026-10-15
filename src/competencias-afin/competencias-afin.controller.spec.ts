import { Test, TestingModule } from '@nestjs/testing';
import { CompetenciasAfinController } from './competencias-afin.controller';
import { CompetenciasAfinService } from './competencias-afin.service';

describe('CompetenciasAfinController', () => {
  let controller: CompetenciasAfinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetenciasAfinController],
      providers: [CompetenciasAfinService],
    }).compile();

    controller = module.get<CompetenciasAfinController>(CompetenciasAfinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
