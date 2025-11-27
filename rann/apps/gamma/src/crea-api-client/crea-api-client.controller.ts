import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreaApiClientService } from './crea-api-client.service';
import { CreateCreaApiClientDto } from './dto/create-crea-api-client.dto';
import { UpdateCreaApiClientDto } from './dto/update-crea-api-client.dto';

@Controller('crea-api-client')
export class CreaApiClientController {
  constructor(private readonly creaApiClientService: CreaApiClientService) {}  
}
