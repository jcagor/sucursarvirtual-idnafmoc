import { Test, TestingModule } from '@nestjs/testing';
import { CreaApiClientService } from './crea-api-client.service';

describe('CreaApiClientService', () => {
  let service: CreaApiClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreaApiClientService],
    }).compile();

    service = module.get<CreaApiClientService>(CreaApiClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
