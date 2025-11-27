import { Test, TestingModule } from '@nestjs/testing';
import { SubsectorService } from './subsector.service';

describe('SubsectorService', () => {
  let service: SubsectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubsectorService],
    }).compile();

    service = module.get<SubsectorService>(SubsectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
