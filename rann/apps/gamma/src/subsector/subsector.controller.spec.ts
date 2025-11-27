import { Test, TestingModule } from '@nestjs/testing';
import { SubsectorController } from './subsector.controller';
import { SubsectorService } from './subsector.service';

describe('SubsectorController', () => {
  let controller: SubsectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubsectorController],
      providers: [SubsectorService],
    }).compile();

    controller = module.get<SubsectorController>(SubsectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
