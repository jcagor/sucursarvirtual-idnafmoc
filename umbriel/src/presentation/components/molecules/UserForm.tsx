import { FC } from "react";
import { CustomInputOne } from "../atoms/common/input";
import { CustomSelectOne } from "../atoms/common/select";
import { useFormik } from "formik";
import { UserFormValidations } from "@/domain/validations/users/formValidations";
import { Button, NumberCircle, SecondaryText } from "../atoms/common";
import { TertiaryTitle } from "@comfanditd/chronux-ui";

interface UserFormValues {
  documentType: string;
  documentNumber: string;
  email: string;
  name: string;
  companyDocumentType: string;
  companyDocumentNumber: string;
}

interface UserFormProps {
  onSubmit: (values: UserFormValues) => Promise<void>;
  disabled?: boolean;
}

export const UserForm: FC<UserFormProps> = ({ onSubmit, disabled = false }) => {
  const formik = useFormik<UserFormValues>({
    initialValues: {
      documentType: "",
      documentNumber: "",
      email: "",
      name: "",
      companyDocumentType: "",
      companyDocumentNumber: "",
    },
    validationSchema: UserFormValidations.getUserFormValidation(),
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  const documentTypeOptions = [
    { value: "CC", label: "Cédula de Ciudadanía" },
    { value: "CE", label: "Cédula de Extranjería" },
    { value: "NIT", label: "NIT" },
  ];

  return (
    <div className="w_full">
      <form onSubmit={formik.handleSubmit} className="flex flex-col">
        <div className="flex flex-row items-center my-4">
          <NumberCircle number={1} />
          <TertiaryTitle text="Información Personal" className="ml-3" />
        </div>
        <SecondaryText text="Completa tus datos personales" />

        <div className="w-full grid grid-cols-1 gap-6">
          <CustomSelectOne
            name="documentType"
            label="Tipo de Documento"
            options={documentTypeOptions}
            value={formik.values.documentType}
            onChange={formik.handleChange}
            errors={formik.touched.documentType && formik.errors.documentType}
            disabled={disabled}
          />

          <CustomInputOne
            name="documentNumber"
            title="Número de Documento"
            type="text"
            value={formik.values.documentNumber}
            onChange={formik.handleChange}
            errors={formik.touched.documentNumber && formik.errors.documentNumber}
            disabled={disabled}
          />

          <CustomInputOne
            name="email"
            title="Correo Electrónico"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            errors={formik.touched.email && formik.errors.email}
            disabled={disabled}
          />

          <CustomInputOne
            name="name"
            title="Nombre Completo"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            errors={formik.touched.name && formik.errors.name}
            disabled={disabled}
          />
        </div>

        <div className="flex flex-row items-center my-4 mt-8">
          <NumberCircle number={2} />
          <TertiaryTitle text="Información de la Empresa" className="ml-3" />
        </div>
        <SecondaryText text="Completa los datos de tu empresa" />

        <div className="w-full grid grid-cols-1 gap-6">
          <CustomSelectOne
            name="companyDocumentType"
            label="Tipo de Documento de la Empresa"
            options={documentTypeOptions}
            value={formik.values.companyDocumentType}
            onChange={formik.handleChange}
            errors={formik.touched.companyDocumentType && formik.errors.companyDocumentType}
            disabled={disabled}
          />

          <CustomInputOne
            name="companyDocumentNumber"
            title="Número de Documento de la Empresa"
            type="text"
            value={formik.values.companyDocumentNumber}
            onChange={formik.handleChange}
            errors={formik.touched.companyDocumentNumber && formik.errors.companyDocumentNumber}
            disabled={disabled}
          />
        </div>

        <Button
          type="submit"
          primary
          label="Registrar"
          className="w-56 xl:w-72 self-end my-6"
          isLoading={formik.isSubmitting}
          disabled={formik.isSubmitting || !formik.isValid || disabled}
        />
      </form>
    </div>
  );
}; 