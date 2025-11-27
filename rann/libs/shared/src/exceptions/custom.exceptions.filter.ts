import {
    ExceptionFilter,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
   
  export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      let status;
      let responseException;
   
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        responseException = exception.getResponse();
        if (typeof responseException === 'object')
          responseException = Object.values(responseException);
      } else {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        responseException = [];
      }
   
      response.status(status).json({
        statusCode: status,
        error_code:
          typeof responseException !== 'string'
            ? responseException[0] ?? 'Internal Error'
            : 'Internal Error',
        error_msg:
          typeof responseException !== 'string'
            ? responseException[1] ?? exception.message
            : responseException,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }