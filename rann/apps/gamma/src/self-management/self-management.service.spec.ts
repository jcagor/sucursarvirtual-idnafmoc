import { Test, TestingModule } from '@nestjs/testing';
import { SelfManagementService } from './self-management.service';

describe('SelfManagementService', () => {
  let service: SelfManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelfManagementService],
    }).compile();

    service = module.get<SelfManagementService>(SelfManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
