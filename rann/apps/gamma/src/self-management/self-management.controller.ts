import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SelfManagementService } from './self-management.service';
import { CreateSelfManagementDto } from './dto/create-self-management.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

@Controller('selfManagement')
export class SelfManagementController {
  constructor(private readonly selfManagementService: SelfManagementService) {}

  @Post()
  create(
    @Req() request,
    @Body() createSelfManagementDto: CreateSelfManagementDto,
  ) {
    const token = request.headers.authorization;
    return this.selfManagementService.create(token, createSelfManagementDto);
  }

  @Get('/analysis')
  findAnalysis(@Req() request) {
    const token = request.headers.authorization;
    return this.selfManagementService.findAnalysis(token);
  }

  @Get('/isSelfManagementAvailable')
  isSelfManagementAvailable(@Req() request) {
    const token = request.headers.authorization;
    return this.selfManagementService.isSelfManagementAvailable(token);
  }

  @Get('/report')
  report(@Req() request) {
    const token = request.headers.authorization;
    return this.selfManagementService.report(token);
  }

  @Post('/sendSelfManagementToMail')
  @UseInterceptors(FileInterceptor('file'))
  sendSelfManagementToMail(
    @Req() request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const token = request.headers.authorization;
    return this.selfManagementService.sendSelfManagementToMail(file, token);
  }
}
