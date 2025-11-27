"use client";

import { CourseType } from "domain/models/course/CourseType";
import findAllCoursesUseCase from "domain/usecases/course/findAllCourses.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import {
  Button,
  FileInput,
  Greatment,
  ModalWithChildren,
  SectionSeparator,
} from "presentation/components/atoms";
import { CardCourse } from "presentation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import BulkCourseLoadingUseCase from "domain/usecases/course/BulkCourseLoading.use.case";

export const CourseManagement = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    findAllCourses();
  }, []);

  const findAllCourses = async () => {
    const findAllCourses = appContainer.get<findAllCoursesUseCase>(
      USECASES_TYPES._findAllCourses
    );
    const response = await findAllCourses.execute();

    if (!response) {
      toast.error("No se pudieron cargar los cursos.");
      return;
    }

    setCourses(response);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Por favor, selecciona un archivo para cargar.");
      return;
    }

    const bulkCourseLoading = appContainer.get<BulkCourseLoadingUseCase>(
      USECASES_TYPES._BulkCourseLoading
    );

    const response: any = await bulkCourseLoading.execute(file);
    if (response?.error) {
      toast.error(response.message || "Error al cargar los cronogramas.", {
        autoClose: 6000,
      });
    } else {
      toast.success("¡Cronogramas cargados correctamente!");
      await findAllCourses();
    }
    setOpenModal(false);
    setFile(null);
  };

  const handleDownloadTemplate = () => {
    const fileUrl = "/lalande/templates/Plantilla_carga_cursos.xlsx";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "Plantilla_carga_cursos.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="w_full md:w-11/12">
        <div className="flex justify-between mb-2 md:mb-7 md:-mt-3">
          <Greatment text={`Lista de cursos`} className="" />
          {/*
          <Button
            label="Carga masiva de cursos"
            className="w-64"
            primary
            onClick={() => {
              setOpenModal(true);
            }}
          />
          */}
        </div>
        <SectionSeparator />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CardCourse
                key={course.id}
                Title={course.name}
                Text={course.description}
                Icon={`/lalande${course.iconUrl}`}
              />
            ))
          ) : (
            <div className="text-2xl font-bold text-center text-principal-350">
              No hay cursos disponibles por el momento.
            </div>
          )}
        </div>
      </div>
      {openModal && (
        <ModalWithChildren
          onClose={() => setOpenModal(false)}
          className={`w-[400px] lg:w-[500px] rounded-[20px] flex flex-col gap-5 items-center shadow-lg bg-principal-150 subpixel-antialiased`}
        >
          <Image
            src="/lalande/icons/excel_icon.svg"
            alt="Close icon"
            width={80}
            height={80}
            priority
          />
          <h4 className="font-outfit text-[1rem] text-center font-semibold mb-2 pt-6 text-principal-180 mt-2">
            ¡Selecciona el archivo excel de los cursos!
          </h4>
          <FileInput file={file} setFile={setFile} acceptedFileTypes=".xlsx" />
          <div className="flex flex-grow w-full justify-between gap-14 lg:gap-8 py-2">
            <Button
              label="Descarga plantilla"
              onClick={() => handleDownloadTemplate()}
              primary
            />
            <Button label="Guardar" onClick={handleSubmit} primary />
          </div>
        </ModalWithChildren>
      )}
    </>
  );
};
