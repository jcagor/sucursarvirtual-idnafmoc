import { Test, TestingModule } from '@nestjs/testing';
import { CourseCurriculumController } from './course-curriculum.controller';
import { CourseCurriculumService } from './course-curriculum.service';

describe('CourseCurriculumController', () => {
  let controller: CourseCurriculumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseCurriculumController],
      providers: [CourseCurriculumService],
    }).compile();

    controller = module.get<CourseCurriculumController>(CourseCurriculumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
