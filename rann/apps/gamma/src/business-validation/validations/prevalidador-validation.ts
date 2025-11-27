import { DataBusinessDto } from '../../dto/dataBusinessDto';
import { DescriptionInfrastructureAndCapacityDto } from '../../dto/DescriptionInfrastructureAndCapacityDto';
import { PrismaService } from '../../prisma/prisma.service';
import { KeycloakResponse } from '../../types/KeycloakResponse';
import { FormProgramDto } from '../dto/FormProgramDto';
import { ValidationStatus } from '../entities/BusinessValidationStatus';
import { requestPrevalidadorApi } from '../external-services/request-prevalidador-api';

export async function prevalidadorValidation(
  identification_type: string,
  identification_number: string,
  formProgram: FormProgramDto,
  prisma: PrismaService,
) {
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

  const Message: string[] = [];
  identification_type = identification_type.toUpperCase();

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
    const prevalidadorApi = await requestPrevalidadorApi(
      identification_type,
      identification_number,
    );

    // Validar que los campos requeridos estén presentes en la respuesta del prevalidadorApi
    const requiredFields = [
      'Out_Nombre_Empresa',
      'Out_Estado_Vinculacion',
      'Out_Cantidad_Trabajadores',
      'Out_Tiene_Mora',
    ];
    const missingFields = requiredFields.filter(
      (field) =>
        prevalidadorApi[field] === undefined ||
        prevalidadorApi[field] === null ||
        (typeof prevalidadorApi[field] === 'string' &&
          prevalidadorApi[field].trim() === ''),
    );
    if (missingFields.length > 0) {
      await saveErrorValidation([
        `Faltan los siguientes campos en la respuesta del API de Prevalidador: ${missingFields.join(', ')}`,
      ]);
      Message.push(
        'Ocurrió un error al realizar la validación de la empresa, comuníquese con un administrador.',
      );
      return { isValid: false, messages: Message, enableFileUpload: false };
    }

    // Validación del estado de vinculación
    const estadoVinculacion = prevalidadorApi.Out_Estado_Vinculacion;
    if (estadoVinculacion !== 'VIGEN' && estadoVinculacion !== 'SUSPE') {
      Message.push('Su empresa no está habilitada para continuar el proceso.');
    }

    // Validar mora
    const tieneMora = prevalidadorApi.Out_Tiene_Mora?.toLowerCase();
    if (tieneMora === 'si') {
      Message.push('Su empresa presenta mora que impide continuar el proceso.');
    }

    // Validar número mínimo de trabajadores
    const program = await prisma.program.findUnique({
      where: { id: formProgram.id_program },
    });
    const Cantidad_Trabajadores = Number(
      prevalidadorApi.Out_Cantidad_Trabajadores,
    );

    if (program.minimum_number_workers > Cantidad_Trabajadores) {
      Message.push(
        `El ${program.name} debe tener al menos ${program.minimum_number_workers} trabajadores.`,
      );
    }

    // Si hay errores, detener ejecución
    if (Message.length > 0) {
      await saveErrorValidation(Message);
      return { isValid: false, messages: Message, enableFileUpload: false };
    }

    // Guardar o actualizar el perfil de la empresa
    const businessProfile = await prisma.businessProfile.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    if (!businessProfile) {
      await prisma.businessProfile.create({
        data: {
          document_number: identification_number,
          document_type_id: documentType.id,
          data: {
            DataBusiness: {
              BusinessName: prevalidadorApi.Out_Nombre_Empresa,
            },
            DescriptionInfrastructureAndCapacity: {
              TotalEmployees: Cantidad_Trabajadores,
            },
          },
        },
      });
    } else {
      const businessProfileData = businessProfile.data as {
        DataBusiness: DataBusinessDto;
        DescriptionInfrastructureAndCapacity: DescriptionInfrastructureAndCapacityDto;
      };

      await prisma.businessProfile.update({
        where: {
          id: businessProfile.id,
        },
        data: {
          data: {
            ...businessProfileData,
            DataBusiness: {
              ...businessProfileData.DataBusiness,
              BusinessName: prevalidadorApi.Out_Nombre_Empresa,
            },
            DescriptionInfrastructureAndCapacity: {
              ...businessProfileData.DescriptionInfrastructureAndCapacity,
              TotalEmployees: Cantidad_Trabajadores,
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
