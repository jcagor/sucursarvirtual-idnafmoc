import { Test, TestingModule } from '@nestjs/testing';
import { BusinessValidationService } from './business-validation.service';

describe('BusinessValidationService', () => {
  let service: BusinessValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessValidationService],
    }).compile();

    service = module.get<BusinessValidationService>(BusinessValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
