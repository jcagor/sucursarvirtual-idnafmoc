import { IS_PUBLIC_KEY } from '@app/shared/interceptors/public.interceptor';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
 
@Injectable()
export class KeycloakAuthGuard extends AuthGuard('keycloak') {
  constructor(private reflector: Reflector) {
    super();
  }
 
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
      
    }
    return super.canActivate(context);
    
  }
}