import { Injectable } from '@nestjs/common';
import { CreateUserSiseDto } from './dto/create-user-sise.dto';
import { UpdateUserSiseDto } from './dto/update-user-sise.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserSiseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(token: string, createUserSiseDto: CreateUserSiseDto) {
    
    const found = await this.prisma.siseNotRegistered.findFirst({
      where:{
        AND:[
          {identification_type:createUserSiseDto.identification_type},
          {identification_number:createUserSiseDto.identification_number}
        ]
      }
    });
    if (!found){
      return await this.prisma.siseNotRegistered.create({
        data: {
          updated_at: new Date().toISOString(),
          identification_number: createUserSiseDto.identification_number,
          identification_type: createUserSiseDto.identification_type,
          name: createUserSiseDto.name,
          given_name: createUserSiseDto.given_name,
          family_name: createUserSiseDto.family_name,
          email: createUserSiseDto.email,
          edcmfndi: createUserSiseDto.edcmfndi,
          email_verified: createUserSiseDto.email_verified,        
        }
      });
    }
    else{
      return found;
    }   
  }
}
