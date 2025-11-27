import { Controller, Get, Param } from '@nestjs/common';
import { SubsectorService } from './subsector.service';

@Controller('subsector')
export class SubsectorController {
  constructor(private readonly subsectorService: SubsectorService) {}

  @Get('by-sector/:name')
  findAllBySector(@Param('name') name: string) {
    return this.subsectorService.findAllBySector(name);
  }
}
