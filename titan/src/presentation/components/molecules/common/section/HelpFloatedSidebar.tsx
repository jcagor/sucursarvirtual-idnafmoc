"use-client";

import { type FC } from "react";
import React from "react";

interface Props {
  sidebarOpen: boolean;
}

export const HelpFloatedSidebar: FC<Props> = ({ sidebarOpen }) => {
  return (
    <div
      className={
        (sidebarOpen ? "sidebar-help open" : "sidebar-help") +
        " overflow-y-auto rounded-lg shadow transition duration-300 ease-in-out"
      }
    >
      <div className="bg-principal-180 p-5 text-[#FFF]">
        <span className="text-[2rem] font-bold">Recomendaciones</span>
        <hr className="h-px my-2 bg-gray-700 dark:bg-gray-200" />
        <p>
          <span className="font-bold">🧑‍🎓 Ejemplo perfil Profesional</span>
        </p>
        <div className="ml-3">
          <p>
            <span>
              📌 Dirigido a personas con formación técnica, tecnológica o
              profesional
            </span>
          </p>
        </div>
        <div className="ml-6 my-3">
          <p>Ejemplo:</p>
          <p className="font-light">
            Profesional en Psicología con tres años de experiencia en el área de
            Talento Humano. Posee habilidades en la selección de personal para
            cargos masivos en los sectores operativo y comercial. Se destaca por
            su capacidad para el trabajo en equipo, la comunicación asertiva y
            el manejo eficiente del trabajo bajo presión. Cuenta con
            conocimientos en entrevistas por competencias y en la aplicación e
            interpretación de herramientas psicométricas.
          </p>
        </div>

        <p className="font-bold">👷 Ejemplo perfil Operativo</p>

        <div className="ml-3">
          <p className="flex">
            📌{" "}
            <span>
              Dirigido a personas con formación básica o media (Bachiller)
            </span>
          </p>
        </div>
        <div className="ml-6 my-3">
          <p>Ejemplo:</p>
          <p className="font-light">
            Bachiller con tres años de experiencia en el área comercial. Cuenta
            con habilidades en venta consultiva, trabajo puerta a puerta y
            atención al cliente. Se caracteriza por su compromiso, buena
            comunicación, capacidad para el trabajo en equipo y manejo adecuado
            de situaciones bajo presión.
          </p>
        </div>

        <p className="font-bold">✅ ¿Qué debes incluir en tu perfil?</p>
        <div className="ml-3">
          <p>Elemento Descripción</p>
        </div>
        <div className="ml-6 my-3">
          <p className="flex">
            🎓{" "}
            <span>
              Nivel educativo Ej:{" "}
              <span className="font-light">
                Bachiller, Técnico, Tecnólogo, Profesional
              </span>
            </span>
          </p>
          <p className="flex">
            📅{" "}
            <span>
              Años de experiencia Ej:{" "}
              <span className="font-light">3 años en el sector</span>
              comercial/logístico/etc.
            </span>
          </p>
          <p className="flex">
            🏢{" "}
            <span>
              Área o sector Ej:{" "}
              <span className="font-light">
                Comercial, Logístico, Talento Humano,
              </span>
              Producción
            </span>
          </p>
          <p className="flex">
            💡{" "}
            <span>
              Habilidades clave Ej:{" "}
              <span className="font-light">
                Comunicación asertiva, trabajo en equipo,
              </span>
              liderazgo, atención al cliente
            </span>
          </p>
          <p className="flex">
            💻{" "}
            <span>
              Herramientas o tecnologías Ej:{" "}
              <span className="font-light">Excel, SAP, CRM, herramientas</span>
              digitales (si aplica)
            </span>
          </p>
          <p className="flex">
            📝{" "}
            <span className="">
              Redacta tu perfil en tercera persona, de forma clara, profesional
              y concisa. Usa los ejemplos como guía para contar tu experiencia y
              habilidades.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
