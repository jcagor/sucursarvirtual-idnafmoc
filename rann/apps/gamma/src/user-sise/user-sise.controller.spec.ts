import { Test, TestingModule } from '@nestjs/testing';
import { UserSiseController } from './user-sise.controller';
import { UserSiseService } from './user-sise.service';

describe('UserSiseController', () => {
  let controller: UserSiseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSiseController],
      providers: [UserSiseService],
    }).compile();

    controller = module.get<UserSiseController>(UserSiseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
