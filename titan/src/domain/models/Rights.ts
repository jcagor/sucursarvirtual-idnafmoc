export interface Rights {
  DBRegister: string;
  clientType: string;
  affiliateType: string;
  parentDocument: string;
  parentTypeDocument: string;
  isregistered: boolean;
}

export interface RightsVerifyInterface {
  // Identification
  Bp?: string;
  TitularNumeroDocumento?: string;
  TitularTipoDocumento?: string;
  TitularFechaInicioVigencia?: string;
  // Personal Information
  TitularPrimerNombre?: string;
  TitularSegundoNombre?: string;
  TitularPrimerApellido?: string;
  TitularSegundoApellido?: string;
  TitularFechaNacimiento?: string;
  TitularGrupoAfiliado?: string;
  TitularEstado?: string;
  TitularEstadoMotivo?: string;
  TitularGenero?: string;
  TitularEstadoCivil?: string;
  TitularEdad?: string;
  TitularFechaFinVigencia?: string;
  TipoTrabajador?: string;
  Desc_mod_aporte?: string;
  TitularCategoriaSalarial?: string;
  ValorSalario?: string;
  EstadoEntregaTarjeta?: string;
  pacs?: PAC[];
  empleadores?: Empleadores[];
}

export interface PAC {
  BP: string;
  DescripcionParentesco: string;
  IdTipoDocAdministSub: string;
  MotivoBloqueo: string;
  NumDocAdminSub: string;
  PACBPInstEducativa: string;
  PACBPMPBiologico: string;
  PACCategoriaSalarial: string;
  PACComprobanteNutricional: string;
  PACDiscapacidad: string;
  PACEdad: string;
  PACEstadoTarjeta: string;
  PACFechaFinVigencia: string;
  PACFechaInicioVigencia: string;
  PACFechaLimiteComprobanteNutricional: string;
  PACFechaNacimiento: string;
  PACGenero: string;
  PACLoteTarjeta: string;
  PACMPBiologicoPrimerApellido: string;
  PACMPBiologicoPrimerNombre: string;
  PACMPBiologicoSegundoApellido: string;
  PACMPBiologicoSegundoNombre: string;
  PACMotivoBloqDocumentacion: string;
  PACMotivoBloqueoDocumentacion: string;
  PACMotivoBloqueoSubsidio: string;
  PACNivelEducativo: string;
  PACNombreInstEducativa: string;
  PACNumDocInstEducativa: string;
  PACNumDocMPBiologico: string;
  PACNumeroDocumento: string;
  PACNumeroTarjeta: string;
  PACPrimerApellido: string;
  PACPrimerNombre: string;
  PACSegundoApellido: string;
  PACSegundoNombre: string;
  PACTipoDocInstEducativa: string;
  PACTipoDocMPBiologico: string;
  PACTipoDocumento: string;
  PACValorSubsidio: string;
  Parentesco: string;
  PrimerApellido: string;
  PrimerNombre: string;
  SegundoApellido: string;
  SegundoNombre: string;
  estadoBeneficiario: string;
  fechaPersonaACargo: string;
  fechaRegistroPersonaACargo: string;
  fechaRegistroRetiro: string;
  idCausaRetiro: string;
  idTipoEntregaSubsidio: string;
  indicadorPersonaACargo: string;
  vlrSalario: string;
}

export interface Empleadores {
  Bp: string;
  EmpleadorTipoDocumento: string;
  EmpleadorNumeroDocumento: string;
  EmpleadorRazonSocial: string;
  EmpleadorEstado: string;
  TitularEmpresaPrincipal: string;
  Agrupacion: string;
  Sucursal: string;
  TitularFechaIngresoEmpresa: Date;
  TitularFechaFinVigencia: Date;
  TitularFechaInicioVigencia: string;
  empleadorLocalidad: string;
  TipoPersona: string;
  TipoAportante: string;
  FechaInicioActividades: string;
  Salario: string;
  ClaseAportante: string;
}
