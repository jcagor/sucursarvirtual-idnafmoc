import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  VALID_API_KEY =
    process.env.GUARD_API_KEY ??
    '1fb24a6a02b6ad8cec4aa79d005346e9c4d591d4da238fc0fc0d05599';

  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKeyHeader = request.headers['x-api-key'];

    const validApiKey = this.VALID_API_KEY;

    if (!apiKeyHeader || apiKeyHeader !== validApiKey) {
      throw new UnauthorizedException('Invalid or missing API key');
    }

    return true;
  }
}
