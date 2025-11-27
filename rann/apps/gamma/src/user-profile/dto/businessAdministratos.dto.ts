import { IsArray, IsOptional, IsString } from "class-validator";

export class AssignAdminBusinessDto {  
    @IsOptional()
    @IsString()
    businessId: string;

    @IsOptional()
    @IsArray()
    businessIdList: Array<string|number>;
}


export enum ASSIGNATION_OPERATION{
    ASSIGN="ASSIGN",
    REMOVE="REMOVE",
}