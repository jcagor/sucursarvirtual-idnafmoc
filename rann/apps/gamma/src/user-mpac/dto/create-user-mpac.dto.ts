import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserMpacDto {

}

export class SaveMpacStatusHistoryDto {  
    @IsNotEmpty()
    identificationNumber: string;
    @IsNotEmpty()
    identificationType: string;
    @IsNotEmpty()
    validationPass: boolean;
    @IsNotEmpty()
    responseData: {};

    @IsOptional()
    law: string;
    @IsOptional()
    businessName: string;
    @IsOptional()
    businessIdentification: string;  
}
