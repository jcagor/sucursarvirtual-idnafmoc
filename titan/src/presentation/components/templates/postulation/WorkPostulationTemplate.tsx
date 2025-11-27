"use client";
import GetOpenJobsListUseCase from "domain/usecases/fospec/getFospecOpenJobList.usecase";
import { useFormik } from "formik";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { useSession } from "next-auth/react";
import {
  Button,
  Greatment,
  NeutralNCText,
  NeutralText,
  TextSearchInput,
} from "presentation/components/atoms";
import {
  JobActionCard,
  JobDescriptionCard,
} from "presentation/components/molecules";
import React, { useEffect, useRef, useState } from "react";
import { SearchValidationSchema } from "./validation";
import { useRouter } from "next/navigation";
import {
  OpenJob,
  OpenJobsList,
  POSTULATION_JOB_OFFERS_PER_PAGE,
  PostulationListServerResponse,
} from "lib";
import Image from "next/image";
import SaveJobPostulationUseCase from "domain/usecases/userData/jobPostulation/userSaveJobPostulation.usecase";
import { JobPostulation, JobPostulationList } from "domain/models";
import GetJobPostulationListUseCase from "domain/usecases/userData/jobPostulation/userJobPostulationList.usecase";
import { timeDifference } from "./utilFunctions";
import ModalEmployability from "presentation/components/atoms/common/modals/ModalEmployability";
import { useDispatch } from "react-redux";
import { addAlert } from "presentation/store/alert/alertSlice";
import { jwtDecode } from "jwt-decode";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';
import { toast } from "react-toastify";

