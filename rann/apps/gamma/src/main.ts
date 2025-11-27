import { NestFactory } from '@nestjs/core';
import { GammaModule } from './gamma.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(GammaModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(json({ limit: '50mb' }));

  app.enableCors({
    origin: [
      'http://localhost:3000', // Titan/Utopia DEV
      'http://localhost:2000', // Anthe DEV
      'https://crecimientoempresarial.comfandi.com.co',      
      'https://www.sucursalcomfandi.com',
      'https://administracionempresarial.comfandi.com.co',
      'https://sucursalempresas.comfandi.com.co',
      'https://fomento.subsidioscomfandi.com.co',
      //'https://apifomento.subsidioscomfandi.com.co'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use(passport.initialize());
  

  await setupSwagger(app);
  await app.listen(process.env.port ?? 4000);
}

async function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('GAMMA - Gamma API')
    .setDescription('Documentacion de Gamma')
    .setVersion('1.0')
    .build();

  const apiKey = configService.getOrThrow('apiKeySwaggerGamma');
  const urlSwagger = configService.getOrThrow('urlSwaggerGamma');

  app.use(
    [urlSwagger, urlSwagger + '-json'],
    basicAuth({
      challenge: true,
      users: { admin: apiKey },
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(urlSwagger, app, document);
}

bootstrap();
