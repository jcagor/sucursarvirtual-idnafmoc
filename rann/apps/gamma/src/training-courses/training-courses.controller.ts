import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { TrainingCoursesService } from './training-courses.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('training-courses')
@Controller('training-courses')
export class TrainingCoursesController {
  constructor(private readonly trainingCoursesService: TrainingCoursesService) {}

  @Get('available/:id')
  @ApiOperation({ summary: 'Obtener cursos disponibles para un usuario' })
  @ApiResponse({ status: 200, description: 'Lista de cursos disponibles' })
  async findAvailableForUser(
    @Param('id') id: string,
    @Query('years_back') years_back: number = 2,
    @Req() request
  ) {
    const token = request.headers.authorization;
    return this.trainingCoursesService.findAvailableForUser(years_back, parseInt(id), token);
  }
} 