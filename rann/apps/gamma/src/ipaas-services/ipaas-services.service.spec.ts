import { Test, TestingModule } from '@nestjs/testing';
import { IpaasServicesService } from './ipaas-services.service';

describe('IpaasServicesService', () => {
  let service: IpaasServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpaasServicesService],
    }).compile();

    service = module.get<IpaasServicesService>(IpaasServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
