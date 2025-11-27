import { Test, TestingModule } from '@nestjs/testing';
import { UserMpacController } from './user-mpac.controller';
import { UserMpacService } from './user-mpac.service';

describe('UserMpacController', () => {
  let controller: UserMpacController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMpacController],
      providers: [UserMpacService],
    }).compile();

    controller = module.get<UserMpacController>(UserMpacController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
