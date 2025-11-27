import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BulkUsersService } from './bulk-users.service';
import { BulkUserRequestDto, ValidationProgressDto, BulkUserResponseDto } from './dto/bulk-user.dto';

@ApiTags('Bulk Users')
@Controller('bulk-users')
export class BulkUsersController {
  constructor(private readonly bulkUsersService: BulkUsersService) {}

  @Post('validate')
  @ApiOperation({ summary: 'Validar usuarios en lote' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuarios validados correctamente',
    type: ValidationProgressDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error en la validación de los datos'
  })
  async validateUsers(@Body() request: BulkUserRequestDto): Promise<ValidationProgressDto> {
    return this.bulkUsersService.validateUsers(request.users);
  }

  @Post('process')
  @ApiOperation({ summary: 'Procesar usuarios en lote' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuarios procesados correctamente',
    type: BulkUserResponseDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error en el procesamiento de los usuarios'
  })
  async processUsers(@Body() request: BulkUserRequestDto): Promise<BulkUserResponseDto> {
    return this.bulkUsersService.processBulkUsers(request.users);
  }
} 