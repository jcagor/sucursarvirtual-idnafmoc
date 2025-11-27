import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RightsVerifyInterface } from "domain/models";

interface SapRightsState {
  rights: RightsVerifyInterface | undefined;
}

const initialState: SapRightsState = {
  rights: {
    Bp: undefined,
    TitularNumeroDocumento: undefined,
    TitularTipoDocumento: undefined,
    TitularFechaInicioVigencia: undefined,
    TitularPrimerNombre: undefined,
    TitularSegundoNombre: undefined,
    TitularPrimerApellido: undefined,
    TitularSegundoApellido: undefined,
    TitularFechaNacimiento: undefined,
    TitularGrupoAfiliado: undefined,
    TitularEstado: undefined,
    TitularEstadoMotivo: undefined,
    TitularGenero: undefined,
    TitularEstadoCivil: undefined,
    TitularEdad: undefined,
    TipoTrabajador: undefined,
    Desc_mod_aporte: undefined,
    TitularCategoriaSalarial: undefined,
    ValorSalario: undefined,
    pacs: undefined,
    empleadores: undefined
  },
};

const sapRightsSlice = createSlice({
  name: "sapRights",
  initialState,
  reducers: {
    setSapRightsState(
      state,
      action: PayloadAction<RightsVerifyInterface | undefined>
    ) {
      state.rights = action.payload;
    },
  },
});

export const { setSapRightsState } = sapRightsSlice.actions;

export default sapRightsSlice.reducer;
