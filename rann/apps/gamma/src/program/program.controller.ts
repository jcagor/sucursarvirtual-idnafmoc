import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { CreateProgramScheduleDto } from './dto/create-program-schedule.dto';
import { UpdateProgramScheduleDto } from './dto/update-program-schedule.dto';
import { CreateProgramSessionDto } from './dto/create-program-session.dto';
import { BusinessInscriptionDto, UpdateProgramSessionDto } from './dto/update-program-session.dto';
import { Public } from '@app/shared/interceptors/public.interceptor';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post('/program-schedule')
  createSchedule(@Body() createProgramScheduleDto: CreateProgramScheduleDto) {
    return this.programService.createSchedule(createProgramScheduleDto);
  }

  @Get('/program-schedule/:id')
  findSchedule(@Param('id') id: string) {
    return this.programService.findSchedule(id);
  }

  @Get('/program-schedule/by-program/:id')
  findScheduleByProgram(@Param('id') id: string) {
    return this.programService.findScheduleByProgram(id);
  }

  @Patch('/program-schedule/:id')
  updateSchedule(
    @Param('id') id: string,
    @Body() updateProgramScheduleDto: UpdateProgramScheduleDto,
  ) {
    return this.programService.updateSchedule(id, updateProgramScheduleDto);
  }

  @Post('/program-session')
  createSession(@Body() createProgramSessionDto: CreateProgramSessionDto) {
    return this.programService.createSession(createProgramSessionDto);
  }

  @Get('/program-session/:id')
  findSession(@Param('id') id: string) {
    return this.programService.findSession(id);
  }

  @Get('/program-session/by-schedule/:id')
  findSessionBySchedule(@Param('id') id: string) {
    return this.programService.findSessionBySchedule(id);
  }

  @Patch('/program-session/:id')
  updateSession(
    @Param('id') id: string,
    @Body() updateProgramSessionDto: UpdateProgramSessionDto,
  ) {
    return this.programService.updateSession(id, updateProgramSessionDto);
  }
  
  @Get()
  findAll() {
    return this.programService.findAll();
  }

  // read programs and current business inscribed in utopia
  @Get("/for-business")
  findAllBusiness(@Headers('authorization') token: string,) {
    return this.programService.findAllBusiness(token);
  }

  // programs inscription in utopia
  @Post("/business/inscription")
  programInscription(@Headers('authorization') token: string, @Body() data: BusinessInscriptionDto) {
    return this.programService.businessInscription(token, data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programService.findOne(id);
  }
}
