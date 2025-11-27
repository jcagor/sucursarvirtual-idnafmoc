import { Test, TestingModule } from '@nestjs/testing';
import { CourseSessionService } from './course-session.service';

describe('CourseSessionService', () => {
  let service: CourseSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseSessionService],
    }).compile();

    service = module.get<CourseSessionService>(CourseSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
