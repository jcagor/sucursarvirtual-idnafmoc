import { Test, TestingModule } from '@nestjs/testing';
import { SelfManagementController } from './self-management.controller';
import { SelfManagementService } from './self-management.service';

describe('SelfManagementController', () => {
  let controller: SelfManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelfManagementController],
      providers: [SelfManagementService],
    }).compile();

    controller = module.get<SelfManagementController>(SelfManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
