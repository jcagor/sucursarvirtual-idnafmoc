import { getComfandiHtmlBody } from '../../types/emailUtilBody';

export const getCourseNotificationMailBody = (
  courseName: string,
  startDateHuman: string,
) => {
  const message = `
    <p>¡Bienvenido al curso ${courseName}!</p>

    <p>
      ¡Te informamos que el curso ${courseName} esta activo 
      y dará inicio a sus actividades en ${startDateHuman}.
    </p>      
    
    <p>¡Te deseamos mucho éxito!</p>

    <p>
      Atentamente,<br />
      Comfandi
    </p>
  `;
  return getComfandiHtmlBody(message);
};

export const getCourseNotificationTextMailBody = (
  courseName: string,
  startDateHuman: string,
) => {
  return `
¡Bienvenido al curso ${courseName}!\r\n\r\n

¡Te informamos que el curso ${courseName} esta activo\r\n
y dará inicio a sus actividades en ${startDateHuman}.\r\n

¡Te deseamos mucho éxito!\r\n\r\n

Atentamente,\r\n 
Comfandi.`;
};

export const getCourseCancelNotifyMailBody = (
  courseName: string,
  scheduleName: string,
  registerCount: number,
  minimumReq: number,
) => {
  const message = `
    <p>¡El curso ${courseName} no se pudo iniciar!</p>

    <p>
      El numero de estudiantes registrados del curso ${courseName} - ${scheduleName}
      alcanzo tan solo ${registerCount} personas registradas de ${minimumReq} requeridas 
      y no se pudo iniciar.
    </p>      
    
    <p>¡Toma las acciones correspondientes!</p>

    <p>
      Atentamente,<br />
      Comfandi
    </p>
  `;
  return getComfandiHtmlBody(message);
};

export const getCourseCancelNotifyTextMailBody = (
  courseName: string,
  scheduleName: string,
  registerCount: number,
  minimumReq: number,
) => {
  return `
¡El curso ${courseName} no se pudo iniciar!\r\n\r\n
  
El numero de estudiantes registrados del curso ${courseName} - ${scheduleName}\r\n\r\n
alcanzo tan solo ${registerCount} personas registradas de ${minimumReq} requeridas y no se pudo iniciar.\r\n\r\n        
  
¡Toma las acciones correspondientes!\r\n\r\n

Atentamente,\r\n 
Comfandi.`;
};
