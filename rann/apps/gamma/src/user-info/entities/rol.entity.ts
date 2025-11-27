export enum UserRoles {
  ADMINISTRADOR_PYMES = 'administrador_pymes',
  CONSULTOR_PYMES = 'consultor_pymes',
  ANALISTA_PYMES = 'analista_pymes',
  ADMINISTRADOR_ACTIVOS = 'administrador_activos',
  ADMINISTRADOR_GENERAL = 'administrador_general',
}

export const tokenRoleMap: Record<string, UserRoles> = {
  'administrador-pymes': UserRoles.ADMINISTRADOR_PYMES,
  'consultor-pymes': UserRoles.CONSULTOR_PYMES,
  'analista-pymes': UserRoles.ANALISTA_PYMES,
  'administrador-activos': UserRoles.ADMINISTRADOR_ACTIVOS,
  'administrador-general': UserRoles.ADMINISTRADOR_GENERAL,
};
