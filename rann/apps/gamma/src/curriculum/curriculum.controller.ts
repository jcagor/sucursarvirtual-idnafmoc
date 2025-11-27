import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { CreateResumeDto } from './dto/create-resume.dto';
import { fomentoUserInfoQuery } from './dto/fomento-query.dto';

@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Post()
  create(@Req() request, @Body() createCurriculumDto: CreateCurriculumDto) {
    const token = request.headers.authorization;
    return this.curriculumService.create(token, createCurriculumDto);
  }

  @Get()
  async findJwt(@Req() request) {
    const token = request.headers.authorization;
    return await this.curriculumService.findJwt(token);
  }

  @Post('generate')
  async createDocument(
    @Req() request,
    @Res() res,
    @Body() createResumeDto: CreateResumeDto,
  ) {
    const token = request.headers.authorization;
    const buffer = await this.curriculumService.generarPDF(
      token,
      createResumeDto,
    );

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=curriculum.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  @Get('status')
  async getResumeStatusService(@Req() request) {
    const token = request.headers.authorization;
    return await this.curriculumService.getResumeStatus(token);
  }

  /**
   * End point to query the curriculum completion status and data from Tione in FOMENTO.
   */
  @Post('/validate/complete')
  async validateCurriculumInformation(
    @Body() query: fomentoUserInfoQuery,
    @Req() request,
  ) {
    const token = request.headers.authorization;
    return await this.curriculumService.validateCurriculumInformation(
      query,
      token,
    );
  }
}
