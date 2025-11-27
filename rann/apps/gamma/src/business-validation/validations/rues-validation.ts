import { DataBusinessDto } from '../../dto/dataBusinessDto';
import { DescriptionDto } from '../../dto/DescriptionDto';
import { FinancialInformationDto } from '../../dto/FinancialInformationDto';
import { PrismaService } from '../../prisma/prisma.service';
import { FormProgramDto } from '../dto/FormProgramDto';
import { ValidationStatus } from '../entities/BusinessValidationStatus';
import { requestRuesApi } from '../external-services/request-rues-api';

export async function ruesValidation(
  identification_type: string,
  identification_number: string,
  formProgram: FormProgramDto,
  prisma: PrismaService,
) {
  const Message: string[] = [];

  const documentType = await prisma.document_Type.findFirst({
    where: { name: identification_type },
  });

  if (!documentType) {
    return {
      isValid: false,
      messages: [`Tipo de documento ${identification_type} no encontrado.`],
      enableFileUpload: false,
    };
  }

  async function saveErrorValidation(message: string[]) {
    const existing = await prisma.businessValidation.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    if (existing) {
      await prisma.businessValidation.update({
        where: { id: existing.id },
        data: {
          reason: message,
          status: ValidationStatus.REJECTED,
          updatedAt: new Date(),
        },
      });
    } else {
      await prisma.businessValidation.create({
        data: {
          document_number: identification_number,
          document_type_id: documentType.id,
          reason: message,
          status: ValidationStatus.REJECTED,
          updatedAt: new Date(),
        },
      });
    }
  }

  try {
    const ruesApi = await requestRuesApi(
      identification_type,
      identification_number,
    );

    // Validar que los campos requeridos estén presentes en la respuesta del ruesApi
    const requiredFields = [
      'Out_fecha_validacion',
      'Out_fecha_constitucion',
      'Out_fecha_renovacion_matricula',
      'Out_estado_matricula',
      'Out_codigo_ciiu',
      'Out_ingreso_primero_año',
      'Out_ingreso_segundo_año',
      'Out_ingreso_tercer_año',
      'Out_municipio_comercial',
      'Out_actividad_economica',
      'Out_tamaño_empresa',
    ];
    const missingFields = requiredFields.filter(
      (field) =>
        ruesApi[field] === undefined ||
        ruesApi[field] === null ||
        (typeof ruesApi[field] === 'string' && ruesApi[field].trim() === ''),
    );
    if (missingFields.length > 0) {
      await saveErrorValidation([
        `Faltan los siguientes campos en la respuesta del API de rues: ${missingFields.join(', ')}`,
      ]);
      Message.push(
        'Ocurrió un error al realizar la validación de la empresa, comuníquese con un administrador.',
      );
      return { isValid: false, messages: Message, enableFileUpload: false };
    }

    // Validar matrícula mercantil
    const estadoMatricula = ruesApi.Out_estado_matricula?.toUpperCase();
    if (estadoMatricula !== 'ACTIVA' && estadoMatricula !== 'RENOVADA') {
      Message.push(
        'Su matrícula mercantil no está vigente. No puede continuar.',
      );
    }

    // Validar fecha de renovación de matrícula
    if (ruesApi.Out_fecha_renovacion_matricula) {
      const hoy = new Date();
      const fechaRenovacion = new Date(ruesApi.Out_fecha_renovacion_matricula);

      const añoActual = hoy.getFullYear();
      const esAntesDeAbril =
        hoy.getMonth() < 3 || (hoy.getMonth() === 2 && hoy.getDate() <= 31);

      const añoAceptado = esAntesDeAbril ? añoActual - 1 : añoActual;

      if (fechaRenovacion.getFullYear() < añoAceptado) {
        Message.push(
          'Su matrícula no está renovada. Actualícela antes de continuar.',
        );
      }
    }

    // Validar tamaño de empresa
    if (ruesApi.Out_tamaño_empresa?.toUpperCase() === 'GRANDE') {
      Message.push('Este programa no está disponible para grandes empresas.');
    }

    const program = await prisma.program.findUnique({
      where: { id: formProgram.id_program },
    });

    // Validar antigüedad mínima desde fecha de constitución en meses
    if (ruesApi.Out_fecha_constitucion) {
      const fechaConstitucion = new Date(ruesApi.Out_fecha_constitucion);
      const hoy = new Date();

      const diffMeses =
        (hoy.getFullYear() - fechaConstitucion.getFullYear()) * 12 +
        (hoy.getMonth() - fechaConstitucion.getMonth()) -
        (hoy.getDate() < fechaConstitucion.getDate() ? 1 : 0);

      if (diffMeses < program.months_of_constitution) {
        Message.push(
          'La empresa no cumple con el mínimo de antigüedad requerida para este programa.',
        );
      }
    }

    // Validar crecimiento de ingresos
    const ingreso1 = parseIngresoToNumber(ruesApi.Out_ingreso_primero_año);
    const ingreso2 = parseIngresoToNumber(ruesApi.Out_ingreso_segundo_año);
    const ingreso3 = parseIngresoToNumber(ruesApi.Out_ingreso_tercer_año);

    if (!(ingreso2 > ingreso1 && ingreso3 > ingreso2)) {
      Message.push('No se evidencia crecimiento de ingresos.');
    }

    // Validacion que fecha validacion sea menor a un mes
    if (ruesApi.Out_fecha_validacion) {
      const fechaValidacion = new Date(ruesApi.Out_fecha_validacion);
      fechaValidacion.setHours(0, 0, 0, 0);

      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      oneMonthAgo.setHours(0, 0, 0, 0);

      if (fechaValidacion < oneMonthAgo) {
        Message.push('La fecha de validación de rues debe ser menor a un mes.');
      }
    }

    // Validación ingresos específica para Conexion Agro
    if (program.name === 'Programa de Conexion Agro') {
      const ingresoMinimo = 180000000;

      if (ingreso2 < ingresoMinimo && ingreso3 < ingresoMinimo) {
        Message.push(
          'Los ingresos deben ser iguales o superiores a $180.000.000 para este programa.',
        );
      }

      if (Message.length === 1) {
        await saveErrorValidation(Message);
        return { isValid: false, messages: Message, enableFileUpload: true };
      }
    }

    // Validación microempresa para Conexion Agro y Programa de Sofisticación de producto/servicio
    if (program.name === 'Programa de Sofisticación de producto/servicio') {
      if (ruesApi.Out_tamaño_empresa == 'MICRO') {
        Message.push(
          'El tamaño de la empresa no puede ser micro para este programa.',
        );
      }

      if (Message.length === 1) {
        await saveErrorValidation(Message);
        return { isValid: false, messages: Message, enableFileUpload: true };
      }
    }

    // Validación para Conexion Agro para bloquear empresa que realice actividad economica con el sector de agroalimentacion
    const CodigoCiuu = await prisma.codeCIIU.findFirst({
      where: { code: ruesApi.Out_codigo_ciiu },
    });
    if (!CodigoCiuu) {
      Message.push(
        'El codigo CIIU no se encuentra registrado en la base de datos.',
      );
    }
    if (
      CodigoCiuu.valid_economic_activity == false &&
      program.name === 'Programa de Conexion Agro'
    ) {
      Message.push(
        'No es posible realizar el programa de Conexion Agro con empresas que realicen actividad economica diferente al sector de agroalimentacion.',
      );
    }

    // Si hay errores, detener ejecución
    if (Message.length > 0) {
      await saveErrorValidation(Message);
      return { isValid: false, messages: Message, enableFileUpload: false };
    }

    // Guardar validación exitosa
    const existing = await prisma.businessValidation.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    if (existing) {
      await prisma.businessValidation.update({
        where: { id: existing.id },
        data: {
          reason: [],
          status: ValidationStatus.APPROVED,
          validatedAt: new Date(ruesApi.Out_fecha_validacion),
          updatedAt: new Date(),
        },
      });
    } else {
      await prisma.businessValidation.create({
        data: {
          document_number: identification_number,
          document_type_id: documentType.id,
          status: ValidationStatus.APPROVED,
          validatedAt: new Date(ruesApi.Out_fecha_validacion),
          updatedAt: new Date(),
        },
      });
    }

    // GUARDAR O ACTUALIZAR LA INFORMACIÓN DEL PERFIL EMPRESARIAL

    let sector: any;
    if (CodigoCiuu.sector_id) {
      sector = await prisma.sector.findUnique({
        where: { id: CodigoCiuu.sector_id },
      });
    }

    const businessProfile = await prisma.businessProfile.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    const data = businessProfile.data as {
      DataBusiness: DataBusinessDto;
      FinancialInformation: FinancialInformationDto;
      Description: DescriptionDto;
    };

    if (businessProfile) {
      await prisma.businessProfile.update({
        where: {
          id: businessProfile.id,
        },
        data: {
          data: {
            ...data,
            DataBusiness: {
              ...data.DataBusiness,
              BusinessName: data.DataBusiness.BusinessName,
              City: ruesApi.Out_municipio_comercial,
            },
            FinancialInformation: {
              ...data.FinancialInformation,
              SalesYears1: limpiarIngreso(ruesApi.Out_ingreso_primero_año),
              SalesYears2: limpiarIngreso(ruesApi.Out_ingreso_segundo_año),
              SalesYears3: limpiarIngreso(ruesApi.Out_ingreso_tercer_año),
            },
            Description: {
              ...data.Description,
              MainEconomicActivity: ruesApi.Out_actividad_economica,
              ...(sector?.name ? { Sector: sector.name } : {}),
            },
          },
        },
      });
    }

    return { isValid: true };
  } catch (error) {
    saveErrorValidation([error.message]);
    return {
      isValid: false,
      messages: [
        'Ocurrió un error al realizar la validación de la empresa, comuníquese con un administrador.',
      ],
      enableFileUpload: false,
    };
  }
}

function parseIngresoToNumber(ingreso: string): number {
  return Number(ingreso.replace(/[^0-9]/g, '')) || 0;
}

function limpiarIngreso(ingreso: string): string {
  return ingreso.replace(/\$/g, '').replace(/,/g, '.').trim();
}
