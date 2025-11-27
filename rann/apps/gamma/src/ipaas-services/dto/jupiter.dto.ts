import { IsArray, IsOptional, isString, IsString } from "class-validator";

export class JupiterDocumentQuery{    
    @IsString()
    document_abbreviation:string;
    @IsString()    
    document:string;
    @IsString()
    @IsOptional()
    document_type_id?:string;
}

export class JupiterStatusQuery{
    //GeneralInformation{
    @IsArray()
    documents:Array<JupiterDocumentQuery>;    
}