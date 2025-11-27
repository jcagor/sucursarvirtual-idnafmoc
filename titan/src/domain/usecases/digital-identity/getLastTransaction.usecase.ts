import { injectable, inject } from "inversify";
import {
  DigitalIdentityStatusResponse,
  dataTransactionStatus,
  PENDING_TRANSACTION,
  DIGITAL_IDENTITY_STATUS_MESSAGE,
  COMPLETE_TRANSACTION,
  PREVIOUS_TRANSACTION,
} from "lib";
import { type IDigitalIdentityRepository } from "domain/repositories/digitalIdentity.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";

@injectable()
export default class GetLastTransactionUseCase {
  private digitalIdentityRepository: IDigitalIdentityRepository;

  constructor(
    @inject(REPOSITORY_TYPES._DigitalIdentityRepository)
    digitalIdentityRepository: IDigitalIdentityRepository
  ) {
    this.digitalIdentityRepository = digitalIdentityRepository;
  }

  async execute(token: string): Promise<DigitalIdentityStatusResponse | void> {
    let transactionState: DigitalIdentityStatusResponse = {
      status: 500,
      message: DIGITAL_IDENTITY_STATUS_MESSAGE.REVALIDATE,
      data: {
        idState: null,
        adoBody: null,
      },
    };

    if (!token) {
      console.log(`Token no suministrado para consultar el usuario`, "error");
      return transactionState;
    }

    try {
      const response = await this.digitalIdentityRepository.getLastTransaction(
        token
      );

      if (!response || !response.statusCode) {
        transactionState.message = "No se pudo obtener la transacción";
        return transactionState;
      }

      if (response.statusCode >= 200 && response.statusCode < 300) {
        const dataTransactionState = dataTransactionStatus(response.data);

        if (dataTransactionState) {
          const idState = dataTransactionState.idState;

          if (idState == PENDING_TRANSACTION) {
            transactionState = {
              status: 200,
              message: DIGITAL_IDENTITY_STATUS_MESSAGE.IN_PROCESS,
              data: { idState: dataTransactionState, adoBody: null },
            };
          } else if (
            idState == COMPLETE_TRANSACTION ||
            idState == PREVIOUS_TRANSACTION
          ) {
            transactionState = {
              status: 200,
              message: DIGITAL_IDENTITY_STATUS_MESSAGE.COMPLETE,
              data: { idState: dataTransactionState, adoBody: response.data },
            };
          } else {
            transactionState = {
              status: 200,
              message: DIGITAL_IDENTITY_STATUS_MESSAGE.INCOMPLETE,
              data: { idState: null, adoBody: null },
            };
          }
        }
      } else if (response.statusCode >= 400 && response.statusCode < 500) {
        transactionState = {
          status: response.statusCode,
          message: DIGITAL_IDENTITY_STATUS_MESSAGE.INCOMPLETE,
          data: { idState: null, adoBody: null },
        };
      } else {
        transactionState = {
          status: response.statusCode,
          message: DIGITAL_IDENTITY_STATUS_MESSAGE.REVALIDATE,
          data: { idState: null, adoBody: null },
        };
      }

      return transactionState;
    } catch (err: any) {
      // Si el error es de conexión, actualizamos el estado a REVALIDATE
      if (err.code === "ERR_NETWORK") {
        transactionState = {
          status: 500,
          message: DIGITAL_IDENTITY_STATUS_MESSAGE.REVALIDATE,
          data: { idState: null, adoBody: null },
        };
      }

      return transactionState;
    }
  }
}
