import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { jwtDecode } from 'jwt-decode';
import { KeycloakResponse } from '../types/KeycloakResponse';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Default number of years to find back.
  public NUMBER_YEARS_BACK:number = 3;

  @Get()
  findAll(@Res() res) {
    const courses =  this.coursesService.findAll();
    res.setHeader('Content-Type', 'application/json');
    const response  = JSON.stringify(courses, (_, v) => typeof v === 'bigint' ? v.toString() : v)
    res.end(response);
  }

  @Get('history/:id')
  async findHistory(@Req() request, @Res() res, @Param('id') id: string) {
    const token = request.headers.authorization;    
    const courses_history = await this.coursesService.getCurseHistory(this.NUMBER_YEARS_BACK, +id);
    
    res.setHeader('Content-Type', 'application/json');
    const response  = JSON.stringify(courses_history, (_, v) => typeof v === 'bigint' ? v.toString() : v)
    res.end(response);
  }

  @Get('available/:id')
  async coursesAvailable(@Req() request, @Res() res, @Param('id') id: string) {
    const token = request.headers.authorization;    
    const courses_available = await this.coursesService.findAvailableForUser(this.NUMBER_YEARS_BACK, +id);

    res.setHeader('Content-Type', 'application/json');
    const response  = JSON.stringify(courses_available, (_, v) => typeof v === 'bigint' ? v.toString() : v)
    res.end(response);
  }

  @Get('available')
  async coursesAvailableJwt(@Req() request, @Res() res, @Param('id') id: string) {
    const token = request.headers.authorization;    
    const { identification_type, identification_number }: KeycloakResponse = jwtDecode(token);
    const courses_available = await this.coursesService.findAvailableForUser(this.NUMBER_YEARS_BACK, +identification_number);

    res.setHeader('Content-Type', 'application/json');
    const response  = JSON.stringify(courses_available, (_, v) => typeof v === 'bigint' ? v.toString() : v)
    res.end(response);
  }
}
