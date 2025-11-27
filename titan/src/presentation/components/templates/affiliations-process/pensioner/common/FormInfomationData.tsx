"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { City } from "domain/models";
import GetCityUseCase from "domain/usecases/city/getCity.use.case";
import GetDepartmentUseCase from "domain/usecases/department/getDepartment.use.case";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import {
  ACADEMIC_LEVEL,
  CIVIL_STATUS,
  EMAIL_REGEX,
  ETNICHITY,
  GENDER,
  SEXUAL_PREFERENCE,
  VULNERABILITY_FACT,
} from "lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  CardText,
  CustomInputGray,
  CustomSelectFormFixed,
  SectionSeparator,
  Spinner,
} from "presentation/components/atoms";
import { usePensionerAffiliations } from "presentation/hooks";
import { useAppSelector } from "presentation/store";
import React, { useCallback, useEffect, useState } from "react";
import { ModalAdress } from "../components";
import GetReserveUseCase from "domain/usecases/reserve/getReserve.use.case";
import GetCommunityUseCase from "domain/usecases/community/getCommunity.use.case";

type SelectOption = {
  label: string;
  value: string;
};

const fieldsRequired = [
  {
    name: "civil_status",
    label: "El estado civil es requerido",
  },
  {
    name: "nationality",
    label: "La nacionalidad es requerida",
  },
  {
    name: "gender",
    label: "El género es requerido",
  },
  {
    name: "sexual_preference",
    label: "La orientación sexual es requerida",
  },
  {
    name: "academic_level",
    label: "El nivel de escolaridad es requerido",
  },
  {
    name: "vulnerability_fact",
    label: "El factor de vulnerabilidad es requerido",
  },
  {
    name: "ethnic_affiliation",
    label: "La pertenencia étnica es requerida",
  },
  {
    name: "department",
    label: "El departamento es requerido",
  },
  {
    name: "city",
    label: "La ciudad es requerida",
  },
  {
    name: "email",
    label: "El e-mail es requerido",
  },
  {
    name: "address",
    label: "La dirección es requerida",
  },
  {
    name: "phone",
    label: "El número de celular es requerido",
  },
];

