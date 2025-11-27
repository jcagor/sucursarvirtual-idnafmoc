import { Test, TestingModule } from '@nestjs/testing';
import { CourseSessionController } from './course-session.controller';
import { CourseSessionService } from './course-session.service';

describe('CourseSessionController', () => {
  let controller: CourseSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseSessionController],
      providers: [CourseSessionService],
    }).compile();

    controller = module.get<CourseSessionController>(CourseSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
