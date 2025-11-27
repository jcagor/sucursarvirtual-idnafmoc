"use client";

import { InfoSection } from "@comfanditd/chronux-ui";
import { GoIndependent, GoPensioner } from "./components";
import { useRouter } from "next/navigation";
import { useAppSelector } from "presentation/store";
import { Conditional, showActionAlert } from "lib";
import { ActionMenuCard } from "presentation/components/molecules/common/cards/ActionMenuCard";
import Link from "next/link";
import { useState } from "react";

const SelectTypeAffiliation = () => {
  const router = useRouter();
  const [isAffiliate, setIsAffiliate] = useState(false);

  const sapRights = useAppSelector((state) => state.setsapRights);
  const menuItems = [
    {
      title: "Gestión de titular y beneficiarios",
      img: "/icons/extracts.png",
      handleClick: () => {
        router.push("menu-affiliations/affiliations");
      },
    },
    {
      title: "Mis Radicados",
      img: "/icons/assignment-dates.png",
      handleClick: () => {
        router.push("/menu-affiliations/filed");
      },
    },
  ];

  const handleAction = (item: {
    title: string;
    img: string;
    handleClick: () => void;
  }) => {
    const titularFecha = sapRights?.rights?.TitularFechaFinVigencia;

    if (sapRights?.rights) {
      // Caso: afiliado (sin fecha fin o con 9999-12-31)
      if (
        !titularFecha ||
        titularFecha.trim() === "" ||
        titularFecha === "9999-12-31"
      ) {
        // Está afiliado, puede continuar normalmente
        item.handleClick();
      } else {
        // Caso: tiene fecha de retiro (pasada o igual a hoy)
        const fechaFin = new Date(titularFecha);
        const hoy = new Date();

        if (fechaFin <= hoy) {
          // Está retirado → mostrar alerta
          showActionAlert({
            title: "Atención",
            content:
              "No se encuentra afiliado como titular. Puedes radicar una solicitud como independiente o pensionado.",
            action: () => {},
          });
        } else {
          // Por si acaso, fecha futura (aún vigente)
          item.handleClick();
        }
      }
    }
  };

  return (
    <div>
      <InfoSection
        image={Image}
        topText="Afiliaciones"
        description="En Comfandi ofrecemos valores agregados que generan bienestar y mejoran la calidad de vida de nuestros grupos de interés. Además contribuimos al desarrollo económico, social y ambiental de la región, con acciones y programas que nos hacen una entidad socialmente responsable."
        aditionalDescription="¿Qué necesitas hacer hoy?"
        classNameAditional="mb-[2rem] md:mb-[1.5rem] md:mt-16"
        link={Link}
      />

      <div className="w-full pl-2 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-y-10 md:gap-x-6 md:px-6 md:mb-12 xl:grid-cols-3 xl:w-fit xl:px-0 mb-20">
        {menuItems.map((item, index) => (
          <Conditional showWhen={!(isAffiliate && index === 0)} key={index}>
            <ActionMenuCard
              key={index}
              height={80}
              width={80}
              action={() => handleAction(item)}
              urlImage={item.img}
              name={item.title}
            />
          </Conditional>
        ))}

        <GoPensioner />
        <GoIndependent />
      </div>
    </div>
  );
};

export default SelectTypeAffiliation;
