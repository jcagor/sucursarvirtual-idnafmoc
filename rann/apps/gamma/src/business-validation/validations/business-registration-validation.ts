import { PrismaService } from '../../prisma/prisma.service';
import { ValidationStatus } from '../entities/BusinessValidationStatus';
import { businessRegistrationApi } from '../external-services/business-registration-api';

export async function businessRegistrationValidation(
  identification_type: string,
  identification_number: string,
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
    const registrationApi = await businessRegistrationApi(
      identification_type,
      identification_number,
    );

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
