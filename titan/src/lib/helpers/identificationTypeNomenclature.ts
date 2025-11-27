/**
 * This method allows to convert the identification type from SAP to normal or vice versa. Also allows to return the full document type name from SAP origin or common origin.
 * @param idType
 * @param fullDocumentTypeName
 * @returns
 */
export const identificationTypeNomenclature = (
  idType: string,
  fullDocumentTypeName?: boolean
): string | undefined => {
  if (!fullDocumentTypeName) {
    switch (idType) {
      // SAP TO NORMAL
      case "CO1C":
        return "CC";
      case "CO1D":
        return "CD";
      case "CO1E":
        return "CE";
      case "CO1P":
        return "P";
      case "CO1T":
        return "TI";
      case "CO1V":
        return "PEP";
      case "CO1Y":
        return "PPT";
      case "CO1L":
        return "RC";
      // NORMAL TO SAP
      case "CC":
        return "CO1C";
      case "CD":
        return "CO1D";
      case "CE":
        return "CO1E";
      case "P":
        return "CO1P";
      case "TI":
        return "CO1T";
      case "PEP":
        return "CO1V";
      case "PPT":
        return "CO1Y";
      case "RC":
        return "CO1L";
      default:
        break;
    }
  } else {
    switch (idType) {
      // SAP TO NORMAL
      case "CO1C":
        return "Cédula de Ciudadanía ";
      case "CO1D":
        return "Carnet Diplomático";
      case "CO1E":
        return "Cédula de Extranjería";
      case "CO1P":
        return "Pasaporte";
      case "CO1T":
        return "Tarjeta de Identidad";
      case "CO1V":
        return "Permiso Especial de Permanencia";
      case "CO1Y":
        return "Permiso por protección temporal";
      case "CO1L":
        return "Registro civil";
      case "CO1N":
        return "NIT";
      // NORMAL TO SAP
      case "CC":
        return "Cédula de Ciudadanía ";
      case "CD":
        return "Carnet Diplomático";
      case "CE":
        return "Cédula de Extranjería";
      case "P":
        return "Pasaporte";
      case "TI":
        return "Tarjeta de Identidad";
      case "PEP":
        return "Permiso Especial de Permanencia";
      case "PPT":
        return "Permiso por protección temporal";
      case "RC":
        return "Registro civil";
      case "NIT":
        return "CO1N";
      default:
        break;
    }
  }
};

export const VALID_IDENTIFICATION_TYPES_CODES = [
  "CO1C",
  "CO1D",
  "CO1E",
  "CO1P",
  "CO1T",
  "CO1V",
  "CO1Y",
  "CO1L",
];
