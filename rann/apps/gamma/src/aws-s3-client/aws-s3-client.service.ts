import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { FormCustomFileEntity } from '../appointment/entities/tech-assistance.entity';
import { Readable } from 'stream';

@Injectable()
export class AwsS3ClientService {
  private awsS3KeyId = '';
  private awsS3Secret = '';
  private awsS3region = '';
  private awsS3Bucket = '';
  private awsS3Folder = '';
  private s3 = undefined;

  constructor() {
    this.awsS3KeyId = process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID;
    this.awsS3Secret = process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY;
    this.awsS3region = process.env.NEXT_PUBLIC_AWS_S3_REGION;
    this.awsS3Bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
    this.awsS3Folder = process.env.NEXT_PUBLIC_AWS_S3_FOLDER_NAME;

    if (!this.awsS3KeyId || this.awsS3KeyId == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR AWS S3: NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID',
      );
    }
    if (!this.awsS3Secret || this.awsS3Secret == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR AWS S3: NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY',
      );
    }
    if (!this.awsS3region || this.awsS3region == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR AWS S3: NEXT_PUBLIC_AWS_S3_REGION',
      );
    }
    if (!this.awsS3Bucket || this.awsS3Bucket == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR AWS S3: NEXT_PUBLIC_AWS_S3_BUCKET_NAME',
      );
    }
    if (!this.awsS3Folder || this.awsS3Folder == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR AWS S3: NEXT_PUBLIC_AWS_S3_FOLDER_NAME',
      );
    }

    this.s3 = new S3Client({
      region: this.awsS3region,
      credentials: {
        accessKeyId: this.awsS3KeyId,
        secretAccessKey: this.awsS3Secret,
      },
    });
  }

  // Utils.
  private sanitizeString(input: string): string {
    const clean = input.replace(/[^a-zA-Z0-9/.]/g, '');

    // if the result is empty use the current epoch.
    if (!clean || clean == '') {
      return Math.floor(Date.now()).toString();
    }

    return clean;
  }

  // Service.
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuid()}-${this.sanitizeString(file.originalname)}`;
    const uploadParams = {
      Bucket: this.awsS3Bucket,
      Key: `${this.awsS3Folder}/${fileName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3.send(new PutObjectCommand(uploadParams));
    return `${fileName}`;
  }

  async uploadBase64File(file: FormCustomFileEntity): Promise<string> {
    const fileName = `${uuid()}-${this.sanitizeString(file.name)}`;
    const uploadParams = {
      Bucket: this.awsS3Bucket,
      Key: `${this.awsS3Folder}/${fileName}`,
      Body: Buffer.from(file.data, 'base64'),
      ContentType: file.type,
    };

    await this.s3.send(new PutObjectCommand(uploadParams));
    return `${fileName}`;
  }

  async downloadFile(key: string): Promise<Readable> {
    const command = new GetObjectCommand({
      Bucket: this.awsS3Bucket,
      Key: `${this.awsS3Folder}/${key}`,
    });

    const response = await this.s3.send(command);

    // `Body` is a readable stream (in Node.js)
    if (!response.Body || !(response.Body instanceof Readable)) {
      throw new Error('Invalid S3 response: no body stream');
    }

    return response.Body as Readable;
  }
}
