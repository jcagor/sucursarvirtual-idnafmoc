import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Get('isUserRegistered')
  isUserRegistered(@Req() request) {
    const token = request.headers.authorization;
    return this.userInfoService.isUserRegistered(token);
  }

  @Get()
  findInformation(@Req() request) {
    const token = request.headers.authorization;
    return this.userInfoService.getInfo(token);
  }
}
