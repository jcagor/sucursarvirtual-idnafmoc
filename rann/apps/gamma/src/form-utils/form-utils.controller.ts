import { Controller, Get, Param, Req } from '@nestjs/common';
import { FormUtilsService } from './form-utils.service';
import { CreateFormUtilDto } from './dto/create-form-util.dto';
import { UpdateFormUtilDto } from './dto/update-form-util.dto';

@Controller('form-utils')
export class FormUtilsController {
  constructor(private readonly formUtilsService: FormUtilsService) {}

  @Get('select/:select')
  async findSelectList(@Req() request, @Param('select') select: string) {
    //console.log('SELECT QUERY:', select);
    const token = request.headers.authorization;
    return await this.formUtilsService.getSelectOptions(select, token);
  }

  @Get('select/:select/:filter')
  async findSelectFilterList(@Req() request, @Param('select') select: string, @Param('filter') filter: string) {    
    const token = request.headers.authorization;
    return await this.formUtilsService.getSelectFilterOptions(select, filter);
  }
}
