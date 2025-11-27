import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PsychologistTestService } from './psychologist-test.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { SingleAnswerDto } from './dto/SingleAnswerDto';
import {
  FormUploadGroupFileDto,
  QueryEnableExamRetakeDto,
  QueryUpdateUserExamDto,
} from './dto/anthe.types';

@Controller('psychologist-test')
export class PsychologistTestController {
  constructor(
    private readonly psychologistTestService: PsychologistTestService,
  ) {}

  // >> PERSONS
  // local
  @Get('/exam')
  getExam(@Headers('authorization') token: string) {
    return this.psychologistTestService.getExam(token);
  }

  @Post('single-answer')
  saveSingleAnswer(@Body() answer: SingleAnswerDto) {
    return this.psychologistTestService.saveSingleAnswer(answer);
  }

  @Post('close-exam/:id')
  closeExam(@Param('id') id: string, @Headers('authorization') token: string) {
    return this.psychologistTestService.closeExam(id, token);
  }

  @Get('results')
  getResults(@Headers('authorization') token: string) {
    return this.psychologistTestService.getResults(token);
  }

  // Anthe
  @Get('/group/:groupId/persons')
  getGroupPersonsListEndPoint(
    @Param('groupId') groupId: string,
    @Headers('authorization') token: string,
  ) {
    return this.psychologistTestService.getGroupPersonsList(groupId, token);
  }

  @Put('/person/change-exam')
  async editPsyTestAssignation(
    @Req() request,
    @Body() query: QueryUpdateUserExamDto,
  ) {
    const token = request.headers.authorization;
    return await this.psychologistTestService.editPsyTestAssignation(
      token,
      query,
    );
  }

  @Post('/person/retake-exam')
  async enablePsyTestRetake(
    @Req() request,
    @Body() query: QueryEnableExamRetakeDto,
  ) {
    const token = request.headers.authorization;
    return await this.psychologistTestService.enablePsyTestRetake(token, query);
  }

  // >> GROUPS
  // local

  // Anthe
  @Post('group/register-file')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async uploadExcel(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: FormUploadGroupFileDto,
  ) {
    return this.psychologistTestService.processGroupFile(
      file,
      file.buffer,
      body,
    );
  }

  @Get('group/list')
  getGroupsListEndPoint(@Headers('authorization') token: string) {
    return this.psychologistTestService.getGroupsList(token);
  }

  // >> EXAM
  // local
  @Get('exam/pending-list')
  getPendingExamList(@Headers('authorization') token: string) {
    return this.psychologistTestService.getPendingExamList(token);
  }

  // Anthe
}
