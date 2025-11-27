export interface Pac {
  FechaVigenciaDesde: string;
  TipoAfiliado?: string;
  EntidadTipoDocumento: string;
  EntidadNumeroDocumento: string;
  TitularTipoDocumento: string;
  TitularNumeroDocumento: string;
  TitularEstadoCivil: string;
  PACDatosPersonaTipoDocumento: string;
  PACDatosPersonaNumeroDocumento: string;
  PACDatosPersonaPrimerApellido: string;
  PACDatosPersonaSegundoApellido: string;
  PACDatosPersonaPrimerNombre: string;
  PACDatosPersonaSegundoNombre: string;
  PACDatosPersonaGenero: string;
  PACDatosPersonaEstadoCivil?: string;
  PACDatosPersonaFechaNacimiento: string;
  PACDatosPersonaOrientacionSexual?: string;
  PACDatosPersonaFactorDeVulnerabilidad?: string;
  PACDatosPersonaPertenenciaEtnica?: string;
  PACDatosPersonaResguardo?: string;
  PACDatosPersonaPuebloIndigena?: string;
  PACParentesco: string;
  PACRecibeSubsidio: string;
  PACPresentaDocEscolar: string;
  PACDiscapacidad?: string;
  PACCargoConyugue?: string;
  PACEducacion: string;
  PACOcupacion?: string;
  PadreBiologicoTipoDocumento?: string;
  PadreBiologicoNumeroDocumento?: string;
  PadreBiologicoPrimerApellido?: string;
  PadreBiologicoSegundoApellido?: string;
  PadreBiologicoPrimerNombre?: string;
  PadreBiologicoSegundoNombre?: string;
  EmpresaConyugueTipoDocumento?: string;
  EmpresaConyugueNumeroDocumento?: string;
  EmpresaConyuguePrimerNombre?: string;
  EmpresaConyugueSegundoNombre?: string;
  EmpresaConyuguePrimerApellido?: string;
  EmpresaConyugueSegundoApellido?: string;
  EmpresaConyugueTipoSalario?: string;
  EmpresaConyugueSueldoDeclarad0?: string;
}

export interface Log {
  TipoMensaje: string;
  ID: string;
  NumeroMensaje: string;
  TextoMensaje: string;
  MensajeVariable1: string;
  MensajeVariable2: string;
  MensajeVariable3: string;
  MensajeVariable4: string;
  MensajeVariable5: string;
  MESSAGE_LOG: MessageLog[];
}

export interface MessageLog {
  codigo: string;
  tipo: string;
  desc: string;
}
