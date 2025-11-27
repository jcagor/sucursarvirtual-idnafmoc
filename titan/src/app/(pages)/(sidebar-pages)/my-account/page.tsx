"use client";
import {
  BubbleUser,
  InfoSection,
  MediumSubtitle,
  Paragraph,
  SmallSubtitle,
  TertiaryTitle,
  obtainUserInititals,
} from "@comfanditd/chronux-ui";
import Image from "next/image";
import { ActionCard } from "presentation/components/organisms/common/ActionCard";

import PhoneIcon from "public/icons/phone-icon.svg";
import EmailIcon from "public/icons/net-icon.svg";
import EditIcon from "public/icons/edit-icon.svg";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { EMPTY_USER, UserDataInterface, nameFormat } from "lib";
import { jwtDecode } from "jwt-decode";

export default function MyAccountPage() {
  const { data: session, update } = useSession();
  const [userData, setUserData] = useState<UserDataInterface>(EMPTY_USER);
  const [username, setUsername] = useState("CF");

  const {
    preferred_username,
    email,
    identification_number,
    identification_type,
    given_name,
    family_name,
  } = userData;

  useEffect(() => {
    // Revalida los datos del usuario cuando el token cambia
    if (session?.access_token) {
      try {
        // Decodificar el token para obtener los datos actualizados
        const decodedUserData = jwtDecode<UserDataInterface>(
          session.access_token
        );
        setUserData(decodedUserData);

        // Obtener iniciales del usuario
        const userInitials = obtainUserInititals(session.access_token);
        setUsername(userInitials);
      } catch (error) {
        console.error("Error decodificando el token", error);
      }
    }
  }, [update]);

  const editAccount = () => {
    window.open(process.env.NEXT_PUBLIC_MODIFY_DATA, "_blank");
  };

  return (
    <InfoSection
      topText="Configuración"
      description=""
      link={Link}
      image={Image}
      returnButton
      returnPath="/"
      mainTitle
    >
      <BubbleUser
        link={Link}
        userInitials={username}
        className="h-[80px] w-[80px] pl-[0.2rem]"
        textClassName="text-[2rem] text-principal-200 pointer-events-none pr-1"
        noLink={true}
      />
      <TertiaryTitle
        text={`${nameFormat(
          // given_name?.split(" ")[0] + " " + family_name?.split(" ")[0]
          given_name + " " + family_name
        )}`}
        className="mt-6 font-semibold"
      />
      <Paragraph
        text={`${identification_type} - ${identification_number}`}
        className="text-principal-350 mt-1"
      />

      {/* <SmallSubtitle
        text="Beneficiario"
        className="hidden md:block mt-1 font-normal"
      />
      <MediumSubtitle
        text="Beneficiario"
        className="md:hidden mt-1 font-normal block"
      /> */}

      <TertiaryTitle
        text="Gestiona tu información, la privacidad y la seguridad para mejorar tu experiencia"
        className="mt-8 font-semibold"
      />

      <div className="flex space-x-4 mt-3">
        <div className="flex">
          <Image alt="Phone image" src={PhoneIcon} width={14} height={14} />
          <SmallSubtitle
            text={`Teléfono: ${preferred_username}`}
            className="hidden md:block text-principal-350 ml-3"
          />
          <MediumSubtitle
            text={`Teléfono: ${preferred_username}`}
            className="md:hidden text-principal-350 ml-3"
          />
        </div>
        <div className="flex">
          <Image alt="E-mail image" src={EmailIcon} width={14} height={14} />
          <SmallSubtitle
            text={`Correo: ${email}`}
            className="hidden md:block text-principal-350 ml-3"
          />
          <MediumSubtitle
            text={`Correo: ${email}`}
            className="md:hidden text-principal-350 ml-3"
          />
        </div>
      </div>
      <ActionCard className="mt-8 mb-8" action={editAccount}>
        <Image
          src={EditIcon}
          alt="Edit Icon"
          className="absolute top-4 right-4"
          width={22}
          height={22}
        />
      </ActionCard>
    </InfoSection>
  );
}
