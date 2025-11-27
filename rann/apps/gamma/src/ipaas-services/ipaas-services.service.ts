import { Injectable, Logger } from '@nestjs/common';
import { CreateIpaasServiceDto } from './dto/create-ipaas-service.dto';
import { UpdateIpaasServiceDto } from './dto/update-ipaas-service.dto';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { JupiterDocumentQuery, JupiterStatusQuery } from './dto/jupiter.dto';

@Injectable()
export class IpaasServicesService {
  private siseApiURL = '';
  private siseAuthUser = '';
  private siseAuthPass = '';
  private siseAuthApi = '';

  private mpacApiURL = '';
  private mpacAuthUser = '';
  private mpacAuthPass = '';
  private mpacAuthApi = '';

  private fospecApiURL = '';

  private jupiterApiURL = '';
  private jupiterAuthUser = '';
  private jupiterAuthPass = '';
  private jupiterAuthApi = '';

  constructor(private readonly apiClient: HttpService) {
    this.siseApiURL = process.env.NEXT_PUBLIC_SISE_URL;
    this.siseAuthUser = process.env.NEXT_PUBLIC_SISE_AUTH_USER;
    this.siseAuthPass = process.env.NEXT_PUBLIC_SISE_AUTH_PASS;
    this.siseAuthApi = process.env.NEXT_PUBLIC_SISE_AUTH_API;

    this.mpacApiURL = process.env.NEXT_PUBLIC_MPAC_URL;
    this.mpacAuthUser = process.env.NEXT_PUBLIC_MPAC_AUTH_USER;
    this.mpacAuthPass = process.env.NEXT_PUBLIC_MPAC_AUTH_PASS;
    this.mpacAuthApi = process.env.NEXT_PUBLIC_MPAC_AUTH_API;

    this.fospecApiURL = process.env.NEXT_PUBLIC_FOMENTO_URL;

    this.jupiterAuthApi = process.env.IPASS_JUPITER_AUTH_API;
    this.jupiterAuthUser = process.env.IPASS_JUPITER_AUTH_USER;
    this.jupiterAuthPass = process.env.IPASS_JUPITER_AUTH_PASS;
    this.jupiterApiURL = process.env.IPASS_JUPITER_URL;

    if (!this.siseApiURL || this.siseApiURL == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR SISE API: NEXT_PUBLIC_SISE_URL',
      );
    }
    if (!this.siseAuthUser || this.siseAuthUser == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR AUTH SISE USER: NEXT_PUBLIC_SISE_AUTH_USER',
      );
    }
    if (!this.siseAuthPass || this.siseAuthPass == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR AUTH SISE PASS: NEXT_PUBLIC_SISE_AUTH_PASS',
      );
    }
    if (!this.siseAuthApi || this.siseAuthApi == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR SISE AUTH API: NEXT_PUBLIC_SISE_AUTH_API',
      );
    }

    if (!this.mpacApiURL || this.mpacApiURL == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR MAPAC API: NEXT_PUBLIC_MPAC_URL',
      );
    }
    if (!this.mpacAuthUser || this.mpacAuthUser == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR AUTH MPAC USER: NEXT_PUBLIC_MPAC_AUTH_USER',
      );
    }
    if (!this.mpacAuthPass || this.mpacAuthPass == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR AUTH MPAC PASS: NEXT_PUBLIC_MPAC_AUTH_PASS',
      );
    }
    if (!this.mpacAuthApi || this.mpacAuthApi == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR MPAC AUTH API: NEXT_PUBLIC_MPAC_AUTH_API',
      );
    }

    if (!this.fospecApiURL || this.fospecApiURL == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR FOMENTO API: NEXT_PUBLIC_FOMENTO_URL',
      );
    }

    if (!this.jupiterAuthApi || this.jupiterAuthApi == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR JUPITER API: IPASS_JUPITER_AUTH_API',
      );
    }

    if (!this.jupiterAuthUser || this.jupiterAuthUser == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR JUPITER API: IPASS_JUPITER_AUTH_USER',
      );
    }

    if (!this.jupiterAuthPass || this.jupiterAuthPass == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR JUPITER API: IPASS_JUPITER_AUTH_PASS',
      );
    }

    if (!this.jupiterApiURL || this.jupiterApiURL == '') {
      Logger.fatal(
        'SET THE ENVIRONMENT VARIABLE FOR JUPITER API: IPASS_JUPITER_URL',
      );
    }

    Logger.debug(`SISE URL: ${this.siseApiURL}`);
    Logger.debug(`MPAC URL: ${this.mpacApiURL}`);
    Logger.debug(`FOMENTO URL: ${this.fospecApiURL}`);
    Logger.debug(`JUPITER URL: ${this.jupiterApiURL}`);
  }

  ////////////////////////////////////////////////////////////////////////////
  // UTILS

  queryAgainDueKnownErrors(response: string, retryCount: number): boolean {
    const ERROR_STRING = 'ERROR';
    const SQL_SEND_BACKEND_ERROR = 'SQLSTATE_08006';
    const MAX_RETRIES = 3;

    Logger.debug(`Known errors, retry count ${retryCount}`);

    // Cancel on many retries.
    if (retryCount >= MAX_RETRIES) {
      Logger.debug('Query retry count exceded!');
      return false;
    }

    // Check no empty response.
    if (response && response != '') {
      // CHECK "Send to Backend Error"
      if (
        response.toUpperCase().includes(ERROR_STRING) &&
        response.includes(SQL_SEND_BACKEND_ERROR)
      ) {
        Logger.debug('Known error found [SQLSTATE_08006], try again');
        return true;
      }
    }
    return false;
  }

  ////////////////////////////////////////////////////////////////////////////
  // TOKEN ENDPOINTS

  private async requestSiseAuthToken() {
    try {
      const data = {};
      const config = {
        auth: {
          username: this.siseAuthUser,
          password: this.siseAuthPass,
        },
      };
      const response = await this.apiClient.axiosRef
        .post(this.siseAuthApi, data, config)
        .then((result) => result.data);
      if (response) {
        if ('access_token' in response && 'token_type' in response) {
          Logger.debug('SISE token type:', response.token_type);
          return response.access_token;
        } else {
          Logger.error('Invalid SISE structure received:', response);
        }
        return;
      }
      return;
    } catch (error) {
      Logger.debug(
        `Error al obtener AUTHENTICATION para SISE: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      //Logger.debug(error);
      return;
    }
  }

  private async requestMpacAuthToken() {
    try {
      const data = {};
      const config = {
        auth: {
          username: this.mpacAuthUser,
          password: this.mpacAuthPass,
        },
      };
      const response = await this.apiClient.axiosRef
        .post(this.mpacAuthApi, data, config)
        .then((result) => result.data);
      if (response) {
        if ('access_token' in response && 'token_type' in response) {
          Logger.debug('MPAC token type:', response.token_type);
          return response.access_token;
        } else {
          Logger.error('Invalid MPAC structure received:', response);
        }
        return;
      }
      return;
    } catch (error) {
      Logger.debug(
        `Error al obtener AUTHENTICATION para MPAC: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      //Logger.debug(error);
      return;
    }
  }

  private async requestJupiterAuthToken() {
    try {
      const data = {
        username: this.jupiterAuthUser,
        password: this.jupiterAuthPass,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      Logger.debug(this.jupiterAuthApi);
      const response = await this.apiClient.axiosRef
      .post(this.jupiterAuthApi, data, config)
      .then((result) => result.data);

      //Logger.debug(response);
      if (response) {
        if ('token' in response) {
          Logger.debug('Jupiter token OK:');
          return response.token;
        } else {
          Logger.error('Invalid Jupiter structure received:', response);
        }
        return;
      }
      return;
    } catch (error) {
      //Logger.error(error);
      Logger.debug(
        `Error al obtener AUTHENTICATION para JUPITER: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      //Logger.debug(error);
      return;
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  // SISE ENDPOINTS

  async requestSiseValidation(
    data: {
      documentType: string;
      identification: string;
    },
    token: string,
  ) {
    try {
      const sise_validation_token = await this.requestSiseAuthToken();

      if (sise_validation_token) {
        const config = {
          headers: {
            Authorization: 'Bearer ' + sise_validation_token,
          },
          baseURL: this.siseApiURL,
        };

        let response;
        let retryCount = 0;
        do {
          response = await this.apiClient.axiosRef
            .get(
              `?Tipo_Documento_Cliente=${data.documentType}&Numero_Documento_Cliente=${data.identification}&Codigo_Canal=2`,
              config,
            )
            .then((result) => result.data);
          retryCount++;
        } while (
          this.queryAgainDueKnownErrors(JSON.stringify(response), retryCount)
        );

        if (response) {
          return response;
        }
        return;
      } else {
        return;
      }
    } catch (error) {
      Logger.debug(
        `Error al consultar el estado en SISE del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      //Logger.debug(error);
      return;
    }
  }

  async requestSiseValidationV0(data: {}, token: string) {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        baseURL: 'http://localhost:3003/',
      };

      let response;
      let retryCount = 0;
      do {
        response = await this.apiClient.axiosRef
          .post('/v1/sise/validate', data, config)
          .then((result) => result.data);
        retryCount++;
      } while (
        this.queryAgainDueKnownErrors(JSON.stringify(response), retryCount)
      );

      if (response) {
        return response;
      }
      return;
    } catch (error) {
      Logger.debug(
        `Error al consultar el estado en SISE del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      //Logger.debug(error);
      return;
    }
  }

  async requestSiseUserResume(identification_number: string, token: string) {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        baseURL: this.siseApiURL,
      };
      const response = await this.apiClient.axiosRef
        .get('/v1/sise/resume/' + identification_number, config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      Logger.debug(
        `Error al consultar la HV en SISE del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      return;
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  // MPAC ENDPOINTS

  async requestMpacStatus(
    data: {
      documentType: string;
      identification: string;
    },
    token: string,
  ) {
    try {
      const mpac_validation_token = await this.requestMpacAuthToken();

      const config = {
        headers: {
          Authorization: 'Bearer ' + mpac_validation_token,
        },
        baseURL: this.mpacApiURL,
      };

      let response;
      let retryCount = 0;
      do {
        response = await this.apiClient.axiosRef
          .get(
            `?Tipo_Documento_Cliente=${data.documentType}&Numero_Documento_Cliente=${data.identification}&Codigo_Canal=2`,
            config,
          )
          .then((result) => result.data);
        retryCount++;
      } while (
        this.queryAgainDueKnownErrors(JSON.stringify(response), retryCount)
      );

      if (response) {
        return response;
      }
      return;
    } catch (error) {
      Logger.debug(
        `Error al consultar el estado mpac del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      return;
    }
  }

  async requestMpacStatusV0(data: {}, token: string) {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        baseURL: 'http://localhost:3003/',
      };

      let response;
      let retryCount = 0;
      do {
        response = await this.apiClient.axiosRef
          .post('v1/mpac/validate', data, config)
          .then((result) => result.data);
        retryCount++;
      } while (
        this.queryAgainDueKnownErrors(JSON.stringify(response), retryCount)
      );

      if (response) {
        // Procesamos la ley basada en el tipo de afiliación y estado
        const userType = this.getUserTypeFromResponse(response);
        const law = this.getLawByUserType(userType);

        return {
          ...response,
          Law_Active: law,
        };
      }
      return;
    } catch (error) {
      Logger.debug(
        `Error al consultar el estado mpac del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      return;
    }
  }

  private getUserTypeFromResponse(response: any): string {
    const AFFILIATION_TYPE_MAP: { [key: string]: string } = {
      AT00: 'ERROR',
      AT01: 'BENEFICIARIO',
      AT02: 'ACTIVO',
      AT03: 'CESANTE',
      AT04: 'PENSIONADO',
      AT05: 'UNIVERSAL',
    };

    const STATE_MAP: { [key: string]: string } = {
      S01: 'ACTIVO',
      S02: 'CESANTE',
      S03: 'BENEFICIARIO',
      S04: 'UNIVERSAL',
    };

    const userTypeFromAffiliation =
      AFFILIATION_TYPE_MAP[response.Affiliation_type];
    const userTypeFromState = STATE_MAP[response.State];

    return userTypeFromAffiliation || userTypeFromState || 'ACTIVO';
  }

  private getLawByUserType(userType: string): string {
    const upperUserType = userType.toUpperCase();
    switch (upperUserType) {
      case 'CESANTE':
      case 'UNIVERSAL':
        return '1636';
      case 'BENEFICIARIO':
      case 'ACTIVO':
      case 'PENSIONADO':
        return '2069';
      case 'ERROR':
        return '';
      default:
        return '1636';
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  // FOSPEC ENDPOINTS

  async requestFospecValidation(identification, token: string) {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        baseURL: this.fospecApiURL,
      };

      const response = await this.apiClient.axiosRef
        .get('/unemployed/find-postulation/' + identification, config)
        .then((result) => result.data);
      //Logger.debug("FOMENTO RESP:", response);

      if (response !== undefined) {
        return response;
      }
      return;
    } catch (error) {
      Logger.debug(error);
      Logger.debug(
        `Error al consultar el estado FOSPEC del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      return;
    }
  }

  async requestFospecMeetValidation(identification, token: string) {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        baseURL: this.fospecApiURL,
      };

      const response = await this.apiClient.axiosRef
        .get(
          '/unemployed/find-appointment-assignment/' + identification,
          config,
        )
        .then((result) => result.data);
      //Logger.debug("FOMENTO RESP:", response);

      if (response !== undefined) {
        return response;
      }
      return;
    } catch (error) {
      Logger.debug(error);
      Logger.debug(
        `Error al consultar el estado Cita FOSPEC del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      return;
    }
  }

  async requestFospecTraining(data, accessToken: string) {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        baseURL: this.fospecApiURL,
      };

      const response = await this.apiClient.axiosRef
        .get('/unemployed/find-user-training/' + data, config)
        .then((result) => result.data);

      if (response !== undefined) {
        return response;
      }
      return;
    } catch (error) {
      Logger.debug(
        `Error al consultar el estado FOSPEC del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      return;
    }
  }

  async requestFospecOpenJobs(accessToken: string) {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        baseURL: this.fospecApiURL,
      };

      const response = await this.apiClient.axiosRef
        .get('employment-agency/offer/open-jobs', config)
        .then((result) => result.data);
      //Logger.debug("FOMENTO Job List RESP:", response);

      if (response !== undefined) {
        return response;
      }
      return;
    } catch (error) {
      Logger.debug(error);
      Logger.debug(
        `Error al consultar el estado FOSPEC del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      return;
    }
  }

  async saveJobVacancyForm(data, accessToken: string) {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        baseURL: this.fospecApiURL,
      };
      const response = await this.apiClient.axiosRef
        .post('job-vacancy', data, config)
        .then((result) => result.data);

      //Logger.debug("Save Vacante de empleo:", response);

      if (response) {
        return response;
      }
      return;
    } catch (error) {
      Logger.debug(
        `Error al guardar el formulario FOSPEC de Vacantes de empleo: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      return;
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  // JUPITER ENDPOINTS

  async requestJupiterStatus(data: JupiterStatusQuery, token: string) {
    try {
      const jupiter_validation_token = await this.requestJupiterAuthToken();
      //Logger.debug(jupiter_validation_token);

      const config = {
        headers: {
          Authorization: 'Bearer ' + jupiter_validation_token,
        },
        baseURL: this.jupiterApiURL,
      };

      const documentsRev = data.documents.map((reg) => {
        if (
          !('document_type_id' in reg) ||
          !reg.document_type_id ||
          reg.document_type_id == ''
        ) {
          return {
            ...reg,
            document_type_id: '46dc2e93-a62a-48eb-b51c-ca8c3d38dcd4',
          } as JupiterDocumentQuery;
        }
        return reg;
      });

      const revisedData = {
        documents: documentsRev,
      } as JupiterStatusQuery;

      let response;
      let retryCount = 0;
      do {
        response = await this.apiClient.axiosRef
          .post(
            `/v1/postulations/postulation-state-jobmentor`,
            revisedData,
            config,
          )
          .then((result) => result.data);
        retryCount++;
      } while (
        this.queryAgainDueKnownErrors(JSON.stringify(response), retryCount)
      );

      if (response) {
        return response;
      }
      return;
    } catch (error) {
      Logger.error(
        `Error al consultar el estado JUPITER: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      return;
    }
  }
}
