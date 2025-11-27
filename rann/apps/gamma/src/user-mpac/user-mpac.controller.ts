import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserMpacService } from './user-mpac.service';
import { CreateUserMpacDto, SaveMpacStatusHistoryDto } from './dto/create-user-mpac.dto';
import { UpdateUserMpacDto } from './dto/update-user-mpac.dto';
import { SearchRegisterUserDto } from './dto/search-user-document.dto';
import { Public } from '@app/shared/interceptors/public.interceptor';
import { ApiKeyGuard } from '@app/shared/modules/auth/guards/api-key.guard';

@Controller('user-mpac')
export class UserMpacController {
  constructor(private readonly userMpacService: UserMpacService) {}

  @Post('validation-history')
  create(@Req() request, @Body() createUserMpacDto: SaveMpacStatusHistoryDto) {
    const token = request.headers.authorization;
    return this.userMpacService.create(token, createUserMpacDto);
  }

  @Public()
  @UseGuards(ApiKeyGuard)
  @Post('query-information')
  queryInformationByDocuments(@Body() searchRegisterDateUnemployedDto: SearchRegisterUserDto){
    return this.userMpacService.findUserInformationByDocuments(searchRegisterDateUnemployedDto);
  }
}
