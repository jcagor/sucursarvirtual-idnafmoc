import { Test, TestingModule } from '@nestjs/testing';
import { GrowthPlanService } from './growth-plan.service';

describe('GrowthPlanService', () => {
  let service: GrowthPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrowthPlanService],
    }).compile();

    service = module.get<GrowthPlanService>(GrowthPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
