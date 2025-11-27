import { Test, TestingModule } from '@nestjs/testing';
import { GammaController } from './gamma.controller';
import { GammaService } from './gamma.service';

describe('GammaController', () => {
  let gammaController: GammaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GammaController],
      providers: [GammaService],
    }).compile();

    gammaController = app.get<GammaController>(GammaController);
  });
});
