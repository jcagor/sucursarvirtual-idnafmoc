import { Test, TestingModule } from '@nestjs/testing';
import { UserSiseService } from './user-sise.service';

describe('UserSiseService', () => {
  let service: UserSiseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSiseService],
    }).compile();

    service = module.get<UserSiseService>(UserSiseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
