import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ABILITY_TYPE, FORM_SELECT_OPTIONS } from './entities/constants';
import { DataBusinessDto } from '../dto/dataBusinessDto';
import { KeycloakResponse } from '../types/KeycloakResponse';
import { UserInformationData } from '../user-info/entities/user-info.entity';
import { UserInfoService } from '../user-info/user-info.service';
import { courseRegionApi } from './external-services/course_regional-api';
import { UserRoles } from '../user-info/entities/rol.entity';

@Injectable()
export class FormUtilsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userInfo: UserInfoService,
  ) {}

  async getSelectOptions(selectList: string, token: string) {
    switch (selectList) {
      case FORM_SELECT_OPTIONS.CITY_LIST:
        const cities = await this.prisma.city.findMany();
        const arrayCities = cities.map((city) => ({
          label: city.name,
          value: city.name,
          shorthand: undefined,
        }));
        return arrayCities;

      case FORM_SELECT_OPTIONS.GENDER_LIST:
        const genders = await this.prisma.selectGender.findMany();
        const arrayGenders = genders.map((gender) => ({
          label: gender.gender,
          value: gender.gender,
          shorthand: undefined,
        }));
        return arrayGenders;

      case FORM_SELECT_OPTIONS.EDUCATION_TITLE_OPTIONS:
        const selectEducationTitle =
          await this.prisma.selectStudyType.findMany();
        const arrayEducationTitle = selectEducationTitle.map((reg) => ({
          label: reg.type,
          value: reg.type,
          shorthand: undefined,
        }));
        return arrayEducationTitle;

      case FORM_SELECT_OPTIONS.LANGUAGE_LEVEL_OPTIONS:
        const languageLevelOptions =
          await this.prisma.selectLanguageLevel.findMany();
        const arrayLanguageLevel = languageLevelOptions.map((reg) => ({
          label: reg.level,
          value: reg.level,
          shorthand: undefined,
        }));
        return arrayLanguageLevel;

      case FORM_SELECT_OPTIONS.LANGUAGE_LIST_OPTIONS:
        const languageListOptions = await this.prisma.selectLanguage.findMany();
        const arrayLanguageList = languageListOptions.map((reg) => ({
          label: reg.language,
          value: reg.language,
          shorthand: undefined,
        }));
        return arrayLanguageList;

      case FORM_SELECT_OPTIONS.AFFIRMATIVE_LIST_OPTIONS:
        const affirmativeSelectionOptions =
          await this.prisma.selectAffirmative.findMany();
        const affirmativeSelectList = affirmativeSelectionOptions.map(
          (reg) => ({
            label: reg.option,
            value: reg.option,
            shorthand: undefined,
          }),
        );
        return affirmativeSelectList;

      case FORM_SELECT_OPTIONS.KNOWLEDGE_AND_SKILLS:
        const languageAndSkillOptions =
          await this.prisma.selectKnowledgeAndSkills.findMany();
        const languageAndSkillList = languageAndSkillOptions.map((reg) => ({
          label: reg.name,
          value: reg.name,
          shorthand: undefined,
        }));
        return languageAndSkillList;

      case FORM_SELECT_OPTIONS.SKILLS_LIST:
        const skillsListOptions =
          await this.prisma.selectKnowledgeAndSkills.findMany({
            where: {
              AbilityType: {
                name: { equals: ABILITY_TYPE.SKILLS },
              },
            },
          });
        const skillsList = skillsListOptions.map((reg) => ({
          label: reg.name,
          value: reg.name,
          shorthand: undefined,
        }));
        return skillsList;

      case FORM_SELECT_OPTIONS.KNOWLEDGE_LIST:
        const knowledgeListOptions =
          await this.prisma.selectKnowledgeAndSkills.findMany({
            where: {
              AbilityType: {
                name: { equals: ABILITY_TYPE.KNOWLEDGE },
              },
            },
          });
        const knowledgeList = knowledgeListOptions.map((reg) => ({
          label: reg.name,
          value: reg.name,
          shorthand: undefined,
        }));
        return knowledgeList;

      case FORM_SELECT_OPTIONS.WORK_ROLE:
        const workRoleOptions = await this.prisma.selectWorkRole.findMany();
        const workRoleList = workRoleOptions.map((reg) => ({
          label: reg.denomination_code + ' ' + reg.role,
          value: reg.denomination_code + ' ' + reg.role,
          shorthand: reg.denomination_code,
        }));
        return workRoleList;

      case FORM_SELECT_OPTIONS.BUSINESS_LIST:
        const businessOptions = await this.prisma.businessProfile.findMany();
        const businessList = businessOptions.map((reg) => {
          const dataBusiness = reg.data as {
            DataBusiness?: DataBusinessDto;
          };

          return {
            label: dataBusiness.DataBusiness.BusinessName,
            value: reg.id,
            shorthand: undefined,
          };
        });
        return businessList;

      case FORM_SELECT_OPTIONS.BUSINESS_LIST_ANALYST:
        const businessOptionsA = await this.prisma.businessProfile.findMany();
        const businessListA = businessOptionsA.map((reg) => {
          const dataBusiness = reg.data as {
            DataBusiness?: DataBusinessDto;
          };

          return {
            label: dataBusiness.DataBusiness.BusinessName,
            value: dataBusiness.DataBusiness.RUT,
            shorthand: reg.id,
          };
        });
        return businessListA;

      case FORM_SELECT_OPTIONS.BUSINESS_LIST_BY_ROL:
        const clientInfo: KeycloakResponse = this.userInfo.jwtDecodeRann(token);
        console.log('clientInfo', clientInfo);
        const userDataRaw = await this.userInfo.getInfo(token);

        if (!userDataRaw) {
          Logger.debug(
            `user not found! ${clientInfo.identification_type}|${clientInfo.identification_number}`,
          );
          return [];
        }
        const userData: UserInformationData =
          userDataRaw as {} as UserInformationData;

        if (userData && userData.business.BUSINESS_SELECT?.length) {
          const businessSelList = userData.business.BUSINESS_SELECT;
          return businessSelList;
        }
        return [];

      case FORM_SELECT_OPTIONS.PROGRAM_LIST:
        const programOptions = await this.prisma.program.findMany();
        const programList = programOptions.map((reg) => ({
          label: reg.name,
          value: reg.id,
          shorthand: undefined,
        }));
        return programList;

      case FORM_SELECT_OPTIONS.BUSINESS_TYPE:
        const businessTypeOptions =
          await this.prisma.selectBusinessType.findMany();
        const businessTypeList = businessTypeOptions.map((reg) => ({
          label: reg.type,
          value: reg.type,
          shorthand: reg.id,
        }));
        return businessTypeList;

      case FORM_SELECT_OPTIONS.WORK_SECTOR:
        const workSectorOptions = await this.prisma.sector.findMany();
        const workSectorList = workSectorOptions.map((reg) => ({
          label: reg.name,
          value: reg.name,
          shorthand: reg.id,
        }));
        return workSectorList;

      case FORM_SELECT_OPTIONS.ATTENTION_POINT:
        const attentionPointOptions =
          await this.prisma.selectAttentionPoint.findMany();
        const attentionPointList = attentionPointOptions.map((reg) => ({
          label: reg.attention_point,
          value: reg.attention_point,
          shorthand: reg.id,
        }));
        return attentionPointList;

      case FORM_SELECT_OPTIONS.MUNICIPALITY_LIST:
        const municipalityOptions =
          await this.prisma.selectMunicipality.findMany();
        const municipalityList = municipalityOptions.map((reg) => ({
          label: reg.name,
          value: reg.name,
          shorthand: reg.id,
        }));
        return municipalityList;

      case FORM_SELECT_OPTIONS.HIRING_TYPE:
        const hiringTypeOptions = await this.prisma.selectHiringType.findMany();
        const hiringTypeList = hiringTypeOptions.map((reg) => ({
          label: reg.type,
          value: reg.type,
          shorthand: reg.id,
        }));
        return hiringTypeList;

      case FORM_SELECT_OPTIONS.WORK_MODE:
        const workModeOptions = await this.prisma.selectWorkMode.findMany();
        const workModeList = workModeOptions.map((reg) => ({
          label: reg.mode,
          value: reg.mode,
          shorthand: reg.id,
        }));
        return workModeList;

      case FORM_SELECT_OPTIONS.EXPERIENCE_RANGE:
        const experienceRangeOptions =
          await this.prisma.selectExperienceRange.findMany();
        const experienceRangeList = experienceRangeOptions.map((reg) => ({
          label: reg.range,
          value: reg.range,
          shorthand: reg.id,
        }));
        return experienceRangeList;

      case FORM_SELECT_OPTIONS.SALARY_RANGE:
        const salaryRangeOptions =
          await this.prisma.selectSalaryRange.findMany();
        const salaryRangeList = salaryRangeOptions.map((reg) => ({
          label: reg.range,
          value: reg.range,
          shorthand: reg.id,
        }));
        return salaryRangeList;

      case FORM_SELECT_OPTIONS.VACANCY_REQ_LANGUAGE:
        const vacReqLanguageOptions =
          await this.prisma.selectVacantReqLanguage.findMany();
        const vacReqLanguageList = vacReqLanguageOptions.map((reg) => ({
          label: reg.language,
          value: reg.language,
          shorthand: reg.id,
        }));
        return vacReqLanguageList;

      case FORM_SELECT_OPTIONS.DISABILITY_TYPE:
        const disabilityTypeOptions =
          await this.prisma.selectDisabilityType.findMany();
        const disabilityTypeList = disabilityTypeOptions.map((reg) => ({
          label: reg.disability,
          value: reg.disability,
          shorthand: reg.id,
        }));
        return disabilityTypeList;

      case FORM_SELECT_OPTIONS.WORK_DAYS:
        const workDaysOptions = await this.prisma.selectWorkDays.findMany();
        const workDaysList = workDaysOptions.map((reg) => ({
          label: reg.day,
          value: reg.day,
          shorthand: reg.id,
        }));
        return workDaysList;

      case FORM_SELECT_OPTIONS.VEHICLE_TYPE:
        const vehicleTypeOptions =
          await this.prisma.selectVehicleType.findMany();
        const vehicleTypeList = vehicleTypeOptions.map((reg) => ({
          label: reg.vehicle,
          value: reg.vehicle,
          shorthand: reg.id,
        }));
        return vehicleTypeList;

      case FORM_SELECT_OPTIONS.LABORAL_GESTOR:
        const laboralGestorOptions =
          await this.prisma.selectLaboralGestor.findMany();
        const laboralGestorList = laboralGestorOptions.map((reg) => ({
          label: reg.code + ' - ' + reg.gestor,
          value: reg.code + ' - ' + reg.gestor,
          shorthand: reg.id,
        }));
        return laboralGestorList;

      case FORM_SELECT_OPTIONS.CIIU_CODE_LIST:
        const ciuCodeOptions = await this.prisma.codeCIIU.findMany();
        const ciuCodeList = ciuCodeOptions.map((reg) => ({
          label: reg.code + ' - ' + reg.economic_activity,
          value: reg.code + ' - ' + reg.economic_activity,
          shorthand: reg.id,
        }));
        return ciuCodeList;

      case FORM_SELECT_OPTIONS.COURSES_LIST:
        const courses = await this.prisma.course.findMany();
        const courseList = courses.map((reg) => ({
          label: reg.name,
          value: reg.id,
        }));
        return courseList;

      case FORM_SELECT_OPTIONS.ASSISTANCE_MODE:
        const assistanceMode =
          await this.prisma.selectAssistanceMode.findMany();
        const modesList = assistanceMode.map((reg) => ({
          label: reg.mode,
          value: reg.id,
        }));
        return modesList;

      case FORM_SELECT_OPTIONS.APPOINTMENT_TYPE:
        const appointmentType =
          await this.prisma.selectAppointmentType.findMany();
        const types = appointmentType.map((reg) => ({
          label: reg.label,
          value: reg.id,
          shorthand: reg.id,
        }));
        return types;

      case FORM_SELECT_OPTIONS.REGIONAL_LIST:
        try {
          const per_page = 100;
          let apiRegionalList = await courseRegionApi(per_page);

          if (!apiRegionalList) {
            return [];
          }

          if (apiRegionalList.records_total > per_page) {
            apiRegionalList = await courseRegionApi(
              apiRegionalList.records_total,
            );
          }

          const regionalList = apiRegionalList.data.map((reg) => ({
            label: reg.nombre,
            value: reg.id,
          }));
          return regionalList;
        } catch (error) {
          console.error(error);
          return [];
        }

      case FORM_SELECT_OPTIONS.COURSE_ACCESS_TYPE_LIST:
        return [
          { value: 'OPEN', label: 'Abierto' },
          { value: 'CLOSED', label: 'Cerrado' },
        ];

      case FORM_SELECT_OPTIONS.CONSULTANTS_LIST:
        const consultants = await this.prisma.userProfile.findMany({
          where: {
            role: UserRoles.CONSULTOR_PYMES,
          },
        });

        const consultantsList = consultants.map((reg) => ({
          label: reg.name,
          value: reg.id,
        }));
        return consultantsList;

      case FORM_SELECT_OPTIONS.ADMIN_PYME_LIST:
        const admins = await this.prisma.userProfile.findMany({
          where: {
            role: UserRoles.ADMINISTRADOR_PYMES,
          },
        });

        const administratorList = admins.map((reg) => ({
          label: reg.name,
          value: reg.id,
        }));
        return administratorList;

      case FORM_SELECT_OPTIONS.PSY_TEST_EXAM_LIST:
        const examList = await this.prisma.psyTestExam.findMany({});

        const examListData = examList.map((reg) => ({
          label: reg.name,
          value: reg.id,
        }));
        return examListData;

      case FORM_SELECT_OPTIONS.VACANCY_ORIGIN:
        const vacancyOrigin = await this.prisma.selectVacancyOrigin.findMany(
          {},
        );

        const vacancyOriginListData = vacancyOrigin.map((reg) => ({
          label: reg.origin,
          value: reg.origin,
          shorthand: reg.id,
        }));
        return vacancyOriginListData;

      case FORM_SELECT_OPTIONS.COUNTRY_LIST:
        const countryList = await this.prisma.selectCountryList.findMany({});

        const countryListData = countryList.map((reg) => ({
          label: reg.country,
          value: reg.country,
          shorthand: reg.id,
        }));
        return countryListData;

      case FORM_SELECT_OPTIONS.LICENSE_TYPE:
        const licenseType = await this.prisma.selectLicenseType.findMany({});

        const licenseTypeDataList = licenseType.map((reg) => ({
          label: reg.level,
          value: reg.level,
          shorthand: reg.id,
        }));
        return licenseTypeDataList;

      default:
        Logger.error('NO SE ENCUENTRA LAS OPCIONES PARA SELECT:', selectList);
        return [];
    }
  }

  async getSelectFilterOptions(selectList: string, filterString: string) {
    switch (selectList) {
      case FORM_SELECT_OPTIONS.WORK_ROLE:
        const workRoleOptions = await this.prisma.selectWorkRole.findMany({
          where: {
            OR: [
              {
                denomination_code: {
                  contains: filterString,
                  mode: 'insensitive',
                },
              },
              { role: { contains: filterString, mode: 'insensitive' } },
            ],
          },
        });
        const workRoleList = workRoleOptions.map((reg) => ({
          label: reg.denomination_code + ' ' + reg.role,
          value: reg.denomination_code + ' ' + reg.role,
          shorthand: reg.denomination_code,
          occupations: reg.Occupations,
          cuoc_code: reg.cuoc_code,
          denomination_code: reg.denomination_code,
          role: reg.role,
        }));
        return workRoleList;

      default:
        console.error('NO SE ENCUENTRA LAS OPCIONES PARA SELECT:', selectList);
        return [];
    }
  }
}
