// TODO: Buscar la manera de activar estos mantenimientos de forma dinámica desde la base de datos.

export interface IMaintenanceData {
  name: string;
}

export interface IMaintenance {
  path: string;
  startTime: string;
  endTime: string;
  maintenanceData: IMaintenanceData;
}

export const maintenanceRoutes = [
  // Arreglo de rutas a las que se les aplicará mantenimiento y no serán accesibles en el horario especificado.
  // Ejemplo:

  // Afiliaciones Inicio
  {
    path: "/my-affiliations",
    endTime: "2025-11-11T07:00:00-05:00",
    startTime: "2025-11-10T22:00:00-05:00",
    maintenanceData: {
      name: "Afiliaciones",
    },
  },
  {
    path: "/menu-affiliations",
    endTime: "2025-11-11T07:00:00-05:00",
    startTime: "2025-11-10T22:00:00-05:00",
    maintenanceData: {
      name: "Afiliaciones",
    },
  },

  {
    path: "/my-affiliations",
    endTime: "2025-11-12T07:00:00-05:00",
    startTime: "2025-11-11T22:00:00-05:00",
    maintenanceData: {
      name: "Afiliaciones",
    },
  },
  {
    path: "/menu-affiliations",
    endTime: "2025-11-12T07:00:00-05:00",
    startTime: "2025-11-11T22:00:00-05:00",
    maintenanceData: {
      name: "Afiliaciones",
    },
  },

  //Afiliaciones Fin

  {
    path: "/independents",
    startTime: "2025-09-26T21:00:00-05:00",
    endTime: "2025-09-29T07:00:00-05:00",
    maintenanceData: {
      name: "Afiliaciones",
    },
  },
  {
    path: "/employability",
    startTime: "2025-09-26T21:00:00-05:00",
    endTime: "2025-09-29T07:00:00-05:00",
    maintenanceData: {
      name: "Afiliaciones",
    },
  },
  {
    path: "/nemea",
    startTime: "2025-11-11T22:00:00-05:00",
    endTime: "2025-11-12T07:00:00-05:00",
    maintenanceData: {
      name: "Novedades",
    },
  },
  {
    path: "/certificates",
    startTime: "2025-11-11T22:00:00-05:00",
    endTime: "2025-11-12T07:00:00-05:00",
    maintenanceData: {
      name: "Certificados",
    },
  },
   {
    path: "/vanaheim",
    startTime: "2025-11-18T21:00:00-05:00",
    endTime: "2025-11-19T07:30:00-05:00",
    maintenanceData: {
      name: "Subsidio en Especie",
    },
  },
];
