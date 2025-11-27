import { JsonObject } from "@prisma/client/runtime/library";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString } from "class-validator";
import { EducationInformation, KnowledgeAndSkillsInformation, LanguageInformation, ProfileAndExperience, ResumeInformation, UserInformation } from "../entities/curriculum.entity";

export class CreateResumeDto implements ResumeInformation {
    @IsObject()
    generalInfo: UserInformation;
    @IsObject()
    education: EducationInformation;
    @IsArray()
    languages: LanguageInformation[];
    @IsObject()
    knowledgeAndSkills: KnowledgeAndSkillsInformation;
    @IsObject()
    profileAndExperience: ProfileAndExperience;
}
