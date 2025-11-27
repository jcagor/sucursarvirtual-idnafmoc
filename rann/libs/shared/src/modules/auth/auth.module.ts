import { Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { KeycloakStrategy } from './strategies/keycloak.strategy';
 
@Module({
  providers: [KeycloakStrategy, ConfigService],
})
export class AuthModule {}