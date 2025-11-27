import { Test, TestingModule } from '@nestjs/testing';
import { PsychologistTestController } from './psychologist-test.controller';
import { PsychologistTestService } from './psychologist-test.service';

describe('PsychologistTestController', () => {
  let controller: PsychologistTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PsychologistTestController],
      providers: [PsychologistTestService],
    }).compile();

    controller = module.get<PsychologistTestController>(PsychologistTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
