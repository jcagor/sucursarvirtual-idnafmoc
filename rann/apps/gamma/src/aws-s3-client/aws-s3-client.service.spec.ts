import { Test, TestingModule } from '@nestjs/testing';
import { AwsS3ClientService } from './aws-s3-client.service';

describe('AwsS3ClientService', () => {
  let service: AwsS3ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsS3ClientService],
    }).compile();

    service = module.get<AwsS3ClientService>(AwsS3ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
