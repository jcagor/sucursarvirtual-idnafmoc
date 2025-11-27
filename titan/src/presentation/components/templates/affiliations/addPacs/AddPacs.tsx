"use client";
import {
  City,
  
  CreateForm,
  CreateRequest,
  Department,
  Empleadores,
  FormHeader,
  Options,
  RightsVerifyInterface,
  Status,
} from "domain/models";
import CreateRequestUseCase from "domain/usecases/request/createRequest.use.case";
import { FormikProps, isEmptyArray, useFormik } from "formik";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { jwtDecode } from "jwt-decode";
import {
  AUTH_LOADING_STATUS,
  AUTHENTICATED_STATUS,
  CALI_CITY_CODE,
  EMPLOYEE_OCCUPATION_CODE,
  FILED_STATUS,
  identificationTypeNomenclature,
  INDIGENOUS_ETNICHITY_CODE,
  KINDSHIP_SPOUCE_VALUE,
  KINDSHIP_STEPSON_VALUE,
  ONLY_NUMBERS_REGEXP,
  PARENTS_FATHER_KINDSHIP_CODE,
  PARENTS_KINDSHIP_CODE,
  PARENTS_MOTHER_KINDSHIP_CODE,
  SelectOption,
  SPOUSE_SAP_CODE,
  UserDataInterface,
  VALID_IDENTIFICATION_TYPES_CODES,
  VALLE_DEL_CAUCA_DEPARTMENT_CODE,
  DOCTYPE_KINSHIP,
  ALPHABETIC_SPACELESS_REGEXP,
  ALPHABETIC_SPACE_REGEXP,
  DOCUMENTS_NOT_ALLOWED,
  CIVIL_STATUS,
  BIOLOGIC_MOTHER_OR_FATHER_SAP_CODE,
  showLoadingAlert,
} from "lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  AlertIcon,
  Button,
  ButtonWithLoader,
  Divider,
  FiledLayout,
  FiledLayoutProps,
  ModalSecondTemplate,
  SecondaryText,
  useAppSelector,
} from "presentation";
import { UserCard } from "presentation/components/molecules/common/cards/UserCard";
import {
  AddPacsFiles,
  FormAddPacs,
  FormModuleOnePacsValuesType,
  FormSecondModulePacsValuesType,
  SpouceEmployeeFormValuesType,
} from "presentation/components/organisms/affiliations";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  ACADEMIC_LEVEL,
  CAMPAIGN_PAC_AFFILIATION_CODE,
  COLOMBIAN_DOCUMENT_TYPES,
  ETNICHITY,
  FILED_STATUS_FILED_CODE,
  GENDER,
  INDEPENDENT_CODE,
  KINDSHIP,
  OCUPATION,
  ONE_ANSWER,
  PENSIONER_25_CODE,
  PENSIONER_CODE,
  SALARY_TYPE,
  SEXUAL_PREFERENCE,
  VULNERABILITY_FACT,
} from "../../../../../lib/config/constants";
import { calculateAgeWithBornDate } from "lib/helpers/calculateAge";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import { DateObject } from "react-multi-date-picker";
import { getTitularNombreCompleto } from "lib/helpers/getFullNameBySap";

