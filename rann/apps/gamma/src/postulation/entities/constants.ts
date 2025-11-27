import { getComfandiHtmlBody } from '../../types/emailUtilBody';
import { KeycloakResponse } from '../../types/KeycloakResponse';
import { OpenJob } from './postulation.entity';

export const EMAIL_SOURCE = 'no-reply@comfandi.com.co';

export const getUserHtmlMailBody = (jobOfferTitle: string) => {
  const message = `
    <p>
      ¡Gracias por postularte a la vacante de
      ${jobOfferTitle} Hemos recibido tu aplicación
      correctamente y nuestro equipo de preselección de la agencia
      de Comfandi comenzará el proceso de validación de los
      requisitos solicitados. En caso de que cumplas con los
      criterios establecidos, un psicólogo de la agencia de empleo
      se pondrá en contacto contigo.
    </p>

    <p>
      Mientras tanto, te invitamos a continuar explorando otras
      vacantes en nuestra plataforma o a actualizar tu perfil si
      lo deseas.
    </p>
    <p>¡Te deseamos mucho éxito en tu búsqueda de empleo!</p>

    <p>
      Atentamente,<br />
      El equipo de preselección de la agencia de empleo
    </p>
  `;
  return getComfandiHtmlBody(message);
};

export const getUserTextMailBody = (jobOfferTitle: string) => {
  return `
¡Gracias por postularte a la vacante de ${jobOfferTitle} Hemos recibido tu\r\n
aplicación correctamente y nuestro equipo de preselección de la agencia de\r\n
Comfandi comenzará el proceso de validación de los requisitos solicitados.\r\n        
En caso de que cumplas con los criterios establecidos, un psicólogo de la\r\n
agencia de empleo se pondrá en contacto contigo.\r\n\r\n

Mientras tanto, te invitamos a continuar explorando otras vacantes en nuestra\r\n
plataforma o a actualizar tu perfil si lo deseas.\r\n\r\n 

¡Te deseamos mucho éxito en tu búsqueda de empleo!\r\n\r\n

Atentamente,\r\n 
El equipo de preselección de la agencia de empleo.`;
};

export const getPsychologistTextMailBody = (
  jobOffer: OpenJob,
  jwtInfo: KeycloakResponse,
) => {
  return `
Estimado/a psicólogo:\r\n\r\n

Te informamos que hemos recibido una nueva postulación a la vacante de\r\n
${jobOffer.title} con el código de Sise ${jobOffer.jobId}.\r\n\r\n

El candidato, ${jwtInfo.name} ${jwtInfo.family_name}, ha completado su\r\n
aplicación correctamente a través de nuestra plataforma de empleo.\r\n\r\n

Por favor, revisa la hoja de vida adjunta y procede con el\r\n
proceso de validación de requisitos. En caso de que el candidato\r\n
cumpla con los criterios establecidos, te agradeceríamos que te\r\n
pusieras en contacto con él/ella\r\n`;
};

export const getPsychologistHtmlMailBody = (
  jobOffer: OpenJob,
  jwtInfo: KeycloakResponse,
) => {
  const message = `
  <p>Estimado/a psicólogo</p>

  <p>
    Te informamos que hemos recibido una nueva postulación a la
    vacante de ${jobOffer.title} con el código de Sise ${jobOffer.jobId}. 
    El candidato, ${jwtInfo.name} ${jwtInfo.family_name}, ha
    completado su aplicación correctamente a través de nuestra
    plataforma de empleo.
  </p>
  <p>
    Por favor, revisa la hoja de vida adjunta y procede con el
    proceso de validación de requisitos. En caso de que el
    candidato cumpla con los criterios establecidos, te
    agradeceríamos que te pusieras en contacto con él/ella
  </p>
  `;

  return getComfandiHtmlBody(message);
};
