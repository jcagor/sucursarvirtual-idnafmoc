import { Injectable, Logger } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgramScheduleDto } from './dto/create-program-schedule.dto';
import { UpdateProgramScheduleDto } from './dto/update-program-schedule.dto';
import { CreateProgramSessionDto } from './dto/create-program-session.dto';
import {
  BusinessInscriptionDto,
  UpdateProgramSessionDto,
} from './dto/update-program-session.dto';
import { KeycloakResponse } from '../types/KeycloakResponse';
import { UserInfoService } from '../user-info/user-info.service';

@Injectable()
export class ProgramService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userInfo: UserInfoService,
  ) {}

  findAll() {
    return this.prisma.program.findMany();
  }

  findOne(id: string) {
    return this.prisma.program.findUnique({
      where: { id },
    });
  }

  async findSchedule(id: string) {
    const schedule = await this.prisma.programSchedule.findUnique({
      where: { id },
    });
    if (schedule) {
      const { createdAt, updatedAt, ...rest } = schedule;
      return rest;
    }
    return schedule;
  }

  findScheduleByProgram(id: string) {
    return this.prisma.programSchedule.findMany({
      where: { program_id: id },
    });
  }

  createSchedule(data: CreateProgramScheduleDto) {
    return this.prisma.programSchedule.create({
      data,
    });
  }

  async updateSchedule(id: string, data: UpdateProgramScheduleDto) {
    const schedule = await this.prisma.programSchedule.update({
      where: { id },
      data,
    });
    if (schedule) {
      const { createdAt, updatedAt, ...rest } = schedule;
      return rest;
    }
    return schedule;
  }

  createSession(data: CreateProgramSessionDto) {
    return this.prisma.programSession.create({
      data,
    });
  }

  findSessionBySchedule(id: string) {
    return this.prisma.programSession.findMany({
      where: { programSchedule_id: id },
    });
  }

  async updateSession(id: string, data: UpdateProgramSessionDto) {
    const session = await this.prisma.programSession.update({
      where: { id },
      data,
    });
    if (session) {
      const { createdAt, updatedAt, ...rest } = session;
      return rest;
    }
    return session;
  }

  async findSession(id: string) {
    const session = await this.prisma.programSession.findUnique({
      where: { id },
    });
    if (session) {
      const { createdAt, updatedAt, ...rest } = session;
      return rest;
    }
    return session;
  }

  //////////////////
  // For Utopia

  async findAllBusiness(token: string) {
    const businessInfo: KeycloakResponse = this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: {
        name: businessInfo.identification_type,
      },
    });

    //Logger.debug(businessInfo.identification_number)
    //Logger.debug(documentType.id)

    const timeNow = new Date();

    return await this.prisma.program.findMany({
      include: {
        programSchedules: {
          where: {
            endDate: { gt: timeNow },
          },
          select: {
            BusinessList: {
              select: {
                id: true,
              },
              where: {
                AND: [
                  { document_number: businessInfo.identification_number },
                  { document_type_id: documentType.id },
                ],
              },
            },
          },
        },
      },
    });
  }

  async businessInscription(token: string, data: BusinessInscriptionDto) {
    const businessInfo: KeycloakResponse = this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: {
        name: businessInfo.identification_type,
      },
    });

    const business = await this.prisma.businessProfile.findFirst({
      where: {
        AND: [
          { document_type_id: documentType.id },
          { document_number: businessInfo.identification_number },
        ],
      },
    });

    return await this.prisma.programSchedule.update({
      where: { id: data.programSchedule_id },
      data: {
        BusinessList: {
          connect: { id: business.id }, // Assign new business to the schedule
        },
      },
    });
  }
}
