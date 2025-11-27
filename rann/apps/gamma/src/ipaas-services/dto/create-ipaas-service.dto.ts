import { IsObject, IsOptional, IsString } from "class-validator";

export class CreateIpaasServiceDto {}

export class userDeviceInfo{    
    appVersion:	string;
    os:	string;
    osVersion:	string;
}

export class SiseValidationRequest{
    @IsString()
    documentType:	string;

    @IsString()
    identification:	string;

    @IsObject()
    @IsOptional()
    userDevice: userDeviceInfo;
}

export class MpacValidationRequest{
    @IsString()
    documentType:	string;

    @IsString()
    identification:	string;
    
    @IsObject()
    @IsOptional()
    userDevice: userDeviceInfo;
}