import { JsonObject } from "@prisma/client/runtime/library";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString } from "class-validator";
import { ResumeInformation } from "../entities/curriculum.entity";

export class CreateCurriculumDto {    
    @IsObject()
    @IsNotEmpty()
    curriculum : ResumeInformation

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    formPage : number

    @IsString()    
    @IsOptional()
    registerId : string
}
