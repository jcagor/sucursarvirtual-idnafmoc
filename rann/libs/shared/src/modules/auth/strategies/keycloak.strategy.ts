import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import * as passport from 'passport';
  import * as KeycloakPassportStrategy from 'passport-keycloak-bearer';
  import { ConfigService } from '@nestjs/config';
import { StrategyKeycloakDto } from '../dto/strategy-keycloak.dto';

  
  @Injectable()
  export class KeycloakStrategy {
    constructor(private readonly config: ConfigService) {
      this.setup();
    }
  
    private setup() {
      passport.use(
        'keycloak', // nombre de la estrategia
        new KeycloakPassportStrategy(
          {
            realm: this.config.getOrThrow('keycloakRealm'),
            url: this.config.getOrThrow('keycloakAuthUrl'),
            algorithms: ['RS256'],
            loggingLevel: 'debug',
            // Otras opciones...
          },
          (jwtPayload, done) => {
            try {
              const user =
                StrategyKeycloakDto.fromPassportKeycloakBearerJwt(jwtPayload);
              if (!user) {
                return done(
                  new HttpException(
                    {
                      error_code: 'Unauthorized',
                      message: 'invalid or malformed token',
                    },
                    HttpStatus.UNAUTHORIZED,
                  ),
                  false,
                );
              }
              return done(null, user);
            } catch (error) {
              console.error('Error durante la validación:', error);
              return done(error, false);
            }
          },
        ),
      );
    }
  }