const FormInfomationData = () => {
  // --- States
  const [showIndigenous, setShowIndigenous] = useState<boolean>(false);
  const [isLoadingNextStep, setIsLoadingNextStep] = useState(false);
  const [reserveOptions, setReserveOptions] = useState<SelectOption[]>([]);
  const [communityOptions, setCommunityOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nationalityOptions, setNationalityOptions] = useState<SelectOption[]>(
    []
  );
  const [openModalAddress, setOpenModalAddress] = useState(false);
  const [deparamentOptions, setDeparamentOptions] = useState<SelectOption[]>(
    []
  );
  const [cities, setCities] = useState<City[]>([]);
  const [cityOptions, setCityOptions] = useState<SelectOption[]>([]);
  const [selectedValues, setSelectedValues] = useState<{
    civil_status: SelectOption | null;
    nationality: SelectOption | null;
    gender: SelectOption | null;
    sexual_preference: SelectOption | null;
    academic_level: SelectOption | null;
    vulnerability_fact: SelectOption | null;
    ethnic_affiliation: SelectOption | null;
    reserve: SelectOption | null;
    community: SelectOption | null;
    department: SelectOption | null;
    city: SelectOption | null;
    email: string;
    phone: string;
    address: string;
  }>({
    civil_status: null,
    nationality: null,
    gender: null,
    sexual_preference: null,
    academic_level: null,
    vulnerability_fact: null,
    ethnic_affiliation: null,
    reserve: null,
    community: null,
    department: null,
    city: null,
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const router = useRouter();
  const { data: session } = useSession();
  const data = useAppSelector((state) => state.pensionerAffiliations);
  const { saveInformationData } = usePensionerAffiliations();

  // --- UseCases
  const getDepartmentUseCase = appContainer.get<GetDepartmentUseCase>(
    USECASES_TYPES._GetDepartmentUseCase
  );
  const getCityUseCase = appContainer.get<GetCityUseCase>(
    USECASES_TYPES._GetCityUseCase
  );
  const getOptionsUseCase = appContainer.get<GetOptionsUseCase>(
    USECASES_TYPES._GetOptionsUseCase
  );
  const getReserveUseCase = appContainer.get<GetReserveUseCase>(
    USECASES_TYPES._GetReserveUseCase
  );
  const getCommunityUseCase = appContainer.get<GetCommunityUseCase>(
    USECASES_TYPES._GetCommunityUseCase
  );

  // --- Handlers
  const validateEmail = (email: string) => {
    const emailRegex = EMAIL_REGEX;
    return emailRegex.test(email);
  };

  const handleNextStep = () => {
    if (isLoadingNextStep) return;
    setIsLoadingNextStep(true);
    try {
      const errorLoad = { ...errors };
      let validateFields = [...fieldsRequired];
      if (showIndigenous) {
        validateFields.push({
          name: "reserve",
          label: "El resguardo es requerido",
        });
        validateFields.push({
          name: "community",
          label: "La comunidad es requerida",
        });
      }
      validateFields.forEach((field) => {
        if (
          typeof selectedValues[field.name as keyof typeof selectedValues] ==
          "string"
        ) {
          if (selectedValues[field.name as keyof typeof selectedValues] == "") {
            errorLoad[field.name as keyof typeof errorLoad] = field.label;
          }
        } else if (
          selectedValues[field.name as keyof typeof selectedValues] == null
        ) {
          errorLoad[field.name as keyof typeof errorLoad] = field.label;
        }
      });

      // Validar el correo electrónico si todos los campos requeridos están llenos
      if (Object.values(errorLoad).every((error) => error === "")) {
        if (!validateEmail(selectedValues.email)) {
          errorLoad.email = "El formato del correo electrónico no es válido";
        }
      }

      // Validar que el número de celular tenga 10 dígitos y empiece por 3
      if (Object.values(errorLoad).every((error) => error === "")) {
        if (selectedValues.phone.length !== 10) {
          errorLoad.phone = "El número de celular debe tener 10 dígitos";
        }
        if (!selectedValues.phone.startsWith("3")) {
          errorLoad.phone = "El número de celular debe empezar por 3";
        }
      }

      setErrors(errorLoad);
      if (Object.values(errorLoad).every((error) => error === "")) {
        const informationData = {
          civil_status: selectedValues.civil_status,
          nationality: selectedValues.nationality,
          gender: selectedValues.gender,
          sexual_preference: selectedValues.sexual_preference,
          academic_level: selectedValues.academic_level,
          vulnerability_fact: selectedValues.vulnerability_fact,
          ethnic_affiliation: selectedValues.ethnic_affiliation,
          reserve: selectedValues.reserve,
          community: selectedValues.community,
          department: selectedValues.department,
          city: selectedValues.city,
        };
        saveInformationData(informationData, {
          email: selectedValues.email,
          phone: selectedValues.phone,
        });
        router.push(data.flow_url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingNextStep(false);
    }
  };

  const handleError = (
    value: string,
    name: string,
    clean_indigenous: boolean = false
  ) => {
    const errorLoad = { ...errors };
    if (clean_indigenous) {
      errorLoad.reserve = "";
      errorLoad.community = "";
    }
    errorLoad[name as keyof typeof errorLoad] = value;
    setErrors(errorLoad);
  };

  const handleOpenModalAddress = (value: boolean) => {
    setOpenModalAddress(value);
  };

  const handleChange = (value: SelectOption, name: string) => {
    let resetCity = false;
    let cleanIndigenous = false;
    if (name == "ethnic_affiliation") {
      if (value.value == "3") {
        setShowIndigenous(true);
      } else {
        setShowIndigenous(false);
        cleanIndigenous = true;
      }
    }
    if (name == "department") {
      const citiesByDepartment = cities.filter(
        (city) => city.departmentId === Number(value.value.split("|")[0])
      );
      setCityOptions(
        citiesByDepartment.map((city) => ({
          label: city.name,
          value: city.code.toString(),
        }))
      );
      resetCity = true;
    }
    const cityDefault = resetCity ? { city: null } : {};
    handleError("", name, cleanIndigenous);
    setSelectedValues({ ...selectedValues, [name]: value, ...cityDefault });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === "email") {
      value = value.toLowerCase();
    }
    handleError("", e.target.name);
    setSelectedValues({ ...selectedValues, [e.target.name]: value });
  };

  // --- Initializers

  const loadDependencyData = useCallback(async () => {
    try {
      if (!data.isStarted) {
        router.push("/menu-affiliations");
        return;
      }
      const responseOptions = await getOptionsUseCase.execute(
        session?.access_token
      );
      const response = await getDepartmentUseCase.execute(
        session?.access_token
      );
      const responseCities = await getCityUseCase.execute(
        session?.access_token
      );
      const responseReserve = await getReserveUseCase.execute(
        session?.access_token
      );
      const responseCommunity = await getCommunityUseCase.execute(
        session?.access_token
      );
      if (response) {
        setDeparamentOptions(
          response.map((department) => ({
            label: department.name,
            value: `${department.id.toString()}|${department.code.toString()}`,
          }))
        );
      }
      if (responseCities) {
        setCities(responseCities);
        const citiesByDepartment = responseCities.filter(
          (city) =>
            city.departmentId ===
            Number(data.informationData.department?.value.split("|")[0])
        );
        setCityOptions(
          citiesByDepartment.map((city) => ({
            label: city.name,
            value: city.code.toString(),
          }))
        );
      }
      if (responseOptions) {
        setNationalityOptions(
          responseOptions.nationality.map((nationality) => ({
            label: nationality.name,
            value: nationality.code,
          }))
        );
      }
      if (responseReserve) {
        setReserveOptions(
          responseReserve.map((reserve) => ({
            label: reserve.name,
            value: reserve.code.toString(),
          }))
        );
      }
      if (responseCommunity) {
        setCommunityOptions(
          responseCommunity.map((community) => ({
            label: community.name,
            value: community.code.toString(),
          }))
        );
      }
      setSelectedValues({
        civil_status: data.informationData.civil_status,
        nationality: data.informationData.nationality,
        gender: data.informationData.gender,
        sexual_preference: data.informationData.sexual_preference,
        academic_level: data.informationData.academic_level,
        vulnerability_fact: data.informationData.vulnerability_fact,
        ethnic_affiliation: data.informationData.ethnic_affiliation,
        reserve: data.informationData.reserve,
        community: data.informationData.community,
        department: data.informationData.department,
        city: data.informationData.city,
        email: data.contactData.email,
        phone: data.contactData.phone,
        address: data.address.address,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDependencyData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-12 mb-12">
          <CardText
            text="Afiliaciones / afiliación pensionado"
            className="text-principal-180 text-2xl"
          />
          <MainTitle text="Afiliación pensionado" />
          <SectionSeparator />
        </div>
        <div className="w-full flex flex-col gap-12">
          {data.flow_type == "pensioner-aportant" && (
            <React.Fragment>
              <div className="w-full max-w-[785px] flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 border-2 border-principal-180 rounded-full flex items-center justify-center">
                    <h4 className="text-principal-180 text-sm font-semibold">
                      1
                    </h4>
                  </div>
                  <h2 className="text-principal-180 text-2xl font-semibold">
                    Datos de la entidad
                  </h2>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex gap-4 w-full">
                    <CustomInputGray
                      title="Tipo de documento*"
                      classNameContainer="w-96"
                      value="NIT"
                      disabled
                    />
                    <CustomInputGray
                      title="Número de documento*"
                      classNameContainer="w-96"
                      value={data.entity.Nit}
                      disabled
                    />
                  </div>
                  <CustomInputGray
                    title="Razón social*"
                    classNameContainer="w-full"
                    value={data.entity.RazonSocial}
                    disabled
                  />
                </div>
              </div>
              <SectionSeparator />
            </React.Fragment>
          )}
          <div className="w-full max-w-[785px] flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 border-2 border-principal-180 rounded-full flex items-center justify-center">
                <h4 className="text-principal-180 text-sm font-semibold">
                  {data.flow_type == "pensioner-aportant" ? "2" : "1"}
                </h4>
              </div>
              <h2 className="text-principal-180 text-2xl font-semibold">
                Datos del afiliado
              </h2>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-4 w-full">
                <CustomInputGray
                  title="Tipo de identificación*"
                  classNameContainer="w-96"
                  value={data.identificationType}
                  disabled
                />
                <CustomInputGray
                  title="Número de identificación*"
                  classNameContainer="w-96"
                  value={data.identificationNumber}
                  disabled
                />
              </div>
              <div className="flex gap-4 w-full">
                <CustomInputGray
                  title="Primer nombre*"
                  classNameContainer="w-96"
                  value={data.dataAffiliation.f_name}
                  disabled
                />
                <CustomInputGray
                  title="Segundo nombre*"
                  classNameContainer="w-96"
                  value={data.dataAffiliation.s_name}
                  disabled
                />
              </div>
              <div className="flex gap-4 w-full">
                <CustomInputGray
                  title="Primer apellido*"
                  classNameContainer="w-96"
                  value={data.dataAffiliation.f_last_name}
                  disabled
                />
                <CustomInputGray
                  title="Segundo apellido*"
                  classNameContainer="w-96"
                  value={data.dataAffiliation.s_last_name}
                  disabled
                />
              </div>
              <div className="flex gap-4 w-full">
                <CustomInputGray
                  title="Fecha de Nacimiento*"
                  classNameContainer="w-96"
                  type="date"
                  value={data.dataAffiliation.birth_date}
                  disabled
                />
                <CustomSelectFormFixed
                  className="w-96"
                  setValue={() => {}}
                  title="Estado civil*"
                  placeholder="Selecciona un tipo de estado civil"
                  options={CIVIL_STATUS}
                  onChange={(value) => handleChange(value, "civil_status")}
                  value={selectedValues.civil_status}
                  errors={
                    <p className="text-principal-500">{errors.civil_status}</p>
                  }
                />
              </div>
              <div className="flex gap-4 w-full">
                <CustomSelectFormFixed
                  className="w-96"
                  setValue={() => {}}
                  title="Nacionalidad*"
                  placeholder="Selecciona una nacionalidad"
                  options={nationalityOptions}
                  onChange={(value) => handleChange(value, "nationality")}
                  value={selectedValues.nationality}
                  errors={
                    <p className="text-principal-500">{errors.nationality}</p>
                  }
                />
                <CustomSelectFormFixed
                  className="w-96"
                  setValue={() => {}}
                  title="Género*"
                  placeholder="Selecciona un tipo de género"
                  options={GENDER}
                  onChange={(value) => handleChange(value, "gender")}
                  value={selectedValues.gender}
                  errors={<p className="text-principal-500">{errors.gender}</p>}
                />
              </div>
              <div className="flex gap-4 w-full">
                <CustomSelectFormFixed
                  className="w-96"
                  setValue={() => {}}
                  title="Orientación sexual*"
                  placeholder="Selecciona una orientación sexual"
                  options={SEXUAL_PREFERENCE}
                  onChange={(value) => handleChange(value, "sexual_preference")}
                  value={selectedValues.sexual_preference}
                  errors={
                    <p className="text-principal-500">
                      {errors.sexual_preference}
                    </p>
                  }
                />
                <CustomSelectFormFixed
                  className="w-96"
                  setValue={() => {}}
                  title="Nivel de escolaridad*"
                  placeholder="Selecciona un nivel de escolaridad"
                  options={ACADEMIC_LEVEL}
                  onChange={(value) => handleChange(value, "academic_level")}
                  value={selectedValues.academic_level}
                  errors={
                    <p className="text-principal-500">
                      {errors.academic_level}
                    </p>
                  }
                />
              </div>
              <div className="flex gap-4 w-full">
                <CustomSelectFormFixed
                  className="w-96"
                  setValue={() => {}}
                  title="Factor de Vulnerabilidad*"
                  placeholder="Selecciona un factor de vulnerabilidad"
                  options={VULNERABILITY_FACT}
                  onChange={(value) =>
                    handleChange(value, "vulnerability_fact")
                  }
                  value={selectedValues.vulnerability_fact}
                  errors={
                    <p className="text-principal-500">
                      {errors.vulnerability_fact}
                    </p>
                  }
                />
                <CustomSelectFormFixed
                  className="w-96"
                  setValue={() => {}}
                  title="Pertenencia étnica*"
                  placeholder="Selecciona una pertenencia étnica"
                  options={ETNICHITY}
                  onChange={(value) =>
                    handleChange(value, "ethnic_affiliation")
                  }
                  value={selectedValues.ethnic_affiliation}
                  errors={
                    <p className="text-principal-500">
                      {errors.ethnic_affiliation}
                    </p>
                  }
                />
              </div>
              {showIndigenous && (
                <div className="flex gap-4 w-full">
                  <CustomSelectFormFixed
                    className="w-96"
                    setValue={() => {}}
                    title="Resguardo*"
                    placeholder="Selecciona un resguardo"
                    options={reserveOptions}
                    onChange={(value) => handleChange(value, "reserve")}
                    value={selectedValues.reserve}
                    errors={
                      <p className="text-principal-500">{errors.reserve}</p>
                    }
                  />
                  <CustomSelectFormFixed
                    className="w-96"
                    setValue={() => {}}
                    title="Comunidad*"
                    placeholder="Selecciona una comunidad"
                    options={communityOptions}
                    onChange={(value) => handleChange(value, "community")}
                    value={selectedValues.community}
                    errors={
                      <p className="text-principal-500">{errors.community}</p>
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <SectionSeparator />
          <div className="w-full max-w-[785px] flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 border-2 border-principal-180 rounded-full flex items-center justify-center">
                <h4 className="text-principal-180 text-sm font-semibold">
                  {data.flow_type == "pensioner-aportant" ? "3" : "2"}
                </h4>
              </div>
              <h2 className="text-principal-180 text-2xl font-semibold">
                Datos de Contacto
              </h2>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-4 w-full">
                <CustomSelectFormFixed
                  className="w-96"
                  setValue={() => {}}
                  title="Departamento"
                  placeholder="Selecciona un departamento"
                  options={deparamentOptions}
                  onChange={(value) => handleChange(value, "department")}
                  value={selectedValues.department}
                  errors={
                    <p className="text-principal-500">{errors.department}</p>
                  }
                />
                <CustomSelectFormFixed
                  className="w-96"
                  setValue={() => {}}
                  title="Ciudad"
                  placeholder="Selecciona una ciudad"
                  options={cityOptions}
                  onChange={(value) => handleChange(value, "city")}
                  value={selectedValues.city}
                  errors={<p className="text-principal-500">{errors.city}</p>}
                />
              </div>
              <div className="flex gap-4 w-full">
                <CustomInputGray
                  title="Dirección"
                  placeholder="ingresa la dirección"
                  onFocus={(e) => {
                    e.target.blur();
                    handleOpenModalAddress(true);
                  }}
                  classNameContainer="w-96"
                  borderColor="border-principal-330"
                  value={selectedValues.address}
                  name="address"
                  onChange={handleChangeInput}
                  errors={
                    errors.address ? (
                      <p className="text-principal-500">{errors.address}</p>
                    ) : (
                      ""
                    )
                  }
                  isCustomBorder
                />
                <CustomInputGray
                  title="E-mail*"
                  placeholder="ingresa el e-mail"
                  type="email"
                  classNameContainer="w-96"
                  borderColor="border-principal-330"
                  value={selectedValues.email}
                  name="email"
                  onChange={handleChangeInput}
                  errors={
                    errors.email ? (
                      <p className="text-principal-500">{errors.email}</p>
                    ) : (
                      ""
                    )
                  }
                  isCustomBorder
                />
              </div>
              <CustomInputGray
                title="Número de celular"
                placeholder="ingresa el número de celular"
                type="number"
                classNameContainer="w-96"
                borderColor="border-principal-330"
                value={selectedValues.phone}
                name="phone"
                maxLength={10}
                onChange={handleChangeInput}
                errors={
                  errors.phone ? (
                    <p className="text-principal-500">{errors.phone}</p>
                  ) : (
                    ""
                  )
                }
                isCustomBorder
              />
            </div>
          </div>
          <div className="max-w-[912px] flex items-center justify-between mb-10">
            <button
              className="text-principal-180 text-sm font-semibold"
              onClick={() =>
                router.push(
                  data.flow_type == "pensioner-aportant"
                    ? "/menu-affiliations/pensioner/pensioner-aportant/select-entity"
                    : "/menu-affiliations/pensioner/select-type-affiliations"
                )
              }
            >
              Atrás
            </button>
            <Button
              label={isLoadingNextStep ? "Cargando..." : "Siguiente"}
              disabled={isLoadingNextStep}
              primary
              primaryClass="bg-principal-700 text-principal-150 w-80 px-12 my-4"
              onClick={handleNextStep}
              removeWidth
            />
          </div>
        </div>
      </div>
      <ModalAdress
        openModal={openModalAddress}
        handleOpenModal={handleOpenModalAddress}
        handleSetAddress={setSelectedValues}
        handleError={handleError}
      />
    </>
  );
};

export default FormInfomationData;
