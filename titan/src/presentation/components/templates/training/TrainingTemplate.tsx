"use client";
import Home from "app/(pages)/under-construction/page";
import GetAvailableCoursesUserUseCase from "domain/usecases/userData/userCoursesAvailable.usecase";
import UserMpacDataUseCase from "domain/usecases/userData/userdataMpac.usecase";
import UserFospecTrainingUseCase from "domain/usecases/userData/userFospecTraining.usecase";
import RegisterCourseUseCase from "domain/usecases/userData/registerCourse.usecase";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { jwtDecode } from "jwt-decode";
import {
  AvailableTrainingCourse,
  BETA_ACCESS,
  identificationTypeNomenclature,
  MPAC_API_RESULT_CODE,
  MPAC_API_USER_TYPE,
  MPAC_API_USER_TYPE_ENUM,
  nameFormat,
  NOT_SCHEDULE_AVAILABLE_MSG,
  TRAINING_COURSE_DEFAULT_LINK,
  UserDataInterface,
  UserTrainingEntityInterface,
} from "lib";
import { GenerateMpacUser } from "lib/helpers/generateMpacUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Description,
  Greatment,
  HeaderNotificationCard,
  LinkCourseCard,
  NeutralNCText,
  useBetaAccess,
} from "presentation";
import React, { useEffect, useState } from "react";
import {
  CourseScheduleQuery,
  CourseScheduleType,
  CourseScheduleTypeList,
  CourseType,
  createCourseRegistrationData,
  createTrainingUserData,
  QueryRegisterEmployeeInCourse,
  QueryRegisterUnemployedInCourse,
  UnemployedCourseInfo,
  UnemployedCourseInfoList,
} from "./training.types";
import UserTrainingCoursesUseCase from "domain/usecases/userData/userTrainingCourses.usecase";
import { toast } from "react-toastify";
import GetCourseScheduleUseCase from "domain/usecases/courses/GetCourseSchedule.usecase";
import RegisterUnemployedInCourseUseCase from "domain/usecases/courses/RegisterUnemployedInCourse.usecase";
import { da } from "date-fns/locale";
import ModalCourseInscription from "presentation/components/atoms/common/modals/ModalCourseInscription";
import ModalEmployability from "presentation/components/atoms/common/modals/ModalEmployability";
import RegisterEmployeeInCourseUseCase from "domain/usecases/courses/RegisterEmployeeInCourse.usecase";
import Modal from "presentation/components/atoms/common/modals/Modal";
import GetCoursesForBeneficiaryUseCase from "domain/usecases/userData/getCoursesForBeneficiary.usecase";

