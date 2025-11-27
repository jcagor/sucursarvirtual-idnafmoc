import { Test, TestingModule } from '@nestjs/testing';
import { FormUtilsService } from './form-utils.service';

describe('FormUtilsService', () => {
  let service: FormUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormUtilsService],
    }).compile();

    service = module.get<FormUtilsService>(FormUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
