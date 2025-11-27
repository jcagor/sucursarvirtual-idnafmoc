import { Expose, plainToClass } from 'class-transformer';
 
export class StrategyKeycloakDto {
  @Expose({
    name: 'identification_number',
  })
  public documentId: string;
 
  @Expose({
    name: 'preferred_username',
  })
  public phoneNumber: string;
 
  static fromPassportKeycloakBearerJwt(jwtData: Record<string, any>) {
    return plainToClass(StrategyKeycloakDto, jwtData, {
      excludeExtraneousValues: true,
    });
  }
}