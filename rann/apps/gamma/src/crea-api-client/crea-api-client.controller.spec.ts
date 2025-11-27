import { Test, TestingModule } from '@nestjs/testing';
import { CreaApiClientController } from './crea-api-client.controller';
import { CreaApiClientService } from './crea-api-client.service';

describe('CreaApiClientController', () => {
  let controller: CreaApiClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreaApiClientController],
      providers: [CreaApiClientService],
    }).compile();

    controller = module.get<CreaApiClientController>(CreaApiClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
