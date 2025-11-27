import { Injectable } from '@nestjs/common';
import {
  CreateMonthlyReportDto,
  QueryReportByBusinessDto,
} from './dto/create-monthly-report.dto';
import { PrismaService } from '../prisma/prisma.service';
import { KeycloakResponse } from '../types/KeycloakResponse';
import { WorkPlanService } from '../work-plan/work-plan.service';
import {
  WorkPlanReportList,
  WorkPlanReportQueryType,
} from '../work-plan/types/WorkPlanType';
import {
  MilestonesReport,
  MilestonesReportList,
  MonthlyReportType,
} from './types/monthly-report.type';
import { DataBusinessDto } from '../dto/dataBusinessDto';
import { UserInfoService } from '../user-info/user-info.service';

const PDFDocument = require('pdfkit');

@Injectable()
export class MonthlyReportService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workPlan: WorkPlanService,
    private readonly userInfo: UserInfoService,
  ) {}

  async create(token: string, createMonthlyReportDto: CreateMonthlyReportDto) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    const sanitizedDto = JSON.parse(
      JSON.stringify({
        ...createMonthlyReportDto,
        milestones: createMonthlyReportDto.milestones?.map(
          ({ file, ...m }) => m,
        ),
      }),
    );

    return this.prisma.monthlyReport.create({
      data: {
        document_type_id: documentType.id,
        document_number: identification_number,
        data: sanitizedDto,
      },
    });
  }

  async queryReportList(token: string, query: QueryReportByBusinessDto) {
    const businessProfile = await this.prisma.businessProfile.findFirst({
      where: {
        id: query.businessId,
      },
    });

    return await this.prisma.monthlyReport.findMany({
      where: {
        document_type_id: businessProfile.document_type_id,
        document_number: businessProfile.document_number,
      },
    });
  }

  async queryMilestonesList(token: string) {
    const businessProfileList = await this.prisma.businessProfile.findMany();

    let milestonesFinal: MilestonesReportList = [];

    for (const businessProfile of businessProfileList) {
      const businessInfo = businessProfile.data as {
        DataBusiness: DataBusinessDto;
      };

      let milestonesReport: MilestonesReport = {
        businessId: businessProfile.id,
        businessName: businessInfo.DataBusiness.BusinessName,
        milestones: [],
      };

      const reports = await this.prisma.monthlyReport.findMany({
        where: {
          data: {
            path: ['businessId'],
            equals: businessProfile.id,
          },
        },
      });

      for (const report of reports) {
        const reportInfo: MonthlyReportType =
          report.data as {} as MonthlyReportType;
        if (reportInfo.milestones && reportInfo.milestones.length >= 1) {
          milestonesReport.milestones.unshift(reportInfo.milestones);
        }
      }
      milestonesFinal.push(milestonesReport);
    }

    return milestonesFinal;
  }

  async generateSummaryReport(token: string): Promise<Buffer> {
    let data = [
      {
        business: 'Empresa 1',
        timePlaned: '42',
        timeExecuted: '10',
        timePlanedPercent: '100%',
        timeExecutedPercent: '10%',
      },
      {
        business: 'Empresa 2',
        timePlaned: '42',
        timeExecuted: '10',
        timePlanedPercent: '100%',
        timeExecutedPercent: '10%',
      },
      {
        business: 'Empresa 3',
        timePlaned: '42',
        timeExecuted: '10',
        timePlanedPercent: '100%',
        timeExecutedPercent: '10%',
      },
    ];

    // Format hours Report table rows
    const hoursReportRows = data.map((row, index) => {
      return [
        index + 1 + '',
        row.business,
        row.timePlaned,
        row.timeExecuted,
        row.timePlanedPercent,
        row.timeExecutedPercent,
        '',
      ];
    });
    // End Format hours Report table rows

    const queryAll: WorkPlanReportQueryType = {};
    let interventionData: WorkPlanReportList =
      await this.workPlan.getWorkPlansForReport(queryAll);

    // Format workPlan pdf table rows
    const interventionDataReview = interventionData.map((row, index) => {
      let newRow;
      const workPlan = row.workPlan;

      let indicators = workPlan.indicators.map((ind) => {
        return [
          ind.indicator,
          ind.baseline,
          ind.unit,
          ind.goal,
          ind.finalValue,
          ind.mobility,
        ];
      });

      if (indicators.length >= 1) {
        newRow = [
          { rowSpan: workPlan.indicators.length, text: index + 1 + '' },
          { rowSpan: workPlan.indicators.length, text: row.businessName },
          { rowSpan: workPlan.indicators.length, text: workPlan.keyActivity },
          ...indicators[0],
        ];

        let leftIndicators = indicators.slice(1, indicators.length);
        return [newRow, ...leftIndicators];
      } else {
        let refill = ['', '', '', '', ''];
        newRow = [
          { rowSpan: workPlan.indicators.length, text: index + 1 + '' },
          { rowSpan: workPlan.indicators.length, text: row.businessName },
          { rowSpan: workPlan.indicators.length, text: workPlan.keyActivity },
          ...refill,
        ];
        return newRow;
      }
    });

    //Logger.debug(interventionDataReview);

    let interventionRows;
    for (const intervention of interventionDataReview) {
      interventionRows = [...(interventionRows ?? []), ...intervention];
    }
    //Logger.debug(interventionRows);
    // End Format workPlan pdf table rows

    try {
      // USER INFO DATA

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
          addFooter(doc);
        });

        // Functions
        const onColumnFill = (x, y) => {
          console.log('CALLBACK!', x, y);
        };

        const addTitle = (doc, text) => {
          doc
            .font('outfit-bold')
            .fillColor('black')
            .fontSize(15)
            .text(text, doc.x, doc.y)
            .moveDown(0.2);
        };

        const addRegularText = (doc, text) => {
          doc.fillColor('#000').font('outfit-regular').fontSize(10).text(text, {
            align: 'left',
          });
        };

        const addRegularParagraph = (doc, text) => {
          doc
            .fillColor('#000')
            .font('outfit-regular')
            .fontSize(10)
            .text(text, {
              align: 'left',
            })
            .moveDown(0.5);
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

        const addFooter = (doc) => {
          // Footer
          doc
            .rect(0, 970, 350, 2)
            .fillColor(BLUE_COMFANDI)
            .strokeColor(BLUE_COMFANDI)
            .lineWidth(5)
            .fillAndStroke();
          doc.restore();

          doc
            .rect(350, 970, 50, 2)
            .fillColor(BLUE_MEDIUM)
            .strokeColor(BLUE_MEDIUM)
            .lineWidth(5)
            .fillAndStroke();
          doc.restore();

          doc
            .rect(400, 970, 50, 2)
            .fillColor(BLUE_LIGHT)
            .strokeColor(BLUE_LIGHT)
            .lineWidth(5)
            .fillAndStroke();
          doc.restore();

          // Vector path
          doc.image(logoLightURL, 480, 945, { width: 100 });
        };

        // Objects and Utils
        const BLUE_COMFANDI = '#003DA5';
        const BLUE_MEDIUM = '#1C6EB7';
        const BLUE_LIGHT = '#5CC1DA';
        const logoURL = 'assets/confandiLogo.png';
        const logoLightURL = 'assets/lightLogo.png';
        const headerVector = 'assets/headerVector.png';
        const userPhoto = 'assets/profile.png';

        const COLL_INNER_WIDTH = 240; // REAL 276

        // FONTS
        doc.registerFont('outfit-regular', 'assets/Outfit-Regular.ttf');
        doc.registerFont('outfit-bold', 'assets/Outfit-Bold.ttf');

        // TABLES

        const headerMainStyle = {
          backgroundColor: BLUE_COMFANDI,
          textColor: 'white',
        };

        const headerSecStyle = {
          backgroundColor: BLUE_LIGHT,
        };

        const hoursReportTable = {
          columnStyles: ['*', '*', '*', '*', '*', '*', '*'],
          data: [
            [
              { rowSpan: 2, text: 'No' },
              { rowSpan: 2, text: 'Empresa' },
              {
                colSpan: 2,
                text: 'Cantidad horas acumulado',
                ...headerMainStyle,
              },
              { colSpan: 2, text: '% Avance acumulado', ...headerMainStyle },
              { text: 'Observaciones', ...headerMainStyle },
            ],
            [
              { text: 'Proyectadas', ...headerSecStyle },
              { text: 'Ejecutadas', ...headerSecStyle },
              { text: 'Proyectadas', ...headerSecStyle },
              { text: 'Ejecutadas', ...headerSecStyle },
              { text: '', ...headerSecStyle },
            ],
            ...hoursReportRows,
          ],
        };

        const interventionReportTable = {
          columnStyles: ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
          data: [
            [
              { text: 'No.', ...headerSecStyle },
              { text: 'Empresa', ...headerSecStyle },
              { text: 'Actividades Clave', ...headerSecStyle },
              { text: 'Indicador Asociado', ...headerSecStyle },
              { text: 'Línea Base', ...headerSecStyle },
              { text: 'Unidad', ...headerSecStyle },
              { text: 'Meta', ...headerSecStyle },
              { text: 'Valor Final', ...headerSecStyle },
              { text: 'Movilidad', ...headerSecStyle },
            ],
            ...interventionRows,
          ],
        };

        //Logger.debug(interventionReportTable);

        // Footer
        addFooter(doc);

        // Image Logo
        doc.image(headerVector, 400, 0, { width: 210 });

        // Content

        doc.fillColor('black').fontSize(12).text('').moveDown(20);
        doc
          .font('outfit-bold')
          .fillColor('black')
          .fontSize(20)
          .text('PROGRAMA DE PRODUCTIVIDAD', 30, doc.y)
          .moveDown(0.2);
        doc
          .font('outfit-bold')
          .fillColor(BLUE_COMFANDI)
          .fontSize(80)
          .text('INFORME', 30, doc.y)
          .moveDown(0.1);

        doc
          .font('outfit-bold')
          .fillColor(BLUE_COMFANDI)
          .fontSize(80)
          .text('MENSUAL', 30, doc.y)
          .moveDown(0.1);

        doc
          .rect(40, doc.y, 180, 7)
          .fillColor('gray')
          .strokeColor('gray')
          .lineWidth(5)
          .fillAndStroke()
          .moveDown(0.2);

        doc
          .font('outfit-bold')
          .fillColor('gray')
          .fontSize(20)
          .text('JULIO DE 2025', 40, doc.y)
          .moveDown(0.1);

        doc
          .font('outfit-bold')
          .fillColor('gray')
          .fontSize(20)
          .text('CORPORACIÓN INTERNACIONAL DE PRODUCTIVIDAD', 40, doc.y)
          .moveDown(0.1);

        resetTextStyle(doc);
        doc.moveDown(5);

        //
        doc.addPage();

        resetTextStyle(doc);

        addTitle(doc, '1. INTRODUCCIÓN / CONTEXTO GENERAL');

        let p11 =
          'El presente informa tiene como objetivo exhibir los avances en el Programa de Productividad, obtenidos hasta el día 14 del mes de abril de 2025. A la fecha se han recibido 4 bloques de empresas para un total de 42 empresas.';
        let p12 =
          'El presente informe presenta el avance por cada una de las empresas asignadas. A la fecha finalizaron 41 de las 42 empresas, dado que la empresa Sistemas industriales y seguridad ocupacional (SISO), se retiró del programa en el mes de enero por decisión del socio accionista de no continuar con la empresa, situación que fue sorpresa para los demás socios y gerente, las empresas que finalizaron fueron:';

        addRegularParagraph(doc, p11);
        addRegularParagraph(doc, p12);

        doc.moveDown(1);

        addTitle(doc, '2. CONSOLIDADO EJECUTIVO DE EMPRESAS MENSUAL');

        resetTextStyle(doc);

        let p21 =
          'En forma general el programa al 14 de abril lleva 1.744 horas de 1.764 horas totales programadas, incluyendo a la empresa retirada, para ejecutar en el mismo periodo para un porcentaje de cumplimiento total del 99%.';
        let p22 =
          'En la siguiente tabla se presenta la información consolidada por empresa, con corte al 14 de abril, sobre las horas presupuestadas y la relación de las horas ejecutadas en el periodo del informe, así como el porcentaje de avance esperado y real de cada empresa respecto al cronograma';

        addRegularParagraph(doc, p21);
        addRegularParagraph(doc, p22);

        // Hours Report table
        doc.table(hoursReportTable);

        doc.moveDown(1);

        addTitle(doc, '3. DETALLE DE LA INTERVENCIÓN');

        let p31 =
          'En la siguiente tabla se presenta un resumen de los indicadores y planes para las 42 empresas.';
        addRegularParagraph(doc, p31);

        doc.table(interventionReportTable);
        doc.moveDown(5);

        // BUFFER CONSOLIDATION
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
      return error;
    }
  }
}
