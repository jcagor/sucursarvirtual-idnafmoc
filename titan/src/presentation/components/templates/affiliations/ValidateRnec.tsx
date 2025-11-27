"use client";
import { Options } from "domain/models";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { SelectOption } from "lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  CardText,
  MainTitle,
  SectionSeparator,
} from "presentation/components/atoms";
import ModalRnec from "presentation/components/molecules/rnec/ModalRnec";
import { useRnec } from "presentation/hooks";
import { useAppSelector } from "presentation/store";
import { useEffect, useState } from "react";

const ValidateRnec = () => {
  const dataRnec = useAppSelector((state) => state.rnec);
  const { data: session } = useSession();
  const router = useRouter();
  // User data can be accessed if needed later

  // States
  const [documentTypes, setDocumentTypes] = useState<SelectOption[]>([]);
  const [selectedDocType, setSelectedDocType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, seterrors] = useState({
    documentType: "",
    documentNumber: "",
  });

  const { validateIdentityHandler, setDocumentDataHandler } = useRnec();

  // Get options use case
  const getOptionsUseCase = appContainer.get<GetOptionsUseCase>(
    USECASES_TYPES._GetOptionsUseCase
  );

  // Handlers

  const handleDocTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDocType(e.target.value);
    seterrors({
      ...errors,
      documentType: "",
    });
  };

  const handleDocNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(/\D/g, "");
    setDocumentNumber(value);
    seterrors({
      ...errors,
      documentNumber: "",
    });
  };

  const nextStep = async () => {
    const newErrors = {
      documentType: "",
      documentNumber: "",
    };

    if (!selectedDocType) {
      newErrors.documentType = "El tipo de documento es requerido";
    }
    if (!documentNumber) {
      newErrors.documentNumber = "El número de documento es requerido";
    }

    console.log(newErrors);

    seterrors(newErrors);

    // Si hay errores, no continues
    if (newErrors.documentType || newErrors.documentNumber) {
      return;
    }

    const findShorthand = documentTypes.find(
      (docType) => docType.value === selectedDocType
    );
    await validateIdentityHandler(
      session?.access_token || "",
      documentNumber,
      findShorthand?.shorthand || ""
    );
  };

  const handleConfirmData = () => {
    setDocumentDataHandler(selectedDocType, documentNumber);
    router.push("/menu-affiliations/affiliations/add-pacs");
  };

  const handleBack = () => {
    router.push("/menu-affiliations/affiliations");
  };

  useEffect(() => {
    const getOptions: () => Promise<void> = async () => {
      setLoading(true);
      try {
        const options: Options | undefined = await getOptionsUseCase.execute(
          session?.access_token
        );

        if (!options?.documentTypes) {
          return;
        }
        const documentTypesData = options.documentTypes
          .filter((docType) => docType.code)
          .sort((a, b) => a.name.localeCompare(b.name));

        const documentTypeOptions = documentTypesData.map(
          (documentTypeItem) => {
            return {
              value: documentTypeItem.code,
              label: documentTypeItem.name,
              shorthand: documentTypeItem.shorthand,
            };
          }
        );

        setDocumentTypes(documentTypeOptions);
        if (dataRnec.documentType && dataRnec.documentNumber) {
          setSelectedDocType(dataRnec.documentType);
          setDocumentNumber(dataRnec.documentNumber);
        }
      } catch (error) {
        console.error("Error fetching document types:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.access_token) {
      getOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-6 md:gap-12 mb-6 md:mb-12">
          <CardText
            text="Afiliaciones / agregar beneficiario"
            className="text-principal-180 text-xl md:text-2xl"
          />
          <MainTitle text="Agregar beneficiario" />
          <SectionSeparator />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-10 md:gap-20">
          <div className="w-full max-w-[912px] bg-principal-150 flex flex-col gap-6 md:gap-12 px-4 md:px-16 py-6 md:py-12 rounded-3xl shadow-lg">
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-principal-180 text-xl md:text-2xl font-semibold text-center">
                Para empezar ¿Cuál es el tipo y
              </h2>
              <h2 className="text-principal-180 text-xl md:text-2xl font-semibold text-center">
                número de identificación del beneficiario?
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full mb-6 md:mb-10">
              {loading ? (
                <div className="w-full flex justify-center items-center py-8">
                  <p>Cargando tipos de documento...</p>
                </div>
              ) : (
                <>
                  <div className="w-full md:w-96">
                    <label
                      htmlFor="docType"
                      className="block text-principal-180 text-sm font-medium mb-2"
                    >
                      Tipo de identificación
                    </label>
                    <select
                      id="docType"
                      className={`w-full p-3 bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.documentType === ""
                          ? "border-red-500 focus:ring-red-500"
                          : "border-principal-500 focus:ring-principal-500"
                      }`}
                      value={selectedDocType}
                      onChange={handleDocTypeChange}
                    >
                      <option value="">Seleccione tipo de documento</option>
                      {documentTypes.map((docType) => (
                        <option key={docType.value} value={docType.value}>
                          {docType.label}
                        </option>
                      ))}
                    </select>
                    {errors.documentType !== "" && (
                      <p className="text-principal-500 text-sm mt-1">
                        {errors.documentType}
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-96">
                    <label
                      htmlFor="docNumber"
                      className="block text-principal-180 text-sm font-medium mb-2"
                    >
                      Número de identificación
                    </label>
                    <input
                      id="docNumber"
                      type="text"
                      className={`w-full p-3 bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.documentNumber === ""
                          ? "border-red-500 focus:ring-red-500"
                          : "border-principal-500 focus:ring-principal-500"
                      }`}
                      value={documentNumber}
                      onChange={handleDocNumberChange}
                      placeholder="Ingrese el número de documento"
                      maxLength={10}
                    />
                    {errors.documentNumber !== "" && (
                      <p className="text-principal-500 text-sm mt-1">
                        {errors.documentNumber}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-full max-w-[912px] flex justify-between px-4 md:px-0">
            <Button
              label="Atrás"
              primary={false}
              className="w-full md:w-40"
              onClick={handleBack}
            />
            <Button
              label="Continuar"
              primary={true}
              className="w-full md:w-96"
              onClick={nextStep}
              disabled={loading}
            />
          </div>
        </div>
      </div>
      <ModalRnec
        url="/menu-affiliations/affiliations"
        handleContinue={handleConfirmData}
        showErrorMessage={true}
      />
    </>
  );
};

export default ValidateRnec;