export const WorkPostulationTemplate = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const [statusModal, setStatusModal] = useState(false);

  // Job Offers
  const [jobList, setJobList] = useState<OpenJobsList>();
  const [jobListOriginal, setJobListOriginal] = useState<OpenJobsList>();

  // Job offer navigation
  const [cardPage, setCardPage] = useState(1);
  const [cardActive, setCardActive] = useState(-1);
  const [jobActiveDetail, setJobActiveDetail] = useState<OpenJob>();

  // My Postulations
  const [postulations, setPostulations] =
    useState<PostulationListServerResponse>();

  // Filtros
  const [filters, setFilters] = useState({
    workMode: '',
    startDate: null as Date | null,
    endDate: null as Date | null
  });

  // Search input manage
  const searchFormRef = useRef<HTMLFormElement>(null);

  interface SearchTerm {
    searchString: string;
  }
  const initialFormState: SearchTerm = {
    searchString: "",
  };

  const getOpenJobList = async () => {
    const token = session?.access_token ? session?.access_token : "";
    const getOpenJobList = appContainer.get<GetOpenJobsListUseCase>(
      USECASES_TYPES._GetOpenJobsListUseCase
    );

    const response = await getOpenJobList.execute({}, token);
    if (!response) {
      console.error("error al leer las variables desde el servidor");
      toast.error("¡Se ha producido un error al contactar el servidor!");
      return [];
    }
    //console.log(response);
    setJobList(response);
    setJobListOriginal(response);
  };

  const postulateToJob = async (jobOffer: OpenJob) => {
    const token = session?.access_token ? session?.access_token : "";
    const postulateToJob = appContainer.get<SaveJobPostulationUseCase>(
      USECASES_TYPES._SaveJobPostulationUseCase
    );

    let postulation: JobPostulation = {
      jobOffer: jobOffer,
      jobOfferId: jobOffer.jobId,
    };

    const response = await postulateToJob.execute(postulation, token);
    console.log(response);
    if (!response) {
      console.error("error al leer las variables desde el servidor");
      toast.error("¡Se ha producido un error al contactar el servidor!");
      //dispatch(
      //  addAlert({
      //    message: `error al leer las variables desde el servidor.`,
      //    type: "error",
      //  })
      //);
    } else if ("error" in response) {
      console.error("Error al registrar la postulación a la vacante");
      toast.error("¡Se ha producido un error al registrar la postulación a la vacante!");
      //dispatch(
      //  addAlert({
      //    message: `Error al registrar la postulación a la vacante, `+
      //      `verifica que tu hoja de vida este actualizada`,
      //    type: "error",
      //  })
      //);
    } else if (response.postulation_status === "PENDING") {
      setStatusModal(true);
      toast.success("¡Postulación enviada correctamente.!");
      //dispatch(
      //  addAlert({
      //    message: `Postulación enviada correctamente.`,
      //    type: "success",
      //  })
      //);
      listPostulations();
      return true;
    }
    return false;
  };

  const listPostulations = async () => {
    const token = session?.access_token ? session?.access_token : "";
    console.log(jwtDecode(token));
    const postulateToJob = appContainer.get<GetJobPostulationListUseCase>(
      USECASES_TYPES._GetJobPostulationListUseCase
    );

    const response = await postulateToJob.execute({}, token);
    if (!response) {
      console.error("error al leer las variables desde el servidor");
      toast.error("¡Se ha producido un error al leer las postulaciones actuales!");
      //dispatch(
      //  addAlert({
      //    message: `error al leer las postulaciones actuales.`,
      //    type: "error",
      //  })
      //);
      return [];
    }
    console.log("User postulation list:", response);
    setPostulations(response);
    //dispatch(
    //  addAlert({
    //    message: `Postulaciones encontradas ${response.length}`,
    //    type: "info",
    //  })
    //);
  };

  const isPostulated = (jobOfferId: string) => {
    let found = postulations?.filter((postulation, idx, arr) => {
      if (postulation.job_offer_id === jobOfferId) return true;
    });

    if (found && found?.length >= 1) {
      return true;
    }
    return false;
  };

  const navigateBack = () => {
    router.push("/employability");
  };

  const navigateOffersForward = () => {
    //console.log("fw");
    if (jobList) {
      if (
        jobList?.length > 0 &&
        cardPage * POSTULATION_JOB_OFFERS_PER_PAGE < jobList?.length
      ) {
        setCardPage((prevState) => {
          return prevState + 1;
        });
        //console.log("page:", cardPage);
      }
    }
  };

  const navigateOffersBackwards = () => {
    //console.log("bk");
    if (jobList) {
      if (jobList.length > 0 && cardPage > 1) {
        setCardPage((prevState) => {
          return prevState - 1;
        });
        //console.log("page:", cardPage);
      }
    }
  };

  const showMyPostulations = () => {
    router.push("/postulation/list");
  };

  const activateCard = (cardIndex: number, jobOffer: OpenJob) => {
    setCardActive(cardIndex);
    setJobActiveDetail(jobOffer);
  };

  const getJobOfferComponent = (
    key: number,
    jobOffer: OpenJob,
    active: boolean
  ) => {
    /* let formatSalary = Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(+jobOffer.monthSalary);
    formatSalary = formatSalary.replace(",00", ""); */

    let timeDiff = timeDifference(jobOffer.startDate);
    let formatTime =
      (timeDiff.years ? `${timeDiff.years} Años ` : "") +
      (timeDiff.months ? `${timeDiff.months} Meses ` : "") +
      (timeDiff.days ? `${timeDiff.days} Dias ` : "") +
      (timeDiff.minutes ? `${timeDiff.minutes} Minutos ` : "") +
      (timeDiff.seconds ? `${timeDiff.seconds} Segundos` : "");

    return (
      <JobActionCard
        key={`job-card-${key}`}
        title={`${jobOffer.title}`}
        subtitle={`${jobOffer.businessName} / ${jobOffer.state}`}
        salary={`${jobOffer.monthSalary} (Mensual)`}
        publishedTime={`${formatTime}`}
        activeCard={active}
        action={() => {
          activateCard(key, jobOffer);
        }}
        width={120}
        height={100}
        urlImage={"/icons/fail.webp"}
        imageClassname={"w-[41px] h-[41px] md:ml-8 mx-auto"}
      />
    );
  };

  const submitSearch = async (searchString: SearchTerm) => {
    // The form update onChange, ignore submit.
    //console.log("Search term received: ", searchString);
  };

  const onChangeSearch = (event: string) => {
    //console.log("change event:", event);
    if (event.length >= 3) {
      filterAvailableJobs(event);
    } else {
      setJobList(jobListOriginal);
      setJobActiveDetail(undefined);
      setCardPage(1);
      setCardActive(-1);
    }
  };

  const filterAvailableJobs = (searchString: string) => {
    if (searchString && jobListOriginal && searchString !== "") {
      let filteredList = jobListOriginal?.filter((job, idx, arr) => {
        if (job.title.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) {
          return true;
        } else if (job.description.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) {
          return true;
        } else if (job.activityDetails.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) {
          return true;
        }
        return false;
      });

      setJobList(filteredList);
      setJobActiveDetail(undefined);
      setCardPage(1);
      setCardActive(-1);
    }
  };

  const validation = new SearchValidationSchema().getSearchFormValidation();

  const {
    errors,
    handleSubmit,
    handleChange,
    values,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: initialFormState,
    onSubmit: submitSearch,
    validationSchema: validation,
  });

  // useEffect
  useEffect(() => {
    getOpenJobList();
    listPostulations();
  }, []);

  return (
    <div className="block w-full h-full overflow-y-hidden mt-[-30px] mr-[64px]">
      <NeutralText
        text="Vacantes de Empleo/ Dashboard"
        className="cf-text-principal-180 font-semibold mb-2"
        fontSize="sm"
      />

      <Greatment
        text={`Explora vacantes disponibles`}
        className="mb-2 md:mb-2 md:-mt-3"
      />

      <NeutralNCText
        text="Encuentra la oportunidad perfecta para ti. Revisa las ofertas y postúlate"
        className="cf-text-principal-180"
        fontSize="md"
      />
      <NeutralNCText
        text="al empleo que mejor se ajuste a tu perfil. ¡Tu próximo paso comienza aquí!"
        className="cf-text-principal-180"
        fontSize="md"
      />

      <hr className="h-px my-2 bg-gray-700 dark:bg-gray-200" />

      <div className="w-full p-1 "></div>

      <form onSubmit={handleSubmit} ref={searchFormRef}>
        <div className="flex gap-4">
          <TextSearchInput
            id={"inputSearchJob"}
            name={"searchString"}
            label={false}
            hasIcon={true}
            onChange={(event) => {
              handleChange(event);
              onChangeSearch(event.target.value);
            }}
            placeholder={"Título del empleo, palabras clave"}
            classNameText="w-full text-principal-450 placeholder-principal-450 border-[calc(1px)] rounded-r-[calc(5px)] bg-principal-460"
            disabled={false}
            value={values.searchString}
          />
          
          <select
            className="w-48 p-2 border rounded-md"
            value={filters.workMode}
            onChange={(e) => {
              setFilters(prev => ({ ...prev, workMode: e.target.value }));
              filterAvailableJobs(values.searchString);
            }}
          >
            <option value="">Todas las modalidades</option>
            <option value="Presencial">Presencial</option>
            <option value="Remoto">Remoto</option>
            <option value="Hibrido">Híbrido</option>
          </select>

          <DatePicker
            selected={filters.startDate}
            onChange={(dates) => {
              const [start, end] = dates as [Date, Date];
              setFilters(prev => ({ 
                ...prev, 
                startDate: start,
                endDate: end
              }));
              filterAvailableJobs(values.searchString);
            }}
            startDate={filters.startDate}
            endDate={filters.endDate}
            selectsRange
            locale={es}
            dateFormat="dd/MM/yyyy"
            placeholderText="Rango de fechas"
            className="w-64 p-2 border rounded-md"
            isClearable
          />
        </div>
      </form>

      <div className="w-full flex">
        <div className="flex">
          <NeutralText
            text={`Resultado de la búsqueda: ${jobList?.length}`}
            className="cf-text-principal-180 font-semibold mb-2"
            fontSize="sm"
          />
        </div>
        <div className="block w-3/4 flex justify-end">
          <button
            className="py-1 px-3 border-2 text-[#003DA5] border-[#003DA5] rounded-md"
            onClick={showMyPostulations}
          >
            Mis Postulaciones
          </button>
        </div>
      </div>

      <div className="w-full h-3/4 max-h-3/4 grid grid-cols-6 gap-4">
        <div className="p-2 h-full overflow-y-hidden col-span-6 block sm:col-span-2">
          {/*border-2 border-dotted*/}
          <div className="h-9/10 md:h-3/4 sm:h-1/3 overflow-y-auto overflow-x-hidden block">
            {/*border-2 border-dashed*/}
            {/* Card Section */}

            {jobList?.length ? (
              jobList.map((job, idx, arr) => {
                let startIndex =
                  cardPage * POSTULATION_JOB_OFFERS_PER_PAGE -
                  POSTULATION_JOB_OFFERS_PER_PAGE;
                let stopIndex = cardPage * POSTULATION_JOB_OFFERS_PER_PAGE;

                if (idx >= startIndex && idx < stopIndex) {
                  return getJobOfferComponent(idx, job, idx === cardActive);
                }
              })
            ) : (
              <NeutralNCText
                text="No se encuentran registros."
                className="py-10 cf-text-principal-180 text-center block w-full"
                fontSize="md"
              />
            )}
          </div>
          <div className="h-1/9">
            {/*border-2 border-dashed */}
            <div className="flex items-center">
              <div className="flex-auto">
                <a
                  onClick={navigateBack}
                  onKeyDown={() => {}}
                  className="cursor-pointer"
                >
                  <NeutralNCText
                    text="Atrás"
                    className="cf-text-principal-180 mb-[2rem] md:mb-9"
                    fontSize="md"
                  />
                </a>
              </div>

              <div className="flex flex-auto mt-[-15px]">
                <a
                  onClick={navigateOffersBackwards}
                  onKeyUp={() => {}}
                  className="cursor-pointer"
                >
                  <Image
                    src={"/icons/back_icon.png"}
                    alt="Pagina anterior"
                    width={20}
                    height={20}
                    draggable={false}
                    className="flex"
                  />
                </a>
                <NeutralText
                  text={` Pag. ${cardPage} de (${
                    jobList?.length
                      ? Math.ceil(
                          jobList.length / POSTULATION_JOB_OFFERS_PER_PAGE
                        )
                      : "0"
                  }) `}
                  className={"text-md cf-text-principal-180 font-bold"}
                />
                <a
                  onClick={navigateOffersForward}
                  onKeyUp={() => {}}
                  className="cursor-pointer"
                >
                  <Image
                    src={"/icons/next_icon.png"}
                    alt="Pagina siguiente"
                    width={20}
                    height={20}
                    draggable={false}
                    className="flex"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full overflow-y-auto col-span-6 block sm:col-span-4">
          {/*border-2 border-dotted*/}
          {/* Information Section */}
          {jobActiveDetail ? (
            <JobDescriptionCard
              openJob={jobActiveDetail}
              postulationFn={postulateToJob}
              postulated={isPostulated(jobActiveDetail.jobId)}
            />
          ) : (
            <NeutralNCText
              text="Selecciona una oferta para ver sus detalles."
              className="py-10 cf-text-principal-180 text-center block w-full"
              fontSize="md"
            />
          )}
        </div>
      </div>
      {/* Modal confirmation */}
      {statusModal && (
        <ModalEmployability
          urlImage="/img/check_mark.png"
          title="¡Se envió tu solicitud de postulación!"
          description={
            "Tu solicitud sera verificada y seras contactado en caso de cumplir los requerimientos de la oferta."
          }
          primaryButtonText="Aceptar"
          onPrimaryClick={() => {
            setStatusModal(false);
          }}
          onSecondaryClick={() => {
            setStatusModal(false);
          }}
          hideSecondaryButton
        />
      )}
    </div>
  );
};
