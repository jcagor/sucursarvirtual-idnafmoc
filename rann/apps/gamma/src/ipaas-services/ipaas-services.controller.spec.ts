import { Test, TestingModule } from '@nestjs/testing';
import { IpaasServicesController } from './ipaas-services.controller';
import { IpaasServicesService } from './ipaas-services.service';

describe('IpaasServicesController', () => {
  let controller: IpaasServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpaasServicesController],
      providers: [IpaasServicesService],
    }).compile();

    controller = module.get<IpaasServicesController>(IpaasServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