interface FileWithFlag {
  file: File;
  show: boolean;
  mandatory: boolean;
}
export const AddPacsComponent = () => {
  const dataRnec = useAppSelector((state) => state.rnec);
  // --- Data
  const sapRights = useAppSelector((state) => state.setsapRights);
  const title = `Añadir nuevo beneficiario`;

  const formikInitialValuesFormModuleOnePacs: FormModuleOnePacsValuesType &
    FormSecondModulePacsValuesType = {
    bornDate: undefined,
    document: "",
    documentType: "CO1C",
    kindship: "",
    firstName: "",
    secondName: "",
    firstLastName: "",
    secondLastName: "",
    gender: "",
    educationalLevel: "",
    disability: "",
    hasBothParents: "",
    residenceDepartment: "",
    residenceCity: "",
    sexualPreference: "",
    vulnerabilityFactor: "",
    ethnicity: "",
    shelter: "",
    village: "",
  };

  const formikInitialValuesSpouceEmployeeForm: SpouceEmployeeFormValuesType = {
    salaryType: "",
    salary: "",
    documentType: "CO1C",
    document: "",
    civilStatus: "",
    ocupation: "",
  };

  // --- UseStates
  const [documentTypeOption, setDocumentTypeOption] =
    useState<SelectOption[]>();
  const [departmentOptions, setDepartmentOptions] = useState<Department[]>();
  const [cityOptions, setCityOptions] = useState<City[]>();
  const [communityOptions, setCommunityOptions] = useState<SelectOption[]>();
  const [reserveOptions, setReserveOptions] = useState<SelectOption[]>();
  const [susResult, setSusResult] = useState<FiledLayoutProps>();
  const [authDefined, setAuthDefined] = useState<boolean>();
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [filesSelected, setFilesSelected] = useState<FileWithFlag[]>([
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HIJORegistroCivilNacimiento
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HIJODocumentoIdentidad
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HIJODeclaracionJuramentadaTrabajador
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //CONYUGEDocumentoIdentidad
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //CONYUGEDeclaracionJuramentadaDependenciaTrabajador
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //CONYUGECertificadoLaboral
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HERMANORegistroCivilHermano
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HERMANORegistroCivilTrabajador
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HERMANORegistroDefuncionPadre1
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HERMANORegistroDefuncionPadre2
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HERMANODeclaracionJuramentada
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HERMANODocumentoIdentidad
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //PADRERegistroCivilTrabajador
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //PADRECertificadoEPS
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //PADREDocumentoIdentidad
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //PADREDeclaracionNoPension
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HIJASTRORegistroCivilNacimiento
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HIJASTRODocumentoIdentidad
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HIJASTRODocumentoCustodia
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HIJASTRODeclaracionJuramentadaTrabajador
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //CertificadoDiscapacidad
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //DocumentoIdentidadExtranjeria
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [options, setOptions] = useState<Options>();

  // --- Validations
  const formModuleOnePacsSchema = Yup.object().shape({
    documentType: Yup.string()
      .required("Campo tipo documento obligatorio *")
      .oneOf(VALID_IDENTIFICATION_TYPES_CODES, "Tipo documento no válido")
      .test(
        "documentType",
        "Tipo de documento inválido para el parentesco",
        function (value) {
          const { documentType, kindship } = this.parent;
          if (DOCTYPE_KINSHIP[kindship]?.includes(documentType)) {
            return true;
          }
          return false;
        }
      ),

    document: Yup.string().when("documentType", (documentType, schema) => {
      const isColombian = new Set(COLOMBIAN_DOCUMENT_TYPES).has(
        documentType[0]
      );
      const minLength = 3;
      const maxLength = isColombian ? 10 : 15;

      return schema
        .required("Campo documento obligatorio *")
        .matches(ONLY_NUMBERS_REGEXP, "Campo solo debe ser numérico")
        .min(minLength, `Mínimo ${minLength} dígitos`)
        .max(maxLength, `Máximo ${maxLength} dígitos`);
    }),

    kindship: Yup.string().required("Campo parentezco obligatorio *"),

    disability: Yup.string().when("kindship", (kindship: string[], schema) => {
      if (kindship[0] === KINDSHIP_SPOUCE_VALUE) {
        return schema.notRequired();
      }
      return schema.required("Campo discapacidad obligatorio *");
    }),

    bornDate: Yup.string()
      .required("Campo fecha nacimiento obligatorio *")
      .test(
        "bornDate",
        "Por favor revisa la fecha de nacimiento, esta no coincide con el tipo de documento o parentezco",
        function (value) {
          const { bornDate, documentType, kindship, disability } = this.parent;
          const age = calculateAgeWithBornDate(bornDate);

          if (
            kindship === PARENTS_FATHER_KINDSHIP_CODE ||
            kindship === PARENTS_MOTHER_KINDSHIP_CODE
          ) {
            if (disability === "1") return true;
            return age >= 60;
          }

          switch (documentType) {
            case VALID_IDENTIFICATION_TYPES_CODES[7]:
              return age < 7;
            case VALID_IDENTIFICATION_TYPES_CODES[4]:
              return age >= 7 && age < 18;
            case VALID_IDENTIFICATION_TYPES_CODES[0]:
              return age >= 18;
            default:
              return true;
          }
        }
      ),

    firstName: Yup.string()
      .matches(
        ALPHABETIC_SPACELESS_REGEXP,
        "Formato de primer nombre no válido"
      )
      .min(2, "Mínimo 2 caracteres")
      .max(50, "Máximo 50 caracteres")
      .uppercase("Campo solo válido en mayúsculas.")
      .required("Campo primer nombre obligatorio"),

    secondName: Yup.string()
      .matches(ALPHABETIC_SPACE_REGEXP, "Formato de segundo nombre no válido")
      .min(2, "Mínimo 2 caracteres")
      .max(50, "Máximo 50 caracteres")
      .uppercase("Campo solo válido en mayúsculas."),

    firstLastName: Yup.string()
      .matches(
        ALPHABETIC_SPACELESS_REGEXP,
        "Formato de primer apellido no válido"
      )
      .min(2, "Mínimo 2 caracteres")
      .max(50, "Máximo 50 caracteres")
      .uppercase("Campo solo válido en mayúsculas.")
      .required("Campo primer apellido obligatorio"),

    secondLastName: Yup.string()
      .matches(ALPHABETIC_SPACE_REGEXP, "Formato de segundo apellido no válido")
      .min(2, "Mínimo 2 caracteres")
      .max(50, "Máximo 50 caracteres")
      .uppercase("Campo solo válido en mayúsculas."),

    gender: Yup.string().required("Campo género obligatorio"),
    educationalLevel: Yup.string().required(
      "Campo nivel educación obligatorio"
    ),

    hasBothParents: Yup.string().when(
      "kindship",
      (kindship: string[], schema) => {
        if (kindship[0] === KINDSHIP_STEPSON_VALUE) {
          return schema.required(
            "Campo ¿Cuenta con ambos padres en Registro Civil? obligatorio"
          );
        }
        return schema;
      }
    ),

    residenceDepartment: Yup.string().required(
      "Campo departamento obligatorio"
    ),
    residenceCity: Yup.string().required("Campo residencia obligatorio"),
    sexualPreference: Yup.string().required(
      "Campo preferencia sexual obligatorio"
    ),
    vulnerabilityFactor: Yup.string().required(
      "Campo factor de vulnerabilidad obligatorio"
    ),
    ethnicity: Yup.string().required("Campo pertenencia étnica obligatorio"),

    shelter: Yup.string().when("ethnicity", (ethnicity: string[], schema) => {
      if (ethnicity[0] === INDIGENOUS_ETNICHITY_CODE) {
        return schema.required("Campo resguardo obligatorio");
      }
      return schema;
    }),

    village: Yup.string().when("ethnicity", (ethnicity: string[], schema) => {
      if (ethnicity[0] === INDIGENOUS_ETNICHITY_CODE) {
        return schema.required("Campo población obligatorio");
      }
      return schema;
    }),
  });

  const formSpoucePacsSchema = Yup.object().shape({
    documentType: Yup.string().when(
      "kindship",
      (kindship: string[], schema) => {
        if (
          formikSpouceEmployeeForm.values.ocupation === EMPLOYEE_OCCUPATION_CODE
        ) {
          return schema.required("Campo tipo de documento obligatorio");
        }
        return schema;
      }
    ),

    document: Yup.string().when(
      ["ocupation", "documentType"],
      (values, schema) => {
        const [ocupation, documentType] = values;

        if (ocupation === EMPLOYEE_OCCUPATION_CODE) {
          const isColombian = COLOMBIAN_DOCUMENT_TYPES.has(documentType);
          const minLength = 3;
          const maxLength = isColombian ? 10 : 15;

          return schema
            .required("Campo documento obligatorio *")
            .matches(ONLY_NUMBERS_REGEXP, "Campo solo debe ser numérico")
            .min(minLength, `Mínimo ${minLength} dígitos`)
            .max(maxLength, `Máximo ${maxLength} dígitos`);
        }

        return schema;
      }
    ),

    salaryType: Yup.string().when("kindship", (kindship: string[], schema) => {
      if (
        formikSpouceEmployeeForm.values.ocupation === EMPLOYEE_OCCUPATION_CODE
      ) {
        return schema.required("Campo tipo de salario obligatorio*");
      }
      return schema;
    }),

    civilStatus: Yup.string().when("kindship", (kindship: string[], schema) => {
      if (
        formikSpouceEmployeeForm.values.ocupation === EMPLOYEE_OCCUPATION_CODE
      ) {
        return schema.required("Campo estado civil obligatorio");
      }
      return schema;
    }),

    ocupation: Yup.string().when("kindship", (kindship: string[], schema) => {
      if (
        formikSpouceEmployeeForm.values.ocupation === EMPLOYEE_OCCUPATION_CODE
      ) {
        return schema.required("Campo ocupación obligatorio");
      }
      return schema;
    }),

    salary: Yup.string().when("salaryType", (salaryType: string[], schema) => {
      if (
        formikSpouceEmployeeForm.values.ocupation === EMPLOYEE_OCCUPATION_CODE
      ) {
        return schema.required("Campo salario obligatorio");
      }
      return schema;
    }),
  });
  // --- Hooks
  const router = useRouter();

  const formikFormModuleOnePacs: FormikProps<
    FormModuleOnePacsValuesType & FormSecondModulePacsValuesType
  > = useFormik({
    initialValues: formikInitialValuesFormModuleOnePacs,
    onSubmit: (values) => {
      return;
    },
    validationSchema: formModuleOnePacsSchema,
  });

  const formikSpouceEmployeeForm: FormikProps<SpouceEmployeeFormValuesType> =
    useFormik({
      initialValues: formikInitialValuesSpouceEmployeeForm,
      validationSchema: formSpoucePacsSchema,
      onSubmit: (values) => {
        return;
      },
    });
  const { data: session, status } = useSession();
  const statusSession = status;

  // --- UseCases
  const createRequestUseCase = appContainer.get<CreateRequestUseCase>(
    USECASES_TYPES._CreateRequestUseCase
  );

  const getOptionsUseCase = appContainer.get<GetOptionsUseCase>(
    USECASES_TYPES._GetOptionsUseCase
  );

  const {
    identification_number,
    identification_type,
    email,
  } = jwtDecode(session?.access_token!) as UserDataInterface;

  // Methods

  const preloadDataOnFormik = () => {
    if (dataRnec.documentType && dataRnec.documentNumber) {
      formikFormModuleOnePacs.setFieldValue(
        "documentType",
        dataRnec.documentType,
        false
      );
      formikFormModuleOnePacs.setFieldValue(
        "document",
        dataRnec.documentNumber,
        false
      );
    }
    if (dataRnec.stateRnec === "SUCCESS") {
      formikFormModuleOnePacs.setFieldValue(
        "firstName",
        dataRnec.dataRnec?.primerNombre,
        false
      );
      formikFormModuleOnePacs.setFieldValue(
        "firstLastName",
        dataRnec.dataRnec?.primerApellido,
        false
      );
      formikFormModuleOnePacs.setFieldValue(
        "secondName",
        dataRnec.dataRnec?.segundoNombre,
        false
      );
      formikFormModuleOnePacs.setFieldValue(
        "secondLastName",
        dataRnec.dataRnec?.segundoApellido,
        false
      );
      if (dataRnec.dataRnec?.fechaNacimiento) {
        // Parse ISO date format (e.g., "2000-11-02T00:00:00.000Z")
        const fechaParts = dataRnec.dataRnec.fechaNacimiento
          .split("T")[0]
          .split("-");
        formikFormModuleOnePacs.setFieldValue(
          "bornDate",
          new DateObject({
            year: Number(fechaParts[0]),
            month: Number(fechaParts[1]),
            day: Number(fechaParts[2]),
          }),
          false
        );
      }
    }
  };

  const getOptions = async () => {
    const options = await getOptionsUseCase.execute(session?.access_token);

    if (!options) {
      return;
    }

    setOptions(options);
    let documentTypesData = options.documentTypes;
    let departments = options.department;
    const citiesData = options.city;
    const reserveData = options.reserve;
    const communityData = options.community;

    // Validate available options data

    if (
      !documentTypesData ||
      !departments ||
      !citiesData ||
      !communityData ||
      !reserveData
    ) {
      return;
    }

    // Sets options data
    documentTypesData = documentTypesData.filter(
      (val) => !DOCUMENTS_NOT_ALLOWED.includes(val.code)
    );
    documentTypesData = documentTypesData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const documentTypeOptionsMapped = documentTypesData.map(
      (documentTypeItem) => {
        return {
          value: documentTypeItem.code,
          label: documentTypeItem.name,
          shorthand: documentTypeItem.shorthand,
        };
      }
    );
    setDocumentTypeOption(documentTypeOptionsMapped);

    // Sort Departments
    const sortedDepartments = departments.sort((departmentA, departmentB) =>
      departmentA.code.toString() == VALLE_DEL_CAUCA_DEPARTMENT_CODE ? -1 : 0
    );
    setDepartmentOptions(sortedDepartments);

    const sortedCity = citiesData.sort((citiesDataA, citiesDataB) =>
      citiesDataA.code.toString() == CALI_CITY_CODE ? -1 : 0
    );
    setCityOptions(sortedCity);

    const reserveOptionsMapped: SelectOption[] = reserveData.map(
      (reserveItem) => {
        return {
          value: reserveItem.code.toString(),
          label: reserveItem.name,
        };
      }
    );
    setReserveOptions(reserveOptionsMapped);

    const communityOptionsMapped: SelectOption[] = communityData.map(
      (communityItem) => {
        return {
          value: communityItem.code.toString(),
          label: communityItem.name,
        };
      }
    );
    setCommunityOptions(communityOptionsMapped);
    setLoading(false);
  };
  const susProcess = async (verifyRightsResponse?: RightsVerifyInterface) => {
    //  Returns in case of no session
    if (!session || !session.access_token) {
      return;
    }

    // Find identificationType
    const titularIdentificationTypeNomenclature =
      identificationTypeNomenclature(identification_type ?? "");
    const pacIdentificationTypeNomenclature = identificationTypeNomenclature(
      formikFormModuleOnePacs.values.documentType ?? ""
    );
    const spouceIdentificationTypeNomenclature = identificationTypeNomenclature(
      formikSpouceEmployeeForm.values.documentType ?? ""
    );

    // Validates correct documenttypes setted
    if (
      !pacIdentificationTypeNomenclature ||
      !spouceIdentificationTypeNomenclature ||
      !titularIdentificationTypeNomenclature ||
      !verifyRightsResponse
    ) {
      // DEBUG
      // console.log(pacIdentificationTypeNomenclature);
      // console.log(spouceIdentificationTypeNomenclature);
      // console.log(titularIdentificationTypeNomenclature, ' ', storedWorkerToWithdrawal.workerDocumentType);
      return;
    }

    // Format "DD | MM | YYYY"
    const bornDate: string[] | undefined =
      formikFormModuleOnePacs.values.bornDate
        ?.toString()
        .replace(/ /g, "")
        .split("|");
    // Format "AAAAMMDD"
    const bornDateFormated = `${bornDate?.[2]}${bornDate?.[1]}${bornDate?.[0]}`;
    const todayDate = new Date();
    const todayFormat = `${todayDate.getFullYear()}${
      todayDate.getMonth() + 1 > 9
        ? todayDate.getMonth() + 1
        : `0${todayDate.getMonth() + 1}`
    }${
      todayDate.getDate() > 9 ? todayDate.getDate() : `0${todayDate.getDate()}`
    }`;
    // Create header for Radicate's Form
    const headerForm: FormHeader = {
      version: "0.0.1",
      template: "afiliacion-pacs",
    };

    // Company
    const company: Empleadores[] | undefined =
      verifyRightsResponse?.empleadores;

    if (!company) {
      return;
    }
    const principal = {
      "Tipo de documento": documentTypeOption?.find((values) => {
        return values.shorthand == identification_type;
      })?.label,
      "Numero de documento": identification_number,
      "Nombre Completo": getTitularNombreCompleto(sapRights.rights),
    };

    const relationship = {
      Parentesco: KINDSHIP.find(
        (values) => values.value == formikFormModuleOnePacs.values.kindship
      )?.label,
      "Fecha de nacimiento": bornDateFormated,
      "Tipo de documento": documentTypeOption?.find((values) => {
        return values.value == formikFormModuleOnePacs.values.documentType;
      })?.label,
      "Numero de documento": formikFormModuleOnePacs.values.document,
      Discapacidad: formikFormModuleOnePacs.values.disability
        ? ONE_ANSWER.find((values) => {
            return values.value == formikFormModuleOnePacs.values.disability;
          })?.label
        : "No",
    };

    const pacData = {
      "Primer Nombre": formikFormModuleOnePacs.values.firstName,
      "Segundo Nombre": formikFormModuleOnePacs.values.secondName,
      "Primer Apellido": formikFormModuleOnePacs.values.firstLastName,
      "Segundo Apellido": formikFormModuleOnePacs.values.secondLastName,
      Genero: GENDER.find((values) => {
        return values.value == formikFormModuleOnePacs.values.gender;
      })?.label,
      "Nivel de educación": ACADEMIC_LEVEL.find((values) => {
        return values.value == formikFormModuleOnePacs.values.educationalLevel;
      })?.label,
      "Ambos padres en Registro Civil": formikFormModuleOnePacs.values
        .hasBothParents
        ? ONE_ANSWER.find((values) => {
            return (
              values.value == formikFormModuleOnePacs.values.hasBothParents
            );
          })?.label
        : "No",
      "Departamento de residencia": departmentOptions!.find((values) => {
        return (
          values.code.toString() ==
          formikFormModuleOnePacs.values.residenceDepartment
        );
      })?.name,
      "Municipio de residencia": cityOptions!.find((values) => {
        return (
          values.code.toString() == formikFormModuleOnePacs.values.residenceCity
        );
      })?.name,
      "Preferencia sexual": SEXUAL_PREFERENCE.find((values) => {
        return values.value == formikFormModuleOnePacs.values.sexualPreference;
      })?.label,
      "Factor de vulnerabilidad": VULNERABILITY_FACT.find((values) => {
        return (
          values.value == formikFormModuleOnePacs.values.vulnerabilityFactor
        );
      })?.label,
      "Pertenencia étnica": ETNICHITY.find((values) => {
        return values.value == formikFormModuleOnePacs.values.ethnicity;
      })?.label,
      Resguardo: formikFormModuleOnePacs.values.shelter
        ? formikFormModuleOnePacs.values.shelter
        : "No",
      Población: formikFormModuleOnePacs.values.village
        ? formikFormModuleOnePacs.values.village
        : "No",
    };

    const spouceData = {
      "Tipo de salario": SALARY_TYPE.find((values) => {
        return values.value == formikSpouceEmployeeForm.values.salaryType;
      })?.label,
      "Salario declarado": formikSpouceEmployeeForm.values.salary,
      "Tipo de documento": documentTypeOption?.find((values) => {
        return values.value == formikSpouceEmployeeForm.values.documentType;
      })?.label,
      "Numero de documento": formikSpouceEmployeeForm.values.document,
      "Estado civil": CIVIL_STATUS.find((values) => {
        return values.value == formikSpouceEmployeeForm.values.civilStatus;
      })?.label,
      "Ocupacion conyugue": OCUPATION.find((values) => {
        return values.value == formikSpouceEmployeeForm.values.ocupation;
      })?.label,
    };

    const contentForm = {
      FechaVigenciaDesde: todayFormat,
      TipoAfiliado:
        verifyRightsResponse.TitularGrupoAfiliado == INDEPENDENT_CODE
          ? "4"
          : verifyRightsResponse.TitularGrupoAfiliado == PENSIONER_25_CODE ||
            verifyRightsResponse.TitularGrupoAfiliado == PENSIONER_CODE
          ? "1"
          : "",
      EntidadTipoDocumento: company[0]?.EmpleadorTipoDocumento ?? "",
      EntidadNumeroDocumento:
        company[0]?.EmpleadorNumeroDocumento?.replace("-", "") ?? "", // Eliminates de "-" concatenator of the verify digit,
      TitularTipoDocumento: titularIdentificationTypeNomenclature!,
      TitularNumeroDocumento: identification_number,
      TitularEstadoCivil: formikSpouceEmployeeForm.values.civilStatus
        ? formikSpouceEmployeeForm.values.civilStatus
        : verifyRightsResponse?.TitularEstadoCivil,
      PACDatosPersonaTipoDocumento:
        formikFormModuleOnePacs.values.documentType!,
      PACDatosPersonaNumeroDocumento: formikFormModuleOnePacs.values.document!,
      PACDatosPersonaPrimerApellido:
        formikFormModuleOnePacs.values.firstLastName!,
      PACDatosPersonaSegundoApellido:
        formikFormModuleOnePacs.values.secondLastName!,
      PACDatosPersonaPrimerNombre: formikFormModuleOnePacs.values.firstName!,
      PACDatosPersonaSegundoNombre: formikFormModuleOnePacs.values.secondName!,
      PACDatosPersonaGenero: formikFormModuleOnePacs.values.gender!,
      PACDatosPersonaEstadoCivil: formikSpouceEmployeeForm.values.civilStatus,
      PACDatosPersonaFechaNacimiento: bornDateFormated,
      PACParentesco:
        formikFormModuleOnePacs.values.kindship ==
          PARENTS_FATHER_KINDSHIP_CODE ||
        formikFormModuleOnePacs.values.kindship == PARENTS_MOTHER_KINDSHIP_CODE
          ? PARENTS_KINDSHIP_CODE
          : formikFormModuleOnePacs.values.kindship!,
      PACRecibeSubsidio: "X",
      PACPresentaDocEscolar: "X",
      PACEducacion: formikFormModuleOnePacs.values.educationalLevel!,
      PACDiscapacidad:
        formikFormModuleOnePacs.values.disability == "1" ? "X" : "",
      PACDatosPersonaOrientacionSexual:
        formikFormModuleOnePacs.values.sexualPreference,
      PACDatosPersonaFactorDeVulnerabilidad:
        formikFormModuleOnePacs.values.vulnerabilityFactor,
      PACDatosPersonaPertenenciaEtnica:
        formikFormModuleOnePacs.values.ethnicity,
      PACDatosPersonaResguardo: formikFormModuleOnePacs.values.shelter,
      PACDatosPersonaPuebloIndigena: formikFormModuleOnePacs.values.village,
    };
    // Create Radicate's Form
    const createForm: CreateForm = {
      header: headerForm,
      content: {
        sapData: contentForm,
        departamentoResidencia:
          formikFormModuleOnePacs.values.residenceDepartment,
        municipioResidencia: formikFormModuleOnePacs.values.residenceCity,

        informacionConyugue: {
          tipoSalario: formikSpouceEmployeeForm.values.salaryType,
          salario: formikSpouceEmployeeForm.values.salary,
          tipoDocumento: spouceIdentificationTypeNomenclature,
          numeroDocumento: formikSpouceEmployeeForm.values.document,
          estadoCivil: formikSpouceEmployeeForm.values.civilStatus,
          ocupacion: formikSpouceEmployeeForm.values.ocupation,
        },
        usuarioSolicitante: {
          nombre: getTitularNombreCompleto(sapRights.rights),
          correo: email,
        },
        userDocument: formikFormModuleOnePacs.values.document,
        userTypeDocument: pacIdentificationTypeNomenclature,
        userName:
          `${formikFormModuleOnePacs.values.firstName} ${formikFormModuleOnePacs.values.secondName} ${formikFormModuleOnePacs.values.firstLastName} ${formikFormModuleOnePacs.values.secondLastName}`.toUpperCase(),

        proof: [
          { "Informacion del titular": principal },
          { "Informacion del beneficiario": relationship },
          { "Datos del beneficiario": pacData },
          formikFormModuleOnePacs.values.kindship == KINDSHIP_SPOUCE_VALUE
            ? { "Datos del conyugue": spouceData }
            : "",
        ],
      },
    };

    let filesSelectedAux: File[] = [];
    const filesSelectedTemp: FileWithFlag[] = [...filesSelected];
    for (let index = 0; index < filesSelectedTemp.length; index++) {
      const element = filesSelectedTemp[index];
      filesSelectedAux.push(element.file);
    }

    // Create Radicate
    const requestData: CreateRequest = {
      statusRnec: dataRnec.stateRnec,
      statusId: FILED_STATUS_FILED_CODE,
      userDocument: identification_number,
      userTypeDocument: identification_type,
      userFullName: getTitularNombreCompleto(sapRights.rights),
      campaignId: CAMPAIGN_PAC_AFFILIATION_CODE.toString(),
      workflowId: "584e0042-ef41-43cd-a137-19b6b5e5d4be",
      referenceAcronym: "AFI",
      form: createForm,
    };

    const resultCreateRequestUseCase = await createRequestUseCase.execute(
      session?.access_token,
      requestData,
      filesSelectedAux
    );
    return resultCreateRequestUseCase;
  };
  const isMissingMandatoryFile = (files: FileWithFlag[]): boolean => {
    return files.some((file) => file.file.size === 0 && file.mandatory);
  };
  const hasFormErrors = async () => {
    const errorsForm1 = await formikFormModuleOnePacs.validateForm();
    const errorsForm2 = await formikSpouceEmployeeForm.validateForm();
    return (
      !isEmptyArray(Object.values(errorsForm1)) ||
      !isEmptyArray(Object.values(errorsForm2))
    );
  };
  const validateStepsonDependency = (
    //pasar a ria
    verifyRightsResponse?: RightsVerifyInterface
  ): boolean => {
    const isStepson =
      formikFormModuleOnePacs.values.kindship === KINDSHIP_STEPSON_VALUE;
    const hasSpouse = verifyRightsResponse?.pacs?.some(
      (pac) => pac.Parentesco === SPOUSE_SAP_CODE
    );
    if (isStepson && !hasSpouse) {
      formikFormModuleOnePacs.setFieldError(
        "kindship",
        "Para realizar afiliación de hijastro se debe realizar primero la afiliación de cónyuge"
      );
      return false;
    }
    return true;
  };

  const validateAlreadyAffiliated = (
    verifyRightsResponse?: RightsVerifyInterface
  ): boolean => {
    const { document, documentType } = formikFormModuleOnePacs.values;
    const existing = verifyRightsResponse?.pacs?.find(
      (pac) =>
        pac.PACNumeroDocumento == document &&
        pac.PACTipoDocumento === documentType
    );

    const isBiologicParent =
      existing?.Parentesco === BIOLOGIC_MOTHER_OR_FATHER_SAP_CODE;

    if (existing && !isBiologicParent) {
      formikFormModuleOnePacs.setFieldError(
        "document",
        "Esta persona ya se encuentra dentro de tus beneficiarios"
      );
      return false;
    }
    return true;
  };
  const validations = async (verifyRightsResponse?: RightsVerifyInterface) => {
    const filesWithDocument = filesSelected.filter((f) => f.show);

    if (isMissingMandatoryFile(filesWithDocument)) {
      setModalOpen(true);
      setModalMessage("Faltan documentos por subir");
      return false;
    }

    if (await hasFormErrors()) return false;
    if (!validateStepsonDependency(verifyRightsResponse)) return false;
    if (!validateAlreadyAffiliated(verifyRightsResponse)) return false;

    await formikFormModuleOnePacs.setFieldTouched("document");
    await formikFormModuleOnePacs.submitForm();
    await formikSpouceEmployeeForm.submitForm();

    return true;
  };
  const sendData = async () => {
    const filesSelectedTemp: FileWithFlag[] = [...filesSelected];

    const verifyRightsResponse: RightsVerifyInterface | undefined =
      sapRights.rights;
    // Execute and validate forms
    const validationsResult = await validations(verifyRightsResponse);

    if (!validationsResult) {
      return;
    }
    // generate radicate in SUS
    const susProcessResult: any | undefined = await susProcess(
      verifyRightsResponse
    );
    const result: FiledLayoutProps = {
      bodyMsg:
        susProcessResult?.message ===
        "Ya existe una solicitud registrada para este usuario."
          ? "Ya tienes una solicitud en curso."
          : "Solicitud creada con éxito.",
      isFail: false,
      radicate: susProcessResult,
    };
    if (susProcessResult) {
      //Tener en cuenta los radicados y el estado del mismo
      if (susProcessResult?.radicate?.radicate) {
        result.radicate = susProcessResult.radicate;
      } else {
        const status: Status = {
          id: susProcessResult.statusId!,
          name: FILED_STATUS[susProcessResult.statusId!],
          description: FILED_STATUS[susProcessResult.statusId!],
          type: 1,
          createdAt: "",
          updatedAt: "",
        };
        susProcessResult.status = status;
        result.radicate = susProcessResult;
      }
    } else {
      result.isFail = true;
    }
    setSusResult(result);
    setFilesSelected(filesSelectedTemp);
  };

  useEffect(() => {
    preloadDataOnFormik();
  }, [dataRnec]);

  // When not authenticated redirects to home
  useEffect(() => {
    if (statusSession == AUTH_LOADING_STATUS) {
      setAuthDefined(false);
      return;
    }
    setAuthDefined(true);
    if (!(statusSession == AUTHENTICATED_STATUS)) {
      router.push("affiliations");
    }
  }, [statusSession]);

  // Auto executed when render for first time
  useEffect(() => {
    // Loading
    setLoading(true);
    if (authDefined) {
      getOptions();
    }
  }, [authDefined]);

  const handleSubmit = async () => {
    // Mostrar alerta de carga
    showLoadingAlert("Cargando...", "Por favor espera");

    setLoadingButton(true);

    try {
      // Llamar a sendData y esperar su resolución
      await sendData();
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    } finally {
      // Cerrar la alerta después de que sendData haya terminado
      setLoadingButton(false);
      Swal.close(); // Aquí se cierra la alerta de carga globalmente
    }
  };

  useEffect(() => {
    if (formikFormModuleOnePacs.values.bornDate) {
      const age = calculateAgeWithBornDate(
        formikFormModuleOnePacs.values.bornDate
      );

      if (age > 7 && documentTypeOption) {
        const newDocumentTypeOption = documentTypeOption.filter(
          (doc) => doc.value !== identificationTypeNomenclature("P")
        );

        // Solo actualiza si hay una diferencia real
        const isDifferent =
          newDocumentTypeOption.length !== documentTypeOption.length;

        if (isDifferent) {
          setDocumentTypeOption(newDocumentTypeOption);
        }
      } else {
        getOptions();
      }
    }
  }, [formikFormModuleOnePacs.values.bornDate]);

  return (
    <form className="w-full h-full pr-20">
      {/* visible when aportant result is OK, shows form and modal */}
      {!loading && !(susResult != undefined) && (
        <section className={"w-[90%]"}>
          <Divider />
          <UserCard
            classname="mt-5"
            name={getTitularNombreCompleto(sapRights.rights)}
            document={`${identification_type} ${identification_number}`}
          />
          <div className="flex-row my-6">
            <SecondaryText
              className="text-[calc(16px)] font-bold text-principal-180 font-outfit"
              text={title}
            />
          </div>
          <FormAddPacs
            authDefined={authDefined ?? false}
            options={options!}
            formikFormModuleOnePacs={formikFormModuleOnePacs}
            formikSpouceEmployeeForm={formikSpouceEmployeeForm}
          />

          <AddPacsFiles
            filesSelected={filesSelected!}
            setFilesSelected={setFilesSelected}
            formikFormModuleOnePacs={formikFormModuleOnePacs}
            formikSpouceEmployeeForm={formikSpouceEmployeeForm}
          />
          <div className="flex flex-wrap flex-row pb-10">
            <div className="flex w-full justify-between pt-9">
              <button
                type="button"
                onClick={() => {
                  router.back();
                }}
                className="self-center flex w-1/5 cursor-pointer"
              >
                <SecondaryText
                  text="Atrás"
                  className="font-outfit text-[calc(20px)] font-normal text-principal-180"
                />
              </button>
              <div className="self-center flex w-1/5">
                <ButtonWithLoader
                  label="Afiliar"
                  primary={true}
                  onClick={handleSubmit}
                  className="rounded-full"
                  disable={loadingButton}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* When isn't loading and companySelected has not a valid status render this */}

      {/* Succes screen  */}
      {susResult != undefined && !loading && (
        <div className="h-full">
          <div className="h-[80%]">
            <FiledLayout
              radicate={susResult.radicate}
              bodyMsg={susResult.bodyMsg}
              isFail={susResult.isFail}
            />
          </div>

          <div className="flex w-full h-[20%] justify-end">
            <Button
              label="Ir a Radicados"
              primary={true}
              className="w-96 rounded-full mt-6"
              onClick={() => {
                router.push("/menu-affiliations/filed");
                // setOpenModal(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Error Modal when validate "individual to affiliate" */}

      {/* Loading bar */}
      {loading && (
        <div className="flex flex-wrap ">
          <div className="flex flex-wrap justify-self-center content-center w-64"></div>
        </div>
      )}

      {/* Modal for attach documents */}
      <ModalSecondTemplate
        isOpen={modalOpen}
        className="w-[calc(524px)]"
        onButtonClick={() => setModalOpen(false)}
      >
        <div className="flex flex-row justify-center">
          <AlertIcon className="top-4" />
          <p className="pt-16 text-lg font-poppins text-center text-principal-180">
            {modalMessage}
          </p>
        </div>
      </ModalSecondTemplate>
    </form>
  );
};
