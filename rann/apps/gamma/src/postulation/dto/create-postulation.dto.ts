import { IsNotEmpty, IsObject, IsString } from "class-validator"
import { OpenJob } from "../entities/postulation.entity"

export class CreatePostulationDto {

    // JWT client information:
    // -----------------------
    // document_type STRING
    // document_number NUMBER
    // email STRING
    // -----------------------

    @IsString()
    @IsNotEmpty()
    jobOfferId : string

    @IsObject()
    @IsNotEmpty()
    jobOffer : OpenJob
}
