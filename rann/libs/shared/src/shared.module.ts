import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configurations from 'config/configurations';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { CustomExceptionFilter } from './exceptions/custom.exceptions.filter';
import { KeycloakAuthGuard } from './modules/auth/guards/keycloak.guard';
import { EmailService } from './email/email.service';

@Module({
  providers: [
    { provide: APP_FILTER, useClass: CustomExceptionFilter },
    { provide: APP_GUARD, useClass: KeycloakAuthGuard },
    EmailService,
  ],
  exports: [AuthModule, ConfigModule],
  imports: [AuthModule,
    ConfigModule.forRoot({
      load: [configurations],
    }),]
})
export class SharedModule {}
