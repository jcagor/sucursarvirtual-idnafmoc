import {
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  Logger,
  Req,
} from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { Public } from '@app/shared/interceptors/public.interceptor';

@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  @Public()
  async manualCheck(@Req() req: Request) {
    const clientIp = "ip" in req ? req.ip as string : "undefined";

    // Allow a specific IP
    const allowedIps = ['127.0.0.1', '::1', '::ffff:127.0.0.1']; // IPv4 and IPv6 format
    if (!allowedIps.includes(clientIp)) {
      Logger.debug(`Health check invalid access IP: ${clientIp}`)
      throw new ForbiddenException('Access denied');
    }

    //const query = await this.healthCheckService.findAllCities();
    const views = await this.healthCheckService.checkPostgres();
    
    if (views && "length" in views) {
      Logger.debug('health-check module OK, read views:', views.length);
      return true;
    } else {
      throw new InternalServerErrorException('health check failed');
    }
  }
}
