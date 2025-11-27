"use client"

import { FormCustomFileEntity, S3FileId } from "domain/models/tech-assistance-cert/techAssistanceForm";
import {
  CustomInputOne,
  DigitalSignatureCustom,
  DigitalSignaturePreview,
  FileDropZoneInput,
  NeutralBlackText,
} from "presentation/components/atoms";
import { ChangeEvent, useState } from "react";
import { ForeignSingPlaceholder } from "./ForeignSingPlaceholder";

interface SignCustomProps {
  readOnly?: boolean;
  signOneErrors?: boolean;
  signTwoErrors?: boolean;
  signOneReadOnly?: boolean;
  signTwoReadOnly?: boolean;
  signOneNameFieldName: string;
  signOneNameValue: string;
  signOneDocumentFieldName: string;
  signOneDocumentValue: string;
  signTwoNameFieldName: string;
  signTwoNameValue: string;
  signTwoDocumentFieldName: string;
  signTwoDocumentValue: string;
  signOneDropZoneFieldName: string;
  signTwoDropZoneFieldName: string;
  signOneDropZoneValue?: S3FileId | null;
  signTwoDropZoneValue?: S3FileId | null;
  signOneTitle: string;
  signTwoTitle: string;
  onChange: {
    // FORMIK change handler
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  handleFieldChange: (
    // FORMIK change field function
    field: string,
    value: ChangeEvent<HTMLInputElement> | globalThis.File[]
  ) => void;
}

export const DualSignForm = (props: SignCustomProps) => {
  const {
    signOneNameFieldName,
    signOneNameValue,
    signOneDocumentFieldName,
    signOneDocumentValue,
    signTwoNameFieldName,
    signTwoNameValue,
    signTwoDocumentFieldName,
    signTwoDocumentValue,
    signOneDropZoneFieldName,
    signTwoDropZoneFieldName,
    signOneDropZoneValue,
    signTwoDropZoneValue,
    signOneTitle,
    signTwoTitle,
    handleFieldChange,
    onChange,
    readOnly,
    signOneReadOnly,
    signTwoReadOnly,
    signOneErrors,
    signTwoErrors,
  } = props;

  //console.log("One", signOneDropZoneValue);
  //console.log("Two", signTwoDropZoneValue);

  const [editOne, setEditOne] = useState(false);
  const [editTwo, setEditTwo] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
      <div>
        {/**
        <FileDropZoneInput
          name={signOneDropZoneFieldName}
          maxFiles={1}
          multiple={false}
          simpleDesign={true}
          placeholder="Subir firma digital aquí"
          
        />
         */}
        <div>
          {signOneDropZoneValue && !editOne ? (
            <DigitalSignaturePreview
              imageDataString={signOneDropZoneValue}
              readOnly={readOnly || signOneReadOnly}
              handleEdit={() => {
                setEditOne(true);
              }}
            />
          ) : (
            <DigitalSignatureCustom
              onChange={(e: globalThis.File[]) => {
                handleFieldChange(signOneDropZoneFieldName, e);
              }}
            />
          )}
        </div>
        <div className="mt-[-5px]">
          <CustomInputOne
            readOnly={readOnly || signOneReadOnly}
            simpleInput={true}
            name={signOneNameFieldName}
            id={signOneNameFieldName}
            placeholder={"Nombre representante " + signOneTitle}
            type="text"
            value={signOneNameValue}
            onChange={onChange}
          />
        </div>
        <div className="mt-[-15px]">
          <CustomInputOne
            readOnly={readOnly || signOneReadOnly}
            simpleInput={true}
            name={signOneDocumentFieldName}
            id={signOneDocumentFieldName}
            placeholder={"Documento representante " + signOneTitle}
            type="text"
            value={signOneDocumentValue}
            onChange={onChange}
          />
        </div>
        {signOneErrors ? (
          <NeutralBlackText
            text={"Verifica la información de la firma"}
            className="text-principal-500"
          ></NeutralBlackText>
        ) : (
          <></>
        )}
      </div>

      { signTwoReadOnly ? <ForeignSingPlaceholder message="Espacio reservado para firma de la empresa." /> : (
        <div>
        <div>
          {signTwoDropZoneValue && !editTwo ? (
            <DigitalSignaturePreview
              imageDataString={signTwoDropZoneValue}
              readOnly={readOnly || signTwoReadOnly}
              handleEdit={() => {
                setEditTwo(true);
              }}
            />
          ) : (
            <DigitalSignatureCustom
              onChange={(e: globalThis.File[]) => {
                handleFieldChange(signTwoDropZoneFieldName, e);
              }}
            />
          )}
        </div>
        {/**
        <FileDropZoneInput
          name={signTwoDropZoneFieldName}
          maxFiles={1}
          multiple={false}
          simpleDesign={true}
          placeholder="Subir firma digital aquí"
          onChange={(e:globalThis.File[])=>{handleFieldChange(signTwoDropZoneFieldName, e)}}
        />
         */}
        <div className="mt-[-5px]">
          <CustomInputOne
            readOnly={readOnly || signTwoReadOnly}
            simpleInput={true}
            name={signTwoNameFieldName}
            id={signTwoNameFieldName}
            placeholder={"Nombre representante " + signTwoTitle}
            type="text"
            value={signTwoNameValue}
            onChange={onChange}
          />
        </div>
        <div className="mt-[-15px]">
          <CustomInputOne
            readOnly={readOnly || signTwoReadOnly}
            simpleInput={true}
            name={signTwoDocumentFieldName}
            id={signTwoDocumentFieldName}
            placeholder={"Documento representante " + signTwoTitle}
            type="text"
            value={signTwoDocumentValue}
            onChange={onChange}
          />
        </div>
        {signTwoErrors ? (
          <NeutralBlackText
            text={"Verifica la información de la firma"}
            className="text-principal-500"
          ></NeutralBlackText>
        ) : (
          <></>
        )}
      </div>
      )

      }
      

    </div>
  );
};
