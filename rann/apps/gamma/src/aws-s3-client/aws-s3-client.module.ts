import { Module } from '@nestjs/common';
import { AwsS3ClientService } from './aws-s3-client.service';
import { AwsS3ClientController } from './aws-s3-client.controller';

@Module({
  controllers: [AwsS3ClientController],
  providers: [AwsS3ClientService],
})
export class AwsS3ClientModule {}
