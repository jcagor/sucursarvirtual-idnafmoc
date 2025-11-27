import { Test, TestingModule } from '@nestjs/testing';
import { BusinessValidationController } from './business-validation.controller';
import { BusinessValidationService } from './business-validation.service';

describe('BusinessValidationController', () => {
  let controller: BusinessValidationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessValidationController],
      providers: [BusinessValidationService],
    }).compile();

    controller = module.get<BusinessValidationController>(BusinessValidationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
