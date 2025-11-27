import { Test, TestingModule } from '@nestjs/testing';
import { AwsS3ClientController } from './aws-s3-client.controller';
import { AwsS3ClientService } from './aws-s3-client.service';

describe('AwsS3ClientController', () => {
  let controller: AwsS3ClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwsS3ClientController],
      providers: [AwsS3ClientService],
    }).compile();

    controller = module.get<AwsS3ClientController>(AwsS3ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
