import { Injectable } from '@nestjs/common';
import { CreatePostulationDto } from './dto/create-postulation.dto';
import { KeycloakResponse } from '../types/KeycloakResponse';
import { PrismaService } from '../prisma/prisma.service';
import { OpenJob, POSTULATION_STAGES } from './entities/postulation.entity';
import {
  EMAIL_SOURCE,
  getPsychologistHtmlMailBody,
  getPsychologistTextMailBody,
  getUserHtmlMailBody,
  getUserTextMailBody,
} from './entities/constants';
import { CurriculumService } from '../curriculum/curriculum.service';
import { UserInfoService } from '../user-info/user-info.service';
const nodemailer = require('nodemailer');

@Injectable()
export class PostulationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly curriculum: CurriculumService,
    private readonly userInfo: UserInfoService,
  ) {}

  private getUserEmailBody(
    jobOffer: OpenJob,
    sourceEmail: string,
    destinationsEmail: Array<string>,
  ) {
    // subject of the email
    const SUBJECT_USER = `Confirmación de postulación a la vacante ${jobOffer.title} - Código: ${jobOffer.jobId}`;
    // The email body for recipients with non-HTML email clients.
    const BODY_USER_TEXT = getUserTextMailBody(jobOffer.title);
    // The HTML body of the email.
    const BODY_USER_HTML = getUserHtmlMailBody(jobOffer.title);

    return {
      Source: sourceEmail, // email from which you want to send the email
      Destination: {
        ToAddresses: destinationsEmail, // list of emails to send the mail
      },
      Message: {
        Subject: {
          Data: SUBJECT_USER,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: BODY_USER_HTML,
            Charset: 'UTF-8',
          },
          Text: {
            Data: BODY_USER_TEXT,
            Charset: 'UTF-8',
          },
        },
      },
      //ConfigurationSetName: "my-configuration-set", // get configuration set from you aws ses console
    };
  }

  private getPsychologistEmailBody(
    jobOffer: OpenJob,
    sourceEmail: string,
    destinationsEmail: Array<string>,
    tokenInfo: KeycloakResponse,
  ) {
    // subject of the email
    const SUBJECT_PSYCHOLOGIST = `Nueva postulación para la vacante de ${jobOffer.title} - Código: ${tokenInfo.name} ${tokenInfo.family_name}`;
    // The email body for recipients with non-HTML email clients.
    const BODY_PSYCHOLOGIST_TEXT = getPsychologistTextMailBody(
      jobOffer,
      tokenInfo,
    );
    // The HTML body of the email.
    const BODY_PSYCHOLOGIST_HTML = getPsychologistHtmlMailBody(
      jobOffer,
      tokenInfo,
    );

    return {
      Source: sourceEmail, // email from which you want to send the email
      Destination: {
        ToAddresses: destinationsEmail, // list of emails to send the mail
      },
      Message: {
        Subject: {
          Data: SUBJECT_PSYCHOLOGIST,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: BODY_PSYCHOLOGIST_HTML,
            Charset: 'UTF-8',
          },
          Text: {
            Data: BODY_PSYCHOLOGIST_TEXT,
            Charset: 'UTF-8',
          },
        },
      },
      //ConfigurationSetName: "my-configuration-set", // get configuration set from you aws ses console
    };
  }

  private async sendEmailSmtp(
    jobOffer: OpenJob,
    tokenInfo: KeycloakResponse,
    token: string,
  ) {
    const REGION = process.env.NEXT_PUBLIC_AWS_REGION;
    const END_POINT = process.env.NEXT_PUBLIC_AWS_ENDPOINT;
    const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
    const SECRET_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;

    /*
    console.log('DEBUG--------------------------------------------');
    console.log('region: ', REGION);
    console.log('access key: ', ACCESS_KEY);
    console.log('secret key: ', SECRET_KEY);
    console.log('end point: ', END_POINT);
    console.log('from eMail: ', EMAIL_SOURCE);
    console.log('to email: ', tokenInfo.email);
    console.log('DEBUG--------------------------------------------');
    */

    const transporter = nodemailer.createTransport({
      host: END_POINT,
      secure: true,
      //logger:true,
      //debug:true,
      port: 465,
      auth: {
        user: ACCESS_KEY,
        pass: SECRET_KEY,
      },
      tls: {
        ciphers: 'SSLv3',
        requireTLS: true,
        rejectUnauthorized: true,
      },
    });

    const SUBJECT_PSYCHOLOGIST = `Nueva postulación para la vacante de ${jobOffer.title} - ${tokenInfo.name} ${tokenInfo.family_name}`;
    const SUBJECT_USER = `Confirmación de postulación a la vacante ${jobOffer.title} - Código: ${jobOffer.jobId}`;

    let messagePsychologist = getPsychologistHtmlMailBody(jobOffer, tokenInfo);
    let messagePlainPsychologist = getPsychologistTextMailBody(
      jobOffer,
      tokenInfo,
    );

    let messageUser = getUserHtmlMailBody(jobOffer.title);
    let messagePlainUser = getUserTextMailBody(jobOffer.title);

    const attachName = `HV_${tokenInfo.identification_type}_${tokenInfo.identification_number}.pdf`;
    const attachmentPDF = await this.curriculum.generateAttachment(token);
    const attachType = 'application/pdf';

    if (!attachmentPDF) {
      console.error('El usuario no tiene la hoja de vida al dia');
      return false;
    }

    /*
    console.log('DEBUG ATTACHMENT --------------------------------');
    console.log('Attach name:', attachName);
    console.log("AttachFile: ", attachmentPDF)
    console.log('DEBUG ATTACHMENT --------------------------------');
    */

    const emailPsychologist = {
      from: EMAIL_SOURCE,
      to: tokenInfo.email, // the psychologist email
      subject: SUBJECT_PSYCHOLOGIST,
      html: messagePsychologist,
      text: messagePlainPsychologist,
      attachments: [
        {
          filename: attachName,
          content: attachmentPDF,
          contentType: attachType,
        },
      ],
    };

    const emailUser = {
      from: EMAIL_SOURCE,
      to: tokenInfo.email, // the user email
      subject: SUBJECT_USER,
      html: messageUser,
      text: messagePlainUser,
    };

    try {
      const resultPsychologist = await transporter.sendMail(emailPsychologist);
      //console.log("result email psychologist:", resultPsychologist);

      if (resultPsychologist.messageId !== '') {
        try {
          console.log(
            'Postulation eMail psychologist send success, message ID: ',
            resultPsychologist.messageId,
          );

          const resultUser = await transporter.sendMail(emailUser);
          //console.log("result email user:", resultUser);

          if (resultUser.messageId !== '') {
            console.log(
              'Postulation eMail user send success, message ID: ',
              resultUser.messageId,
            );
            return true;
          }
        } catch (error) {
          console.error('Error on send eMail user:', error);
        }
      }
    } catch (error) {
      console.error('Error on send eMail psychologist:', error);
    }
    return false;
  }

  async create(createPostulationDto: CreatePostulationDto, token: string) {
    const clientInfo: KeycloakResponse = this.userInfo.jwtDecodeRann(token);

    const register = await this.prisma.jobOfferPostulation.findFirst({
      where: {
        AND: [
          { document_number: clientInfo.identification_number },
          { document_type: clientInfo.identification_type },
          { job_offer_id: createPostulationDto.jobOfferId },
        ],
      },
    });

    if (!register) {
      const mailNotifyOk = await this.sendEmailSmtp(
        createPostulationDto.jobOffer,
        clientInfo,
        token,
      );

      if (mailNotifyOk) {
        return await this.prisma.jobOfferPostulation.create({
          data: {
            updated_at: new Date().toISOString(),
            document_number: clientInfo.identification_number,
            document_type: clientInfo.identification_type,
            job_offer_id: createPostulationDto.jobOfferId,
            postulation_status: POSTULATION_STAGES.PENDING,
            information: JSON.stringify(createPostulationDto.jobOffer),
          },
        });
      }
      return {
        error: 'No se puede registrar la postulación.',
      };
    } else {
      return {
        error: 'Ya te encuentras postulado a esta vacante.',
      };
    }
  }

  async findAll(token: string) {
    const clientInfo: KeycloakResponse = this.userInfo.jwtDecodeRann(token);

    const register = await this.prisma.jobOfferPostulation.findMany({
      where: {
        AND: [
          { document_number: clientInfo.identification_number },
          { document_type: clientInfo.identification_type },
        ],
      },
    });

    return register;
  }
}
