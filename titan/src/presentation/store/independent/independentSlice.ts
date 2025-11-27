import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { independentForm } from "domain/models";

interface IndependentState {
  independentForm: independentForm | undefined;
}

const initialState: IndependentState = {
  independentForm: {
    ValorPension: undefined,
    ValorIngreso: undefined,
    TitularForeignNationality: undefined,
    tipoIndependiente: undefined,
    TipoIdentTrab: undefined,
    TipoIdentEntidad: undefined,
    TipoAfiliado: undefined,
    TelefonoFijo: undefined,
    TelefonoCel: undefined,
    Taxi: undefined,
    SubFP: undefined,
    SPCACTEcon: undefined,
    Sexo: undefined,
    Selection: undefined,
    SegundoApellido: undefined,
    Resguardo: undefined,
    PuebloIndigena: undefined,
    PrimerApellido: undefined,
    Pertenencia_Etnica: undefined,
    OtraCaja: undefined,
    OrientacionSexual: undefined,
    Ocupacion: undefined,
    NroIdentTrab: undefined,
    Nombre2: undefined,
    Nombre1: undefined,
    NivelEscolaridad: undefined,
    NIFEntidad: undefined,
    Nacionalidad: undefined,
    ForeignNationality: undefined,
    FechaPension: undefined,
    FechaNacimiento: undefined,
    FechaAporte: undefined,
    FactorVulnerabilidad: undefined,
    EstadoCivil: undefined,
    DireccionRestante: undefined,
    Direccion: undefined,
    DigitoVerifica: undefined,
    CorreoElectronico: undefined,
    CodigoDepartamento: undefined,
    CodigoCiudad: undefined,
    CodEPS: undefined,
    CategoriaAportante: undefined,
    CajaCompensacion: undefined,
  },
};

const independentSlice = createSlice({
  name: "independent",
  initialState,
  reducers: {
    setIndependentState(
      state,
      action: PayloadAction<independentForm | undefined>
    ) {
      state.independentForm = action.payload;
    },
  },
});

export const { setIndependentState } = independentSlice.actions;

export default independentSlice.reducer;