export const TrainingTemplate = () => {
  // VARS
  const visible = useBetaAccess(BETA_ACCESS);
  const router = useRouter();

  const { data: session } = useSession();
  const [name, setName] = useState("Usuario");

  // STATES
  const [affiliation, setAffiliation] = useState<string>(
    MPAC_API_USER_TYPE.ERROR
  );
  const [coursesList, setCoursesList] = useState<AvailableTrainingCourse[]>([]);
  const [trainingCoursesList, setTrainingCoursesList] = useState<
    CourseScheduleTypeList | undefined
  >();
  const [unemployedTrainingList, setUnemployedTrainingList] =
    useState<UnemployedCourseInfoList>();
  const [unemployedWorkShopList, setUnemployedWorkShopList] =
    useState<UnemployedCourseInfoList>();

  // Inscription vars
  const [inscriptionCourse, setInscriptionCourse] = useState<
    UserTrainingEntityInterface | undefined
  >();
  const [inscriptionCourseActive, setInscriptionCourseActive] = useState<
    CourseType | undefined
  >();
  const [inscriptionSchedule, setInscriptionSchedule] = useState<
    CourseScheduleType | undefined
  >();

  // for other roles
  const [coursesWorkshopList, setCoursesWorkshopList] = useState<
    UserTrainingEntityInterface[]
  >([]);
  const [coursesTrainingList, setCoursesTrainingList] = useState<
    UserTrainingEntityInterface[]
  >([]);
  const [availableSchedules, setAvailableSchedules] =
    useState<Array<UnemployedCourseInfoList>>();

  // Modal control
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");
  const [inscriptionModal, setInscriptionModal] = useState(false);

  const [mpacModalError, setMpacModalError] = useState(false);
  const [mpacModalMessage, setMpacModalMessage] = useState("");

  const getInfo = async () => {
    let dataFull = jwtDecode(session?.access_token!) as UserDataInterface;

    if (dataFull?.given_name) setName(nameFormat(dataFull.given_name));

    let { identification_number, identification_type } = jwtDecode(
      session?.access_token!
    ) as UserDataInterface;

    const identificationType =
      identificationTypeNomenclature(identification_type);
    if (!identificationType) {
      return;
    }
  };

  const previousSteep = () => {
    router.push("/employability");
  };

  const getUserCurrentStatus = async () => {
    try {
      const token = session?.access_token || "";
      const sessionData: UserDataInterface = jwtDecode(token);

      const sendUserMpacDataUseCase = appContainer.get<UserMpacDataUseCase>(
        USECASES_TYPES._UserMpacDataUseCase
      );
      const userData = GenerateMpacUser(
        sessionData.identification_type!,
        sessionData.identification_number!
      );

      const dataMpac = await sendUserMpacDataUseCase.execute(userData, token);

      if (dataMpac?.OUT_Salida === MPAC_API_RESULT_CODE.OK) {
        setAffiliation(dataMpac?.OUT_Tipo_Actor);
        if (dataMpac?.OUT_Tipo_Actor === MPAC_API_USER_TYPE.ACTIVE_WORKER) {
          await getAvailableTrainingCourses();
        } else if (dataMpac?.OUT_Tipo_Actor === MPAC_API_USER_TYPE.CESANT) {
          await getUnemployedAssignedCourses();
        } else if (
          dataMpac?.OUT_Tipo_Actor === MPAC_API_USER_TYPE.BENEFICIARY
        ) {
          await getAvailableCoursesForBeneficiary();
        } else if (dataMpac?.OUT_Tipo_Actor === MPAC_API_USER_TYPE.UNIVERSAL) {
          await getAvailableCourses();
        }
      }
    } catch (error) {
      console.error("Error in getUserCurrentStatus:", error);
      toast.error("¡Se ha producido un error al contactar el servidor!");
    }
  };

  //-- COURSES INFORMATION --------------------

  const getAvailableCourses = async () => {
    try {
      const token = session?.access_token || "";
      const getActiveUserAvailableCourses =
        appContainer.get<GetAvailableCoursesUserUseCase>(
          USECASES_TYPES._GetAvailableCoursesUserUseCase
        );
      const response = await getActiveUserAvailableCourses.execute({}, token);
      setCoursesList(response || []);
    } catch (error) {
      console.error("Error fetching available courses:", error);
      toast.error("¡Se ha producido un error al contactar el servidor!");
      setCoursesList([]);
    }
  };

  const getUnemployedAssignedCourses = async () => {
    try {
      const token = session?.access_token || "";
      const dataFull = jwtDecode(token) as UserDataInterface;
      const userData = {
        documentType: dataFull.identification_type,
        identification: dataFull.identification_number,
      };

      const getUnemployedAssignedCourses =
        appContainer.get<UserFospecTrainingUseCase>(
          USECASES_TYPES._UserFospecTrainingUseCase
        );
      const response = await getUnemployedAssignedCourses.execute(
        userData,
        token
      );

      if (response?.length) {
        let scheduleTrainingInfo = await getAvailableSchedules(
          response[0].training ?? []
        );
        setUnemployedTrainingList(scheduleTrainingInfo ?? []);

        let scheduleWorkshopInfo = await getAvailableSchedules(
          response[1].workshop ?? []
        );
        setUnemployedWorkShopList(scheduleWorkshopInfo ?? []);
      }
      ////////////
      /*else {
        const alt_response = [
          {
            training: [
              //{
              //    "label":"`${nameFormation.sap_code} - ${nameFormation.name}`",
              //    "value":"nameFormation.id"
              //},
              {
                label: "ABC321 - Gestión Logística",
                value: "aaa-bbb-ccc-2123",
              },
            ],
          },
          {
            workshop: [
              //{
              //    "label":"`${nameWorkshop.sap_code} - ${nameWorkshop.name}`",
              //    "value":"nameWorkshop.id"
              //},
              {
                label: "ABC542 - Pintura al Oleo",
                value: "ddd-bbb-ccc-2123",
              },
            ],
          },
        ];

        let scheduleTrainingInfo = await getAvailableSchedules(
          alt_response[0].training ?? []
        );
        setUnemployedTrainingList(scheduleTrainingInfo ?? []);

        let scheduleWorkshopInfo = await getAvailableSchedules(
          alt_response[1].workshop ?? []
        );
        setUnemployedWorkShopList(scheduleWorkshopInfo ?? []);
      }*/
      ////////////
    } catch (error) {
      console.error("Error fetching unemployed courses:", error);
      toast.error("¡Se ha producido un error al contactar el servidor!");
      setUnemployedTrainingList([]);
      setUnemployedWorkShopList([]);
    }
  };

  const getAvailableTrainingCourses = async () => {
    try {
      const token = session?.access_token || "";
      const dataFull = jwtDecode(token) as UserDataInterface;
      const userData = {
        documentType: dataFull.identification_type,
        identification: dataFull.identification_number,
      };

      const getAvailableTrainingCourses =
        appContainer.get<UserTrainingCoursesUseCase>(
          USECASES_TYPES._UserTrainingCoursesUseCase
        );
      const response = await getAvailableTrainingCourses.execute(
        userData,
        token
      );
      setTrainingCoursesList(response);
    } catch (error) {
      console.error("Error fetching training courses:", error);
      toast.error("¡Se ha producido un error al contactar el servidor!");
      setTrainingCoursesList([]);
    }
  };

  const getAvailableCoursesForBeneficiary = async () => {
    const token = session?.access_token || "";
    const getAvailableCoursesForBeneficiary =
      appContainer.get<GetCoursesForBeneficiaryUseCase>(
        USECASES_TYPES._GetCoursesForBeneficiaryUseCase
      );
    const response = await getAvailableCoursesForBeneficiary.execute(token);
    setTrainingCoursesList(response);
  };

  //-- SCHEDULE INFORMATION --------------------

  const getCourseAvailableSchedule = async (
    courseName: string,
    forUnemployed: boolean
  ) => {
    // get the name from fomento response
    if (forUnemployed && courseName.includes("-")) {
      let parts = courseName.split("-");
      if (parts.length >= 2) {
        courseName = parts[1].trim();
      }
    }

    const query = {
      courseName: courseName,
      unemployed: forUnemployed,
    } as CourseScheduleQuery;

    const token = session?.access_token || "";
    const availableSchedule = appContainer.get<GetCourseScheduleUseCase>(
      USECASES_TYPES._GetCourseScheduleUseCase
    );
    const response = await availableSchedule.execute(query, token);

    //console.log("AvailableSchedule", response);

    return response ?? [];
  };

  const getAvailableSchedules = async (
    assignedActivities: Array<UserTrainingEntityInterface>
  ) => {
    if (assignedActivities && assignedActivities.length >= 1) {
      let trainingList: UnemployedCourseInfoList = [];
      for (const training of assignedActivities) {
        const schedule = await getCourseAvailableSchedule(training.label, true);

        let trainingObj: UnemployedCourseInfo = {
          course: training,
          schedule: schedule,
        };
        trainingList = [...trainingList, trainingObj];
      }
      return trainingList;
    }
    return;
  };

  //-- REGISTER INFORMATION --------------------

  const registerUnemployedInCourse = async (
    scheduleId: string,
    curseName: string
  ) => {
    const token = session?.access_token || "";
    const dataFull = jwtDecode(token) as UserDataInterface;

    let names = dataFull.given_name.split(" ");
    let lastNames = dataFull.family_name.split(" ");

    const query = {
      course_schedule_id: scheduleId,
      unemployed: {
        document_type: dataFull.identification_type,
        document_number: dataFull.identification_number,
        email: dataFull.email,
        firstName: names.length >= 1 ? names[0] : dataFull.given_name,
        firstLastName: names.length >= 2 ? names[1] : "",
        middleName: lastNames.length >= 1 ? lastNames[0] : dataFull.given_name,
        middleLastName: lastNames.length >= 2 ? lastNames[1] : "",
        phoneNumber: dataFull.preferred_username,
        gender: "",
        observations: "",
      },
    } as QueryRegisterUnemployedInCourse;

    const registrationTask =
      appContainer.get<RegisterUnemployedInCourseUseCase>(
        USECASES_TYPES._RegisterUnemployedInCourseUseCase
      );
    const response = await registrationTask.execute(query, token);

    if (!response) {
      console.error("Error al registrar el usuario:", response);
      toast.error("¡Se ha producido un error al contactar el servidor!");
      return;
    }

    if (response && "error" in response && "message" in response) {
      toast.error(
        response.message
          ? response.message.toString()
          : "Error al realizar el registro"
      );
      setMpacModalError(true);
      setMpacModalMessage(
        response.message ?? "Error al realizar la Inscripción"
      );
      return;
    }

    //console.log("Unemployed Registration:", response);
    toast.success(`Ya estas registrado en la capacitación: ${curseName}`);
    setErrorModal(true);
    setErrorModalMessage(
      `Ahora ya estas registrado en la capacitación: ${curseName}`
    );
  };

  const registerWorkerInCourse = async (
    scheduleId: string,
    curseName: string
  ) => {
    const token = session?.access_token || "";
    const dataFull = jwtDecode(token) as UserDataInterface;

    let names = dataFull.given_name.split(" ");
    let lastNames = dataFull.family_name.split(" ");

    const query = {
      course_schedule_id: scheduleId,
      employee: {
        document_type: dataFull.identification_type,
        document_number: dataFull.identification_number,
        email: dataFull.email,
        firstName: names.length >= 1 ? names[0] : dataFull.given_name,
        firstLastName: names.length >= 2 ? names[1] : "",
        middleName: lastNames.length >= 1 ? lastNames[0] : dataFull.given_name,
        middleLastName: lastNames.length >= 2 ? lastNames[1] : "",
        phoneNumber: dataFull.preferred_username,
        gender: "",
        observations: "",
      },
    } as QueryRegisterEmployeeInCourse;

    const registrationTask = appContainer.get<RegisterEmployeeInCourseUseCase>(
      USECASES_TYPES._RegisterEmployeeInCourseUseCase
    );
    const response = await registrationTask.execute(query, token);

    if (!response) {
      console.error("Error al registrar el usuario:", response);
      toast.error("¡Se ha producido un error al contactar el servidor!");
      return;
    }

    if (response && "error" in response && "message" in response) {
      toast.error(
        response.message
          ? response.message.toString()
          : "Error al realizar el registro"
      );

      //Message to user
      setMpacModalError(true);
      setMpacModalMessage(
        response.message ?? "Error al realizar la Inscripción"
      );
      return;
    }

    //console.log("Unemployed Registration:", response);
    toast.success(`Ya estas registrado en la capacitación: ${curseName}`);
    setErrorModal(true);
    setErrorModalMessage(
      `Ahora ya estas registrado en la capacitación: ${curseName}`
    );
  };

  const registerUserInCourse = () => {
    //console.log("Subscribe!!")
    if (inscriptionSchedule) {
      if (inscriptionSchedule.id) {
        let courseName = "";
        if (inscriptionCourse) {
          courseName = inscriptionCourse.label;
        } else {
          courseName = inscriptionCourseActive?.name ?? "";
        }

        switch (affiliation) {
          case MPAC_API_USER_TYPE_ENUM.CESANT:
            registerUnemployedInCourse(inscriptionSchedule.id, courseName);
            break;

          case MPAC_API_USER_TYPE_ENUM.ACTIVE_WORKER:
            registerWorkerInCourse(inscriptionSchedule.id, courseName);
            break;

          default:
            console.error(
              "Registro para usuario " + affiliation + "deshabilitado"
            );
        }
      } else {
        toast.error("Error al realizar la inscripción, intenta nuevamente.");
      }
      setInscriptionModal(false);
    }
  };

  //-- UI FUNCTIONS ----------------------------

  const handleCourseClick = async (course: AvailableTrainingCourse) => {
    try {
      const sessionData: UserDataInterface = jwtDecode(session?.access_token!);
      const userData = createTrainingUserData(sessionData);
      const courseRegistration = createCourseRegistrationData(course, userData);

      const registerCourseUseCase = appContainer.get<RegisterCourseUseCase>(
        USECASES_TYPES._RegisterCourseUseCase
      );

      const response = await registerCourseUseCase.execute(
        courseRegistration,
        session?.access_token!
      );

      if (response?.success) {
        //console.log("Curso registrado exitosamente");
        toast.success("Curso registrado exitosamente");
        getAvailableCourses();
      } else {
        console.error("Error al registrar el curso:", response?.message);
        toast.error(
          `¡Se ha producido un error al registrar el curso: ${response?.message!}`
        );
      }
    } catch (error) {
      console.error("Error al registrar el curso:", error);
      toast.error("¡Se ha producido un error al contactar el servidor!");
    }
  };

  const handleUnemployedCourseClick = async (
    courseInfo: UnemployedCourseInfo,
    schedule: CourseScheduleType
  ) => {
    //console.log("corse click:",courseInfo.course.label, schedule.startDate);
    setInscriptionCourse(courseInfo.course);
    setInscriptionSchedule(schedule);

    setInscriptionModal(true);
  };

  const handleActiveCourseClick = async (
    courseInfo: CourseType,
    schedule: CourseScheduleType
  ) => {
    //console.log("corse click:",courseInfo.course.label, schedule.startDate);
    setInscriptionCourseActive(courseInfo);
    setInscriptionSchedule(schedule);

    setInscriptionModal(true);
  };

  // Unemployed Render

  const renderUnemployedCourseCard = (
    data: UnemployedCourseInfo,
    idx: number,
    description: string,
    duration: string = "",
    schedule: CourseScheduleType | undefined
  ) => (
    <LinkCourseCard
      key={`course_crd_${idx}`}
      duration={duration}
      description={description}
      height={372}
      width={302}
      href={"#"}
      name={data.course.label}
      urlImage="/img/course_default.png"
      onClick={() => {
        //course.onClick && course.onClick(course)
        if (schedule) {
          handleUnemployedCourseClick(data, schedule);
        }
      }}
      schedule={
        data.schedule && data.schedule?.length >= 1
          ? data.schedule[0]
          : undefined
      }
    />
  );

  const renderUnemployedCoursesGrid = (
    courses: UnemployedCourseInfoList,
    description: string,
    duration: string = ""
  ) => (
    <div className="w-full pl-2 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-y-10 md:gap-x-6 md:px-6 md:mb-12 xl:grid-cols-3 xl:w-fit xl:px-0 mb-20">
      {courses.length ? (
        courses.map((course, idx) => {
          let available = course.schedule?.map((schedule) => {
            let dur = schedule.endDate;
            let des = schedule.description;
            return renderUnemployedCourseCard(
              course,
              idx,
              des ?? "Disponible",
              dur,
              schedule
            );
          });
          if (available && available?.length >= 1) {
            return available;
          } else {
            return renderUnemployedCourseCard(
              course,
              idx,
              NOT_SCHEDULE_AVAILABLE_MSG,
              "",
              undefined
            );
          }
        })
      ) : (
        <Description
          text="No tienes cursos asignados en este momento."
          className="block mb-[2rem] md:mb-9"
        />
      )}
    </div>
  );

  const renderUnemployedUserCourses = () => (
    <div>
      <NeutralNCText
        text="Cursos"
        className="cf-text-principal-180"
        fontSize="md"
      />
      {renderUnemployedCoursesGrid(unemployedTrainingList ?? [], "Curso")}

      <NeutralNCText
        text="Talleres"
        className="cf-text-principal-180"
        fontSize="md"
      />
      {renderUnemployedCoursesGrid(unemployedWorkShopList ?? [], "Taller")}
    </div>
  );

  // END unemployed render

  // Worker Render
  const renderActiveWorkerCourses = () => {
    return renderCoursesGrid(
      trainingCoursesList ?? [],
      "Curso de Entrenamiento"
    );
  };

  const renderCoursesGrid = (
    courses: any[],
    description: string,
    duration: string = ""
  ) => (
    <div className="w-full pl-2 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-y-10 md:gap-x-6 md:px-6 md:mb-12 xl:grid-cols-3 xl:w-fit xl:px-0 mb-20">
      {courses.length ? (
        courses.map((course, idx) => {
          //console.log(course);
          return renderCourseCard(course, idx, description, duration);
        })
      ) : (
        <Description
          text="No tienes cursos asignados en este momento."
          className="block mb-[2rem] md:mb-9"
        />
      )}
    </div>
  );

  const renderCourseCard = (
    schedule: CourseScheduleType | undefined,
    idx: number,
    description: string,
    duration: string = ""
  ) => {
    let courseName;

    if (schedule?.name) {
      courseName = schedule?.name;
    } else {
      courseName = schedule?.course ? schedule.course?.name : " ";
    }

    return (
      <LinkCourseCard
        key={`course_crd_${idx}`}
        duration={duration}
        description={description}
        height={372}
        width={302}
        href={TRAINING_COURSE_DEFAULT_LINK}
        name={courseName}
        urlImage="/img/course_default.png"
        //onClick={() => schedule.onClick && schedule.onClick(course)}
        onClick={() => {
          //console.log("Active user click!");
          if (schedule?.course) {
            handleActiveCourseClick(schedule.course, schedule);
          }
        }}
        schedule={schedule}
      />
    );
  };
  // END Worker Render

  // Render additional users courses.
  const renderGeneralUserCourses = () =>
    renderCoursesGrid(
      coursesList.map((course) => ({ ...course, onClick: handleCourseClick })),
      "Horas",
      coursesList[0]?.duration_hours?.toString() || ""
    );

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (session?.access_token && isMounted) {
        await getInfo();
        await getUserCurrentStatus();
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [session?.access_token]);

  return (
    <div className="block mr-[64px]">
      <HeaderNotificationCard />
      <Greatment text={`Bienvenid@ 👋`} className="mb-2 md:mb-7 md:-mt-3" />
      <hr className="h-px my-8 bg-gray-700 dark:bg-gray-200" />
      <NeutralNCText
        text="Listado de Cursos Disponibles"
        className="cf-text-principal-180 mb-[2rem] md:mb-9"
        fontSize="md"
      />
      {affiliation === MPAC_API_USER_TYPE.ACTIVE_WORKER ||
      affiliation === MPAC_API_USER_TYPE.BENEFICIARY ? (
        renderActiveWorkerCourses()
      ) : affiliation === MPAC_API_USER_TYPE.CESANT ? (
        renderUnemployedUserCourses()
      ) : affiliation === MPAC_API_USER_TYPE.UNIVERSAL ? (
        renderGeneralUserCourses()
      ) : (
        <Description
          text="No tienes cursos asignados en este momento."
          className="block mb-[2rem] md:mb-9"
        />
      )}

      {inscriptionModal &&
        inscriptionSchedule &&
        (inscriptionCourse || inscriptionCourseActive) && (
          <ModalCourseInscription
            title="Inscripción a capacitación"
            course={inscriptionCourse}
            courseType={inscriptionCourseActive}
            schedule={inscriptionSchedule}
            description={"Verifica la información del curso"}
            primaryButtonText="Inscribirse"
            onPrimaryClick={() => {
              registerUserInCourse();
            }}
            SecondaryButtonText="Cancelar"
            onSecondaryClick={() => {
              setInscriptionModal(false);
            }}
          />
        )}

      {/* Modal de error */}
      {errorModal && (
        <ModalEmployability
          title="Fortalecimiento Profesional"
          description={errorModalMessage}
          primaryButtonText="Aceptar"
          onPrimaryClick={() => {
            setErrorModal(false);
          }}
          onSecondaryClick={() => {
            setErrorModal(false);
          }}
          hideSecondaryButton
        />
      )}
      {/* Modal de error MPAC*/}
      {mpacModalError && (
        <Modal
          title="Información."
          description={mpacModalMessage}
          primaryButtonText="Aceptar"
          onPrimaryClick={() => {
            setMpacModalError(false);
          }}
          onSecondaryClick={() => {
            setMpacModalError(false);
          }}
          hideSecondaryButton
        />
      )}

      <div className="flex-auto flex items-center">
        <a
          onClick={previousSteep}
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
    </div>
  );
};
