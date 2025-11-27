import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserSiseService } from './user-sise.service';
import { CreateUserSiseDto } from './dto/create-user-sise.dto';
import { UpdateUserSiseDto } from './dto/update-user-sise.dto';

@Controller('user-sise')
export class UserSiseController {
  constructor(private readonly userSiseService: UserSiseService) {}

  @Post()
  create(@Req() request, @Body() createUserSiseDto: CreateUserSiseDto) {
    const token = request.headers.authorization;
    return this.userSiseService.create(token, createUserSiseDto);
  }
}
