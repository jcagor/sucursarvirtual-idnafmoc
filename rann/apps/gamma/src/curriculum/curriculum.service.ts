import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { PrismaService } from '../prisma/prisma.service';
import { KeycloakResponse } from '../types/KeycloakResponse';
import { RESUME_FORM_PAGE } from './entities/constants';
import {
  ResumeInformation,
  ResumeStatusResponse,
} from './entities/curriculum.entity';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UserInfoService } from '../user-info/user-info.service';
import { fomentoUserInfoQuery } from './dto/fomento-query.dto';
import { ErrorInformation } from '../types/GeneralTypes.type';
const fs = require('fs');
const PDFDocument = require('pdfkit-table');

@Injectable()
export class CurriculumService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userInfo: UserInfoService,
  ) {}

  validateStructure(userData: ResumeInformation) {
    try {
      if (userData.generalInfo) {
        if (userData.languages && userData.languages.length >= 1) {
          if (
            userData.knowledgeAndSkills &&
            userData.knowledgeAndSkills.skills.length >= 1
          ) {
            if (userData.profileAndExperience) {
              if (
                userData.profileAndExperience &&
                userData.profileAndExperience.userProfile
              ) {
                // Allow fresh graduate generate his Curriculum
                /*if( userData.profileAndExperience.userExperience && 
                    userData.profileAndExperience.userExperience.length>=1){
                }*/
                return true;
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  async create(token: string, createCurriculumDto: CreateCurriculumDto) {
    const client: KeycloakResponse = this.userInfo.jwtDecodeRann(token);

    const register = await this.prisma.curriculumInformation.findFirst({
      where: {
        AND: [
          { identification_type: client.identification_type },
          { identification_number: client.identification_number },
        ],
      },
    });
    if (!register) {
      const information_json = { ...createCurriculumDto.curriculum } as {};

      return await this.prisma.curriculumInformation.create({
        data: {
          updated_at: new Date().toISOString(),
          identification_number: client.identification_number,
          identification_type: client.identification_type,
          information: information_json,
        },
      });
    } else {
      const storedData = register.information as {};
      let receivedData;
      let newData;

      switch (createCurriculumDto.formPage) {
        case RESUME_FORM_PAGE.GENERAL_INFO:
          receivedData = createCurriculumDto.curriculum;
          newData = { ...storedData, generalInfo: receivedData.generalInfo };
          break;

        case RESUME_FORM_PAGE.EDUCATION:
          receivedData = createCurriculumDto.curriculum;
          newData = { ...storedData, education: receivedData.education };
          break;

        case RESUME_FORM_PAGE.LANGUAGES:
          receivedData = createCurriculumDto.curriculum;
          newData = { ...storedData, languages: receivedData.languages };
          break;

        case RESUME_FORM_PAGE.KNOWLEDGE_AND_SKILL:
          receivedData = createCurriculumDto.curriculum;
          newData = {
            ...storedData,
            knowledgeAndSkills: receivedData.knowledgeAndSkills,
          };
          break;

        case RESUME_FORM_PAGE.PROFILE_AND_EXPERIENCE:
          receivedData = createCurriculumDto.curriculum;
          newData = {
            ...storedData,
            profileAndExperience: receivedData.profileAndExperience,
          };
          break;

        default:
          console.error(
            'ERROR: invalid form page to save: ',
            createCurriculumDto.formPage,
          );
          break;
      }
      if (newData) {
        return await this.prisma.curriculumInformation.update({
          where: { id: createCurriculumDto.registerId },
          data: {
            updated_at: new Date().toISOString(),
            information: newData,
            complete: this.validateStructure(newData),
          },
        });
      }
    }
  }

  async findJwt(token: string) {
    const client: KeycloakResponse = this.userInfo.jwtDecodeRann(token);

    const register = await this.prisma.curriculumInformation.findFirst({
      where: {
        AND: [
          { identification_type: client.identification_type },
          { identification_number: client.identification_number },
        ],
      },
    });

    //console.log("CLIENT DATA: ", client);
    //console.log("USER DATA: ", register);
    return register;
  }

  async getResumeStatus(token: string) {
    const USER_NOT_FOUND_ERR = 'No se encuentra el usuario solicitado';
    const client: KeycloakResponse = this.userInfo.jwtDecodeRann(token);

    const resumeStatus = await this.prisma.curriculumInformation.findFirst({
      where: {
        AND: [
          { identification_number: client.identification_number },
          { identification_type: client.identification_type },
        ],
      },
    });

    if (resumeStatus) {
      return {
        error: false,
        status: resumeStatus.complete ?? false,
      } as ResumeStatusResponse;
    } else {
      return {
        error: true,
        message: USER_NOT_FOUND_ERR,
        status: false,
      } as ResumeStatusResponse;
    }
  }

  async generarPDF(
    token: string,
    curriculumDto: CreateResumeDto,
  ): Promise<Buffer> {
    try {
      const ui: ResumeInformation = curriculumDto;

      // PDF

      // CONFIGURATION CONSTANTS
      const LEGAL_SIZE = {
        WIDTH: 612.0,
        HEIGHT: 1008.0,
      };

      const MARGIN = {
        TOP: 30,
        BOTTOM: 30,
        LEFT: 30,
        RIGHT: 30,
      };

      const MARGIN_CUSTOM = {
        COL_TWO_START: { x: 321, y: 213 },
        BOTTOM_LIMIT: LEGAL_SIZE.HEIGHT - MARGIN.BOTTOM,
      };

      const pdfBuffer: Buffer = await new Promise(async (resolve) => {
        PDFDocument.prototype.verify = function (callback: Function) {
          const LIMIT = MARGIN_CUSTOM.BOTTOM_LIMIT - 100; // LEGAL
          console.log(
            'Y REST PROTO:',
            this.maxY,
            this.y,
            MARGIN_CUSTOM.BOTTOM_LIMIT,
            this.onSecondColumn,
          );

          if (!this.hasOwnProperty('onSecondColumn')) {
            this.onSecondColumn = false;
          }

          if (this.y > LIMIT) {
            if (this.onSecondColumn) {
              this.onSecondColumn = false;
              this.addPage();
              this.x = MARGIN.LEFT;
              this.y = MARGIN.TOP;
            } else {
              this.onSecondColumn = true;

              this.x = MARGIN_CUSTOM.COL_TWO_START.x;
              this.y = MARGIN_CUSTOM.COL_TWO_START.y;
              if (callback) {
                callback(this.x, this.y);
              }
            }
          }
        };

        const doc = new PDFDocument({
          bufferPages: true,
          size: 'LEGAL',
          margins: {
            top: MARGIN.TOP,
            bottom: MARGIN.BOTTOM,
            left: MARGIN.LEFT,
            right: MARGIN.RIGHT,
          },
        });

        // Events
        doc.on('pageAdded', () => {
          console.log('page added');
          doc.x = MARGIN.LEFT;
          doc.y = MARGIN.TOP;
        });

        // Functions
        const onColumnFill = (x, y) => {
          console.log('CALLBACK!', x, y);
        };

        const addTitle = (doc, text) => {
          doc
            .fillColor(BLUE_COMFANDI)
            .font('outfit-bold')
            .fontSize(13)
            .text(text, doc.x, doc.y)
            .verify(onColumnFill);
        };

        const addRegularText = (doc, text) => {
          doc.fillColor('#000').font('outfit-regular').fontSize(10).text(text, {
            width: COLL_INNER_WIDTH,
            align: 'left',
          });
        };

        const resetTextStyle = (doc) => {
          const row_x = doc.onSecondColumn
            ? MARGIN_CUSTOM.COL_TWO_START.x
            : MARGIN.LEFT;
          doc
            .fillColor('#000')
            .font('outfit-regular')
            .fontSize(10)
            .text('', row_x, doc.y, {
              width: COLL_INNER_WIDTH,
              align: 'left',
            });
        };

        // Objects and Utils
        const BLUE_COMFANDI = '#003DA5';
        const logoURL = 'assets/confandiLogo.png';
        const logoLightURL = 'assets/lightLogo.png';
        const headerVector = 'assets/headerVector.png';
        const userPhoto = 'assets/profile.png';

        const icon_phone = 'assets/ress_phone.png';
        const icon_mail = 'assets/ress_mail.png';
        const icon_location = 'assets/ress_location.png';
        const icon_linkedIn = 'assets/ress_in.png';

        const COLL_INNER_WIDTH = 240; // REAL 276

        let fullName = [
          ui.generalInfo.firstName,
          ui.generalInfo.secondName,
          ui.generalInfo.firstLastName,
          ui.generalInfo.secondLastName,
        ]
          .join(' ')
          .toUpperCase();

        // FONTS
        doc.registerFont('outfit-regular', 'assets/Outfit-Regular.ttf');
        doc.registerFont('outfit-bold', 'assets/Outfit-Bold.ttf');

        // Header BG
        doc
          .rect(0, 0, 612, 180)
          .fillColor(BLUE_COMFANDI)
          .strokeColor(BLUE_COMFANDI)
          .lineWidth(5)
          .fillAndStroke();
        doc.restore();

        // Vector path
        doc.image(logoLightURL, 30, 25, { width: 100 });

        // Image Logo
        doc.image(headerVector, 400, 0, { width: 210 });

        // Header User Photo
        //doc.image(userPhoto, 30, 95, { width: 60 });

        // Header Description
        const userProfile = ui.profileAndExperience.userProfile;
        let suspensive = '';
        if (userProfile && userProfile.length > 50) {
          suspensive = '...';
        }
        doc.fillColor('white').fontSize(12).text('').moveDown(6);
        doc
          .font('outfit-bold')
          .fillColor('white')
          .fontSize(12)
          .text(fullName, 30, doc.y)
          .moveDown(0.2);
        doc
          .font('outfit-regular')
          .fillColor('white')
          .fontSize(12)
          .text(
            userProfile.substring(0, 50).toUpperCase() + suspensive,
            30,
            doc.y,
          )
          .moveDown(0.2);

        resetTextStyle(doc);
        doc.moveDown(5);

        // information icons
        const ICON_TEXT_FIX_X = MARGIN.LEFT + 20;
        const ICON_TEXT_FIX_Y = 2; // visual text align
        const SPACE_BETWEEN_ICONS = 1;

        // PHONE ICON
        doc.image(icon_phone, MARGIN.LEFT, doc.y, { width: 10 });
        doc
          .text(
            ui.generalInfo.cellphone,
            ICON_TEXT_FIX_X,
            doc.y + ICON_TEXT_FIX_Y,
          )
          .moveDown(SPACE_BETWEEN_ICONS);

        // MAIL ICON
        doc.image(icon_mail, MARGIN.LEFT, doc.y, { width: 10 });
        doc
          .text(
            ui.generalInfo.emailAddress,
            ICON_TEXT_FIX_X,
            doc.y + ICON_TEXT_FIX_Y,
          )
          .moveDown(SPACE_BETWEEN_ICONS);

        // LOCATION ICON
        doc.image(icon_location, MARGIN.LEFT, doc.y, { width: 10 });
        doc
          .text(
            `${ui.generalInfo.city}, Colombia`,
            ICON_TEXT_FIX_X,
            doc.y + ICON_TEXT_FIX_Y,
          )
          .moveDown(SPACE_BETWEEN_ICONS);

        // LINKED-IN ICON
        /*
        doc.image(icon_linkedIn, MARGIN.LEFT, doc.y, { width: 10 });
        doc
          .text('linkedin.com/in/', ICON_TEXT_FIX_X, doc.y + ICON_TEXT_FIX_Y)
          .moveDown(SPACE_BETWEEN_ICONS);
        */

        // Linebreak and style reset
        doc.moveDown(2);
        resetTextStyle(doc);

        // work profile
        const titleWorkProfile = 'Perfil';
        addTitle(doc, titleWorkProfile);
        doc.moveDown(1.5);
        resetTextStyle(doc);

        //
        addRegularText(doc, ui.profileAndExperience.userProfile);

        doc.moveDown(2).verify(onColumnFill);

        // knowledge and skills

        // SKILLS
        const skillsTitle = 'Habilidades';
        addTitle(doc, skillsTitle);
        doc.moveDown(1.5);
        resetTextStyle(doc);

        const BULLET_RADIUS = 3;
        const BULLET_FIX_X = 3;
        const BULLET_FIX_Y = 7;
        const LIST_ICON_FIX_X = 15;
        const BULLET_SPACE_BETWEEN = 0.5;

        ui.knowledgeAndSkills.skills.forEach((skill, idx) => {
          doc
            .save()
            .circle(doc.x + BULLET_FIX_X, doc.y + BULLET_FIX_Y, BULLET_RADIUS)
            .fillColor(BLUE_COMFANDI)
            .fill()
            .restore();

          doc.text(skill.label, doc.x + LIST_ICON_FIX_X, doc.y, {
            width: COLL_INNER_WIDTH,
            align: 'left',
          });

          doc
            .text('', MARGIN.LEFT, doc.y)
            .moveDown(BULLET_SPACE_BETWEEN)
            .verify(onColumnFill);
        });
        doc.moveDown(2);

        const KnowledgeTitle = 'Conocimientos';
        addTitle(doc, KnowledgeTitle);
        doc.moveDown(1.5);
        resetTextStyle(doc);

        // KNOWLEDGE
        ui.knowledgeAndSkills.knowledge.forEach((knowledge, idx) => {
          doc
            .save()
            .circle(doc.x + BULLET_FIX_X, doc.y + BULLET_FIX_Y, BULLET_RADIUS)
            .fillColor(BLUE_COMFANDI)
            .fill()
            .restore();

          doc.text(knowledge.label, doc.x + LIST_ICON_FIX_X, doc.y, {
            width: COLL_INNER_WIDTH,
            align: 'left',
          });

          doc
            .text('', MARGIN.LEFT, doc.y)
            .moveDown(BULLET_SPACE_BETWEEN)
            .verify(onColumnFill);
        });
        doc.moveDown(2);

        // Languages
        const languagesTitle = 'Idiomas';
        addTitle(doc, languagesTitle);
        doc.moveDown(1.5);
        resetTextStyle(doc);

        ui.languages.forEach((reg, index, arr) => {
          let Language = `Idioma: ${reg.language}`;
          let LanguageLevel = `Nivel: ${reg.level} / Idioma nativo: ${reg.nativeLanguage ? 'SI' : 'NO'}`;
          let languageCertified = `Certificado disponible: ${reg.certificateAvailable ? 'SI' : 'NO'}`;

          doc
            .save()
            .circle(doc.x + BULLET_FIX_X, doc.y + BULLET_FIX_Y, BULLET_RADIUS)
            .fillColor(BLUE_COMFANDI)
            .fill()
            .restore();

          doc
            .font('outfit-bold')
            .text(Language, doc.x + LIST_ICON_FIX_X, doc.y, {
              width: COLL_INNER_WIDTH,
              align: 'left',
            })
            .moveDown(0.5);

          doc
            .font('outfit-regular')
            .text(LanguageLevel, doc.x, doc.y, {
              width: COLL_INNER_WIDTH,
              align: 'left',
            })
            .moveDown(0.5);

          doc.text(languageCertified, doc.x, doc.y, {
            width: COLL_INNER_WIDTH,
            align: 'left',
          });

          doc
            .text('', MARGIN.LEFT, doc.y)
            .moveDown(BULLET_SPACE_BETWEEN)
            .verify(onColumnFill);
        });
        resetTextStyle(doc);
        doc.moveDown(2);

        //additional information
        /*const titleAdditionalInformation = 'Información Adicional';
        
        addTitle(doc, titleAdditionalInformation);
        doc.moveDown(1.5);        
        resetTextStyle(doc);                
        addRegularText(doc, "-")
        doc.moveDown(2);*/

        // education
        const titleEducation = 'Educación';

        addTitle(doc, titleEducation);
        doc.moveDown(1.5);
        resetTextStyle(doc);

        const LIST_SPACE_BETWEEN = 1.5;

        ui.education.studies.forEach((reg, index, arr) => {
          let startInfo = new Date(reg.startDate);
          let endInfo = new Date(reg.endDate);
          let monthStr = new Intl.DateTimeFormat('es', { month: 'long' })
            .format(startInfo)
            .toUpperCase();
          let monthEnd = new Intl.DateTimeFormat('es', { month: 'long' })
            .format(endInfo)
            .toUpperCase();

          let EducationLevel = `Nivel educativo: ${reg.titleObtained}`;
          let EducationTitleName = `Título obtenido: ${reg.educationTitleName}`;
          let EducationInstitution = `Institución: ${reg.institutionName}`;
          let EducationAdditionalInfo = reg.additionalInformation
            ? `Información Adicional: ${reg.additionalInformation}`
            : '';
          let EducationEstate = 'Estado: Graduado';
          let EducationDates = `Fecha finalización: ${monthStr} ${startInfo.getFullYear()} / ${monthEnd} ${endInfo.getFullYear()}`;

          doc
            .font('outfit-bold')
            .text(EducationInstitution, doc.x, doc.y, {
              width: COLL_INNER_WIDTH,
              align: 'left',
            })
            .moveDown(0.5);

          doc
            .font('outfit-regular')
            .text(EducationLevel, doc.x, doc.y, {
              width: COLL_INNER_WIDTH,
              align: 'left',
            })
            .moveDown(0.5);

          doc
            .font('outfit-regular')
            .text(EducationTitleName, doc.x, doc.y, {
              width: COLL_INNER_WIDTH,
              align: 'left',
            })
            .moveDown(0.5);

          doc
            .text(EducationDates, doc.x, doc.y, {
              width: COLL_INNER_WIDTH,
              align: 'left',
            })
            .moveDown(0.5);
          doc
            .text(EducationAdditionalInfo, doc.x, doc.y, {
              width: COLL_INNER_WIDTH,
              align: 'left',
            })
            .moveDown(0.5);

          doc
            .text('', doc.x, doc.y)
            .moveDown(LIST_SPACE_BETWEEN)
            .verify(onColumnFill);
        });
        doc.moveDown(2);

        // Work Experience
        const titleWorkExperience = 'Experiencia Laboral';

        addTitle(doc, titleWorkExperience);
        doc.moveDown(1.5);
        resetTextStyle(doc);

        ui.profileAndExperience.userExperience.forEach((reg, index, arr) => {
          let startInfo = new Date(reg.startDate);
          let endInfo = new Date(reg.endDate);
          let monthStr = new Intl.DateTimeFormat('es', { month: 'long' })
            .format(startInfo)
            .toUpperCase();
          let monthEnd = new Intl.DateTimeFormat('es', { month: 'long' })
            .format(endInfo)
            .toUpperCase();
          let businessInfo = `${reg.businessName} ${monthStr} ${startInfo.getFullYear()} / ${monthEnd} ${endInfo.getFullYear()}`;

          doc
            .font('outfit-bold')
            .text(
              reg.workRole.length >= 1 ? reg.workRole[0].label : '',
              doc.x,
              doc.y,
              {
                width: COLL_INNER_WIDTH,
                align: 'left',
              },
            )
            .moveDown(0.5);

          doc
            .font('outfit-bold')
            .text(reg.workRoleOpen ?? '', doc.x, doc.y, {
              width: COLL_INNER_WIDTH,
              align: 'left',
            })
            .moveDown(0.5);

          doc.font('outfit-regular').text('');

          /*doc.font('outfit-regular')
              .text(
              reg.businessName,
              doc.x,
              doc.y, {
                width: COLL_INNER_WIDTH,
                align: 'left',
              }
            ).moveDown(0.5);*/

          doc
            .text(businessInfo, doc.x, doc.y, {
              width: COLL_INNER_WIDTH,
              align: 'left',
            })
            .moveDown(0.5);

          doc
            .text(reg.resultsDescription, doc.x, doc.y, {
              width: COLL_INNER_WIDTH,
              align: 'left',
            })
            .moveDown(0.5);

          doc
            .text('', doc.x, doc.y)
            .moveDown(LIST_SPACE_BETWEEN)
            .verify(onColumnFill);
        });

        const buffer = [];
        doc.on('data', buffer.push.bind(buffer));
        doc.on('end', () => {
          const data = Buffer.concat(buffer);
          resolve(data);
        });
        doc.end();
      });

      return pdfBuffer;
    } catch (error) {
      console.log('Critical error generating PDF:', error);
      return null;
    }
  }

  async generateAttachment(token: string) {
    try {
      const resumeInformation = await this.findJwt(token);
      const pdfAttachment: Buffer = undefined;

      if (resumeInformation.complete) {
        const curriculum: CreateResumeDto =
          resumeInformation.information as {} as CreateResumeDto;

        const pdfAttachment = await this.generarPDF(token, curriculum);
        return pdfAttachment;
      }
    } catch (error) {
      console.error('Internal error creating attached PDF', error);
    }
    return false;
  }

  /** From Tione functions */
  async validateCurriculumInformation(query: fomentoUserInfoQuery, token: any) {
    if (!query.identification_number && !query.identification_type) {
      throw new BadRequestException(`Invalid query data`);
    }

    const register = await this.prisma.curriculumInformation.findFirst({
      where: {
        AND: [
          { identification_type: query.identification_type },
          { identification_number: query.identification_number },
        ],
      },
    });

    if (!register) {
      return {
        error: true,
        message: 'No registers found',
      } as ErrorInformation;
    }

    if (register.complete) {
      return register;
    } else {
      return {
        error: true,
        message: 'The curriculum is not complete',
      } as ErrorInformation;
    }
  }
}
