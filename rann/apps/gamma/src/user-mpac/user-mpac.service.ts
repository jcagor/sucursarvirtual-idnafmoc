import { Injectable } from '@nestjs/common';
import { SaveMpacStatusHistoryDto } from './dto/create-user-mpac.dto';
import { UpdateUserMpacDto } from './dto/update-user-mpac.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SearchRegisterUserDto } from './dto/search-user-document.dto';

@Injectable()
export class UserMpacService {
  constructor(private readonly prisma: PrismaService) {}

  async insertHistoryEntry(createMpacHistoryEntry: SaveMpacStatusHistoryDto){
    return await this.prisma.userValidationHistory.create({
      data: {
        updated_at: new Date().toISOString(),
        identification_number: createMpacHistoryEntry.identificationNumber,
        identification_type: createMpacHistoryEntry.identificationType,
        validation_pass: createMpacHistoryEntry.validationPass,
        response_data: createMpacHistoryEntry.responseData,
        law: createMpacHistoryEntry.law,
        business_name: createMpacHistoryEntry.businessName,
        business_identification: createMpacHistoryEntry.businessIdentification,
      }
    });
  }

  async create(token:string, createMpacHistoryEntry: SaveMpacStatusHistoryDto) {
    const found = await this.prisma.userValidationHistory.findFirst({
      where:{
        AND:[
          {identification_type:createMpacHistoryEntry.identificationType},
          {identification_number:createMpacHistoryEntry.identificationNumber}
        ]
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    if (!found){
      return  await this.insertHistoryEntry(createMpacHistoryEntry);
    }
    else{
      const statusChange = found.validation_pass != createMpacHistoryEntry.validationPass;
      const mpacResponseChange = JSON.stringify(found.response_data) != JSON.stringify(createMpacHistoryEntry.responseData)
      if (statusChange || mpacResponseChange){        
        return  await this.insertHistoryEntry(createMpacHistoryEntry);
      }
      else{
        return found;
      }
    }
  }

  async findUserInformationByDocuments(
    documentsList: SearchRegisterUserDto,
  ) {
    const registers = (
      await Promise.all(
        documentsList.map(async (documentQuery) => {
          return this.prisma.userValidationHistory.findFirst({
            where: {
              AND: [
                { identification_number: documentQuery.document },
                { identification_type: documentQuery.document_abbreviation },
              ],              
            },
            orderBy:{
              created_at:'desc',
            }
          });
        }),
      )
    ).flat();

    const coincidences = documentsList.map((queryRegister) => {
      const found = registers.find(
        (res) => res && res.identification_number == queryRegister.document,
      );
      if (found) {
        return {
          document_abbreviation: found.identification_type,
          document: found.identification_number,
          business_name: found.business_name,
          business_id: found.business_identification,
        };
      } else {
        return {
          document_abbreviation: queryRegister.document_abbreviation,
          document: queryRegister.document,
          business_name: 'not_found',
          business_id: 'not_found',
        };
      }
    });

    return coincidences;
  }
}
