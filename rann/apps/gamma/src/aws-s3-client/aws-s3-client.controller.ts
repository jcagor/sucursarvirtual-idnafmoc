import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  StreamableFile,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { AwsS3ClientService } from './aws-s3-client.service';
import { CreateAwsS3ClientDto } from './dto/create-aws-s3-client.dto';
import { UpdateAwsS3ClientDto } from './dto/update-aws-s3-client.dto';
import { Response } from 'express';
import { Public } from '@app/shared/interceptors/public.interceptor';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('aws-s3-client')
export class AwsS3ClientController {
  constructor(private readonly awsS3ClientService: AwsS3ClientService) {}

  //@Public()
  @Get(':key')
  async download(
    @Param('key') key: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const fileStream = await this.awsS3ClientService.downloadFile(key);

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${key}"`,
    });

    return new StreamableFile(fileStream);
  }

  @Post('upload/multi-part')
  @UseInterceptors(FilesInterceptor('files'))
  async handleUpload(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: { title: string; description: string },
  ) {
    const urls = await Promise.all(
      files.map((file) => this.awsS3ClientService.uploadFile(file)),
    );

    return {
      message: 'Upload successful',
      title: body.title,
      description: body.description,
      files: urls,
    };
  }

  @Post('upload/single')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const url = await this.awsS3ClientService.uploadFile(file);
    return { url };
  }
}
