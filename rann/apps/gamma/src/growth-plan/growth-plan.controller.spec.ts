import { Test, TestingModule } from '@nestjs/testing';
import { GrowthPlanController } from './growth-plan.controller';
import { GrowthPlanService } from './growth-plan.service';

describe('GrowthPlanController', () => {
  let controller: GrowthPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrowthPlanController],
      providers: [GrowthPlanService],
    }).compile();

    controller = module.get<GrowthPlanController>(GrowthPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
