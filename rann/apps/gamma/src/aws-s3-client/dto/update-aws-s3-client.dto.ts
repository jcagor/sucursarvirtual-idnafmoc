import { PartialType } from '@nestjs/swagger';
import { CreateAwsS3ClientDto } from './create-aws-s3-client.dto';

export class UpdateAwsS3ClientDto extends PartialType(CreateAwsS3ClientDto) {}
