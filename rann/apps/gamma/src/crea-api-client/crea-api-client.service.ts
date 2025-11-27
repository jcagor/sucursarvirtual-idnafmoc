import { Injectable } from '@nestjs/common';
import { CreateCreaApiClientDto } from './dto/create-crea-api-client.dto';
import { UpdateCreaApiClientDto } from './dto/update-crea-api-client.dto';
import {
  QueryCourseRegistration,
  RegistrationInformation,
} from './entities/crea-api-client.entity';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { QueryMallaInformation, ResponseMallaCrea } from './entities/crea-api-malla.entity';

@Injectable()
export class CreaApiClientService {
  private creaApiURL = '';
  private creaAuthUser = '';
  private creaAuthPass = '';
  private creaAuthApi = '';

  constructor(private readonly apiClient: HttpService) {
    this.creaApiURL = process.env.NEXT_PUBLIC_CREA_URL;
    this.creaAuthUser = process.env.NEXT_PUBLIC_CREA_AUTH_USER;
    this.creaAuthPass = process.env.NEXT_PUBLIC_CREA_AUTH_PASS;
    this.creaAuthApi = process.env.NEXT_PUBLIC_CREA_AUTH_API;

    if (!this.creaApiURL || this.creaApiURL == '') {
      throw 'SET THE ENVIRONMENT VARIABLE FOR CREA API: NEXT_PUBLIC_CREA_URL';
    }
    if (!this.creaAuthUser || this.creaAuthUser == '') {
      throw 'SET THE ENVIRONMENT VARIABLE FOR AUTH CREA USER: NEXT_PUBLIC_CREA_AUTH_USER';
    }
    if (!this.creaAuthPass || this.creaAuthPass == '') {
      throw 'SET THE ENVIRONMENT VARIABLE FOR AUTH CREA PASS: NEXT_PUBLIC_CREA_AUTH_PASS';
    }
    if (!this.creaAuthApi || this.creaAuthApi == '') {
      throw 'SET THE ENVIRONMENT VARIABLE FOR CREA AUTH API: NEXT_PUBLIC_CREA_AUTH_API';
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  // TOKEN ENDPOINTS

  private async requestCreaAuthToken() {
    try {
      const data = {
        username: this.creaAuthUser,
        password: this.creaAuthPass,
      };
      const config = {};

      const response = await this.apiClient.axiosRef
        .post(this.creaAuthApi, data, config)
        .then((result) => result.data);
      if (response) {
        if ('token' in response && 'message' in response) {
          console.log('CREA token status:', response.message);
          return response.token;
        } else {
          console.error('Invalid CREA Token structure received:', response);
        }
        return;
      }
      return;
    } catch (error) {
      console.log(
        `Error al obtener AUTHENTICATION para CREA: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      //console.log(error);
      return;
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  // CREA ENDPOINTS

  async createCourseRegistration(
    courseRegistrationQuery: QueryCourseRegistration,
  ): Promise<RegistrationInformation | undefined> {
    try {
      const crea_validation_token = await this.requestCreaAuthToken();

      const config = {
        headers: {
          Authorization: 'Bearer ' + crea_validation_token,
        },
        baseURL: this.creaApiURL,
      };
      const response = await this.apiClient.axiosRef
        .post('/matricula', courseRegistrationQuery, config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al realizar la matricula en Crea: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      return;
    }
  }

  async getMallaInformation(
    mallaQuery: QueryMallaInformation,
  ): Promise<ResponseMallaCrea | undefined> {
    try {
      const crea_validation_token = await this.requestCreaAuthToken();

      let params = [];
      if(mallaQuery.page){
        params.push(`page=${mallaQuery.page}`)
      }
      if(mallaQuery.items_per_page){
        params.push(`per_page=${mallaQuery.items_per_page}`)
      }

      let finalQueryParams = "";
      if(params.length>=1){
        finalQueryParams = "?" + params.join("&");
      }

      const config = {
        headers: {
          Authorization: 'Bearer ' + crea_validation_token,
        },
        baseURL: this.creaApiURL,
      };
      const response = await this.apiClient.axiosRef
        .get('/general/mallas' + finalQueryParams, config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al consultar las mallas en Crea: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`,
      );
      return;
    }
  }
}
