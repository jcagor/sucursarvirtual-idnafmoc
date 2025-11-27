import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PostulationService } from './postulation.service';
import { CreatePostulationDto } from './dto/create-postulation.dto';
import { UpdatePostulationDto } from './dto/update-postulation.dto';

@Controller('postulation')
export class PostulationController {
  constructor(private readonly postulationService: PostulationService) {}

  @Post()
  create(@Req() request, @Body() createPostulationDto: CreatePostulationDto) {
    const token = request.headers.authorization;
    return this.postulationService.create(createPostulationDto, token);
  }

  @Get("list")
  findAll(@Req() request,) {
    const token = request.headers.authorization;
    return this.postulationService.findAll(token);
  }
}
