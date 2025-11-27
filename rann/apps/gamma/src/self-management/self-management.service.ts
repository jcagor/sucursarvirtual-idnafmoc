import { Injectable } from '@nestjs/common';
import { CreateSelfManagementDto } from './dto/create-self-management.dto';
import { KeycloakResponse } from '../types/KeycloakResponse';
import { PrismaService } from '../prisma/prisma.service';
import { UserInfoService } from '../user-info/user-info.service';
import { EmailService } from '@app/shared/email/email.service';
import { ContactDto } from '../dto/ContactDto';

@Injectable()
export class SelfManagementService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userInfo: UserInfoService,
    private readonly emailService: EmailService,
  ) {}

  async isSelfManagementAvailable(token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    const selfManagement = await this.prisma.selfManagement.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (selfManagement === null) {
      return true;
    }

    if (selfManagement.createdAt) {
      const date = new Date(selfManagement.createdAt);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const months = diff / (1000 * 60 * 60 * 24 * 30);
      if (months >= 1) {
        return true;
      }
    }

    return false;
  }

  async create(
    token: string,
    createSelfManagementDto: CreateSelfManagementDto,
  ) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    const selfManagement = await this.prisma.selfManagement.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (selfManagement !== null) {
      if (selfManagement.createdAt) {
        const date = new Date(selfManagement.createdAt);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const months = diff / (1000 * 60 * 60 * 24 * 30);
        if (months < 1) {
          throw new Error(
            'You can only take the self-management test once a month',
          );
        }
      }
    }

    const LineIntervention = [
      'Gestión estratégica',
      'Gestión Financiera',
      'Comercial y mercadeo',
      'Talento humano',
      'Gestión de operaciones',
      'Gestión de la innovación',
    ];

    const Levels = [
      { value: 20, text: 'Nivel Básico' },
      { value: 40, text: 'En Desarrollo' },
      { value: 60, text: 'Estructurado' },
      { value: 80, text: 'Implementando' },
      { value: 100, text: 'Optimizando' },
    ].sort((a, b) => a.value - b.value);

    const questions = Object.entries(createSelfManagementDto)
      .filter(([key, _]) => key.startsWith('question'))
      .map(([_, value]) => value);

    const groupedQuestions = [];
    for (let i = 0; i < questions.length; i += 5) {
      groupedQuestions.push(questions.slice(i, i + 5));
    }

    const calculateScore = (group: string[]) => {
      const score = group.reduce((acc, answer) => {
        const level = Levels.find((level) => level.text === answer);
        return acc + (level ? level.value : 0);
      }, 0);
      return score / 5;
    };
    const scores = groupedQuestions.map(calculateScore);

    const numberOpportunities: number[] = LineIntervention.map((_, index) => {
      const key = `identified_opportunities_${index + 1}`;
      interface Opportunity {
        opportunity_text?: string;
      }
      const opportunities = createSelfManagementDto[key] as Opportunity[];

      if (!Array.isArray(opportunities)) return 0;

      // Filtrar solo las que tienen texto
      return opportunities.filter((opp) => opp.opportunity_text?.trim()).length;
    });

    const ResultsByLine = LineIntervention.map((line, index) => {
      const result = scores[index];
      const level = Levels.find((level) => result <= level.value);
      const maturity = level ? level.text : 'N/A';
      const NumberOpportunities = numberOpportunities[index];

      return {
        LineIntervention: line,
        Result: result,
        Maturity: maturity,
        NumberOpportunities: NumberOpportunities,
      };
    });

    const generalValue =
      scores.reduce((acc, score) => acc + score, 0) / scores.length;
    const generalLevel = Levels.find((level) => generalValue <= level.value);
    const generalResult = {
      Result: generalValue,
      Maturity: generalLevel ? generalLevel.text : 'N/A',
      NumberOpportunities: numberOpportunities.reduce(
        (acc, num) => acc + num,
        0,
      ),
    };

    const AnswersByLine = groupedQuestions.map((group, index) => {
      return {
        LineIntervention: LineIntervention[index],
        Answers: group,
      };
    });

    const analysis = {
      GeneralResult: generalResult,
      ResultsByLine: ResultsByLine,
      AnswersByLine: AnswersByLine,
    };

    return await this.prisma.selfManagement.create({
      data: {
        document_number: identification_number,
        document_type_id: documentType.id,
        answers: createSelfManagementDto,
        analysis: analysis,
      },
    });
  }

  async findAnalysis(token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    const selfManagement = await this.prisma.selfManagement.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!selfManagement) {
      throw new Error('Self-management not found');
    }

    const numSelfManagements = await this.prisma.selfManagement.count({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    const analysis = {
      ...(selfManagement.analysis as object),
      ReportAvailable: numSelfManagements > 1,
    };

    return analysis;
  }

  async report(token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    const selfManagements = await this.prisma.selfManagement.findMany({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 2,
    });

    const currentAnalysis = selfManagements[0];
    const previousAnalysis = selfManagements[1];

    const report = {
      CurrentAnalysis: currentAnalysis.analysis,
      PreviousAnalysis: previousAnalysis.analysis,
    };

    return report;
  }

  async sendSelfManagementToMail(file: Express.Multer.File, token: string) {
    try {
      const { identification_type, identification_number }: KeycloakResponse =
        this.userInfo.jwtDecodeRann(token);

      const documentType = await this.prisma.document_Type.findFirst({
        where: { name: identification_type },
      });

      if (!documentType) {
        throw new Error('Document type not found');
      }

      const businessProfile = await this.prisma.businessProfile.findFirst({
        where: {
          document_number: identification_number,
          document_type_id: documentType.id,
        },
      });

      const profileData = businessProfile.data as {
        Contact?: ContactDto;
      };

      if (!profileData.Contact.MailContact) {
        throw new Error('Correo no encontrado');
      }

      const attachments = [
        {
          filename: file.originalname,
          content: file.buffer,
        },
      ];

      const result = await this.emailService.sendEmail(
        profileData.Contact.MailContact,
        'Resultado de autodiagnostico',
        `${identification_type} ${identification_number}`,
        '',
        attachments,
      );

      if (result) {
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error enviando correo:', error.message);
      return false;
    }
  }
}
