import { Test, TestingModule } from '@nestjs/testing';
import { FormUtilsController } from './form-utils.controller';
import { FormUtilsService } from './form-utils.service';

describe('FormUtilsController', () => {
  let controller: FormUtilsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormUtilsController],
      providers: [FormUtilsService],
    }).compile();

    controller = module.get<FormUtilsController>(FormUtilsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
