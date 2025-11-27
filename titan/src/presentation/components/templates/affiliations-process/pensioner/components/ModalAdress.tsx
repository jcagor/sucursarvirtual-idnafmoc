import {
  ADDRESS_TYPE_OPTIONS,
  LETTER_OPTIONS,
  OTHER_CHARACTERISTICS_OPTIONS,
  URBAN_NOMENCLATURE_OPTIONS,
  RURAL_NOMENCLATURE_OPTIONS,
  ZONE_OPTIONS,
} from "lib";
import {
  Button,
  CustomInputGray,
  CustomSelectFormFixed,
} from "presentation/components/atoms";
import { CustomModal } from "presentation/components/atoms/common/modals";
import { usePensionerAffiliations } from "presentation/hooks";
import { useAppSelector } from "presentation/store";
import React, { FC, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface Props {
  openModal: boolean;
  handleOpenModal: (value: boolean) => void;
  handleSetAddress: React.Dispatch<
    React.SetStateAction<{
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
    }>
  >;
  handleError: (value: string, name: string) => void;
}

type SelectOption = {
  label: string;
  value: string;
};

interface SelectedValues {
  address_type: SelectOption | null;
  nomenclature: SelectOption | null;
  only_number: string;
  letter: SelectOption | null;
  zone: SelectOption | null;
  only_number_2: string;
  letter_2: SelectOption | null;
  only_number_3: string;
  characteristics: SelectOption | null;
  free_text: string;
}

const fieldsRequired = [
  {
    name: "address_type",
    label: "El tipo de dirección es requerido",
  },
  {
    name: "nomenclature",
    label: "La nomenclatura es requerida",
  },
  {
    name: "only_number",
    label: "El número es requerido",
  },
  {
    name: "only_number_2",
    label: "El número es requerido",
  },
  {
    name: "only_number_3",
    label: "El número es requerido",
  },
];

const fieldsRequiredUrban = [
  {
    name: "nomenclature",
    label: "La nomenclatura es requerida",
  },
  {
    name: "free_text",
    label: "La indicación especial es requerida",
  },
];

const fieldsRequiredEmpty = [
  {
    name: "address_type",
    label: "El tipo de dirección es requerido",
  },
];

const errorsInitial = {
  address_type: "",
  nomenclature: "",
  only_number: "",
  letter: "",
  zone: "",
  only_number_2: "",
  letter_2: "",
  only_number_3: "",
  characteristics: "",
  free_text: "",
};

const selectedValuesInitial = {
  address_type: null,
  nomenclature: null,
  only_number: "",
  letter: null,
  zone: null,
  only_number_2: "",
  letter_2: null,
  only_number_3: "",
  characteristics: null,
  free_text: "",
};

const ModalAdress: FC<Props> = ({
  openModal,
  handleOpenModal,
  handleSetAddress,
  handleError,
}) => {
  const data = useAppSelector((state) => state.pensionerAffiliations);
  const [selectedValues, setSelectedValues] = useState<SelectedValues>(
    selectedValuesInitial
  );

  const [errors, setErrors] = useState<{
    address_type: string;
    nomenclature: string;
    only_number: string;
    letter: string;
    zone: string;
    only_number_2: string;
    letter_2: string;
    only_number_3: string;
    characteristics: string;
    free_text: string;
  }>(errorsInitial);

  const [sectorOptions, setSectorOptions] = useState<SelectOption[]>(
    URBAN_NOMENCLATURE_OPTIONS
  );

  const { saveFullAddress } = usePensionerAffiliations();

  const handleChangeSelect = (value: SelectOption, name: string) => {
    let is_clean_errors = false;
    setSelectedValues({ ...selectedValues, [name]: value });

    if (name === "address_type") {
      if (value?.value === "SECTOR_URBANO") {
        setSectorOptions(URBAN_NOMENCLATURE_OPTIONS);
      } else {
        setSectorOptions(RURAL_NOMENCLATURE_OPTIONS);
      }
      is_clean_errors = true;
    }
    setErrors(is_clean_errors ? errorsInitial : { ...errors, [name]: "" });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({ ...errors, [e.target.name]: "" });

    if (e.target.name === "free_text") {
      // Remove special characters and convert to uppercase
      const sanitizedValue = e.target.value
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .toUpperCase()
        .slice(0, 50);

      setSelectedValues({ ...selectedValues, [e.target.name]: sanitizedValue });
      return;
    }
    if (e.target.name.includes("only_number")) {
      const sanitizedValue = e.target.value.replace(/\D/g, "").slice(0, 3);
      setSelectedValues({ ...selectedValues, [e.target.name]: sanitizedValue });
      return;
    }
    setSelectedValues({ ...selectedValues, [e.target.name]: e.target.value });
  };

  const handleValidateFields = () => {
    const errorLoad = { ...errors };
    console.log(selectedValues.address_type?.value);
    if (selectedValues.address_type?.value === "SECTOR_URBANO") {
      fieldsRequired.forEach((field) => {
        if (
          typeof selectedValues[field.name as keyof typeof selectedValues] ===
          "string"
        ) {
          if (
            selectedValues[field.name as keyof typeof selectedValues] === ""
          ) {
            errorLoad[field.name as keyof typeof errorLoad] = field.label;
          }
        } else if (
          selectedValues[field.name as keyof typeof selectedValues] === null
        ) {
          errorLoad[field.name as keyof typeof errorLoad] = field.label;
        }
      });
    }

    if (selectedValues.address_type?.value === "SECTOR_RURAL") {
      fieldsRequiredUrban.forEach((field) => {
        if (
          typeof selectedValues[field.name as keyof typeof selectedValues] ===
          "string"
        ) {
          if (
            selectedValues[field.name as keyof typeof selectedValues] === ""
          ) {
            errorLoad[field.name as keyof typeof errorLoad] = field.label;
          }
        } else if (
          selectedValues[field.name as keyof typeof selectedValues] === null
        ) {
          errorLoad[field.name as keyof typeof errorLoad] = field.label;
        }
      });
    }

    if (selectedValues.address_type?.value === undefined) {
      fieldsRequiredEmpty.forEach((field) => {
        if (
          typeof selectedValues[field.name as keyof typeof selectedValues] ===
          "string"
        ) {
          if (
            selectedValues[field.name as keyof typeof selectedValues] === ""
          ) {
            errorLoad[field.name as keyof typeof errorLoad] = field.label;
          }
        } else if (
          selectedValues[field.name as keyof typeof selectedValues] === null
        ) {
          errorLoad[field.name as keyof typeof errorLoad] = field.label;
        }
      });
    }

    setErrors(errorLoad);
    return Object.values(errorLoad).every((error) => error === "");
  };

  const handleSaveAddress = () => {
    if (handleValidateFields()) {
      saveFullAddress({ ...selectedValues, address: formatAddress() });
      handleSetAddress((prev) => ({
        ...prev,
        address: formatAddress(),
      }));
      handleError("", "address");
      handleOpenModal(false);
    }
  };

  const formatAddress = () => {
    const parts = [];

    if (selectedValues.nomenclature?.value) {
      parts.push(selectedValues.nomenclature.value);
    }

    if (selectedValues.only_number) {
      parts.push(`${selectedValues.only_number}`);
    }

    if (selectedValues.letter?.value) {
      parts.push(selectedValues.letter.value);
    }

    if (selectedValues.only_number || selectedValues.letter?.value) {
      parts.push("#");
    }

    if (selectedValues.zone?.value) {
      parts.push(selectedValues.zone.value);
    }

    if (selectedValues.only_number_2) {
      parts.push(selectedValues.only_number_2);
    }

    if (selectedValues.letter_2?.value) {
      parts.push(selectedValues.letter_2.value);
    }

    if (selectedValues.only_number_2 || selectedValues.letter_2?.value) {
      parts.push("-");
    }

    if (selectedValues.only_number_3) {
      parts.push(selectedValues.only_number_3);
    }

    return parts.join(" ").replace(/\s+/g, " ").trim();
  };

  const handleCloseModal = () => {
    handleOpenModal(false);
    setErrors(errorsInitial);
    setSelectedValues(selectedValuesInitial);
  };

  useEffect(() => {
    setSelectedValues(data.address);
  }, [data.address, openModal]);

  return (
    <CustomModal
      key="modal-employability"
      open={openModal}
      setOpen={handleCloseModal}
      lock={true}
      containerClass="w-full max-w-6xl p-8"
    >
      <div className="w-full flex justify-end">
        <IoMdClose
          className="text-principal-180 text-2xl cursor-pointer hover:text-principal-100 transition-all duration-300"
          onClick={handleCloseModal}
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <h2 className="text-principal-180 font-semibold">
          Dirección del afiliado
        </h2>
        <div className="w-full flex items-center justify-between gap-4">
          <CustomSelectFormFixed
            className="w-full"
            setValue={() => {}}
            title="Tipo de dirección"
            placeholder="Selecciona un tipo de dirección"
            options={ADDRESS_TYPE_OPTIONS}
            onChange={(value) => handleChangeSelect(value, "address_type")}
            value={selectedValues.address_type}
            errors={
              errors.address_type && (
                <p className="text-principal-500">{errors.address_type}</p>
              )
            }
          />
          <CustomSelectFormFixed
            className="w-full"
            setValue={() => {}}
            title="Nomenclatura"
            placeholder="Selecciona una nomenclatura"
            options={sectorOptions}
            onChange={(value) => handleChangeSelect(value, "nomenclature")}
            value={selectedValues.nomenclature}
            errors={
              errors.nomenclature && (
                <p className="text-principal-500">{errors.nomenclature}</p>
              )
            }
          />
          <CustomInputGray
            classNameContainer="w-full"
            borderColor="border-principal-330"
            title="Número"
            placeholder="ingresa el número"
            name="only_number"
            onChange={handleChangeInput}
            value={selectedValues.only_number}
            isCustomBorder
            errors={
              errors.only_number && (
                <p className="text-principal-500">{errors.only_number}</p>
              )
            }
          />
          <CustomSelectFormFixed
            className="w-full"
            setValue={() => {}}
            title="Letra"
            placeholder="Selecciona una letra"
            options={LETTER_OPTIONS}
            onChange={(value) => handleChangeSelect(value, "letter")}
            value={selectedValues.letter}
            errors={
              errors.letter && (
                <p className="text-principal-500">{errors.letter}</p>
              )
            }
          />
        </div>
        <div className="w-full flex items-center justify-between gap-4">
          <CustomSelectFormFixed
            className="w-full"
            setValue={() => {}}
            title="Zona"
            placeholder="Selecciona una zona"
            options={ZONE_OPTIONS}
            onChange={(value) => handleChangeSelect(value, "zone")}
            value={selectedValues.zone}
            errors={
              errors.zone && <p className="text-principal-500">{errors.zone}</p>
            }
          />
          <CustomInputGray
            classNameContainer="w-full"
            borderColor="border-principal-330"
            title="Número"
            placeholder="ingresa el número"
            name="only_number_2"
            onChange={handleChangeInput}
            value={selectedValues.only_number_2}
            errors={
              errors.only_number_2 && (
                <p className="text-principal-500">{errors.only_number_2}</p>
              )
            }
            isCustomBorder
          />
          <CustomSelectFormFixed
            className="w-full"
            setValue={() => {}}
            title="Letra"
            placeholder="Selecciona una letra"
            options={LETTER_OPTIONS}
            onChange={(value) => handleChangeSelect(value, "letter_2")}
            value={selectedValues.letter_2}
            errors={
              errors.letter_2 && (
                <p className="text-principal-500">{errors.letter_2}</p>
              )
            }
          />
          <CustomInputGray
            classNameContainer="w-full"
            borderColor="border-principal-330"
            title="Número"
            placeholder="ingresa el número"
            name="only_number_3"
            onChange={handleChangeInput}
            value={selectedValues.only_number_3}
            errors={
              errors.only_number_3 && (
                <p className="text-principal-500">{errors.only_number_3}</p>
              )
            }
            isCustomBorder
          />
        </div>
        <CustomSelectFormFixed
          className="w-full"
          setValue={() => {}}
          title="Otras características"
          placeholder="Selecciona una característica"
          options={OTHER_CHARACTERISTICS_OPTIONS}
          onChange={(value) => handleChangeSelect(value, "characteristics")}
          value={selectedValues.characteristics}
          errors={
            errors.characteristics && (
              <p className="text-principal-500">{errors.characteristics}</p>
            )
          }
        />
        <CustomInputGray
          classNameContainer="w-full"
          borderColor="border-principal-330"
          title="Indicaciones especiales"
          placeholder="ingresa indicaciones especiales"
          name="free_text"
          onChange={handleChangeInput}
          value={selectedValues.free_text}
          errors={
            errors.free_text && (
              <p className="text-principal-500">{errors.free_text}</p>
            )
          }
        />
        <div className="w-full bg-principal-80 flex flex-col items-center justify-center gap-1 p-4 rounded-2xl">
          <h4 className="text-principal-150 font-light">
            Dirección Ingresada:
          </h4>
          <h1 className="text-principal-150 font-semibold">
            {formatAddress() || "No se ha ingresado dirección"}
          </h1>
        </div>
        <div className="w-full flex justify-end gap-4">
          <Button
            label="Guardar"
            primary
            primaryClass="bg-principal-700 text-principal-150 w-80 px-12"
            onClick={handleSaveAddress}
            removeWidth
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default ModalAdress;
