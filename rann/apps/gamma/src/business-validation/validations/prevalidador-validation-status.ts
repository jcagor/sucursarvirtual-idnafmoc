import { DataBusinessDto } from '../../dto/dataBusinessDto';
import { DescriptionInfrastructureAndCapacityDto } from '../../dto/DescriptionInfrastructureAndCapacityDto';
import { PrismaService } from '../../prisma/prisma.service';
import { KeycloakResponse } from '../../types/KeycloakResponse';
import { FormProgramDto } from '../dto/FormProgramDto';
import { ValidationStatus } from '../entities/BusinessValidationStatus';
import { requestPrevalidadorApi } from '../external-services/request-prevalidador-api';

export async function prevalidadorValidationStatus(
  identification_type: string,
  identification_number: string,
  prisma: PrismaService,
) {
  const documentType = await prisma.document_Type.findFirst({
    where: { name: identification_type },
  });

  if (!documentType) {
    return {
      Status: 'INVALIDATED',
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
    const requiredFields = ['Out_Nombre_Empresa', 'Out_Estado_Vinculacion'];
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
      return { Status: 'INVALIDATED' };
    }

    // Validación del estado de vinculación
    const estadoVinculacion = prevalidadorApi.Out_Estado_Vinculacion;
    if (estadoVinculacion !== 'VIGEN' && estadoVinculacion !== 'SUSPE') {
      Message.push('Su empresa no está habilitada para continuar el proceso.');
    }

    // Si hay errores, detener ejecución
    if (Message.length > 0) {
      await saveErrorValidation(Message);
      return { Status: 'INVALIDATED' };
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
          },
        },
      });
    }

    if (estadoVinculacion === 'VIGEN') {
      return { Status: 'VALIDATED' };
    } else if (estadoVinculacion === 'SUSPE') {
      return { Status: 'SUSPENDED' };
    } else {
      return { Status: 'INVALIDATED' };
    }
  } catch (error) {
    saveErrorValidation([error.message]);
    return {
      Status: 'INVALIDATED',
    };
  }
}
