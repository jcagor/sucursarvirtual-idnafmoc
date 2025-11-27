import { IsNotEmpty, IsString } from 'class-validator';

export class fomentoUserInfoQuery {
  @IsNotEmpty()
  @IsString()
  identification_type: string;

  @IsNotEmpty()
  @IsString()
  identification_number: string;
}
