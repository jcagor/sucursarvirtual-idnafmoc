import { Test, TestingModule } from '@nestjs/testing';
import { UserMpacService } from './user-mpac.service';

describe('UserMpacService', () => {
  let service: UserMpacService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMpacService],
    }).compile();

    service = module.get<UserMpacService>(UserMpacService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
