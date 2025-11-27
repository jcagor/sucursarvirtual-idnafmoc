import { Test, TestingModule } from '@nestjs/testing';
import { PsychologistTestService } from './psychologist-test.service';

describe('PsychologistTestService', () => {
  let service: PsychologistTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PsychologistTestService],
    }).compile();

    service = module.get<PsychologistTestService>(PsychologistTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
