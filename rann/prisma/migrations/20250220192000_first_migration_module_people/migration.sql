-- CreateTable
CREATE TABLE "CertificationEntity" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "CertificationEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseInscription" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "logged_user" TEXT,
    "training_course" TEXT,

    CONSTRAINT "CourseInscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseResponsible" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,

    CONSTRAINT "CourseResponsible_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurriculumInformation" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "logged_user" TEXT NOT NULL,
    "information" JSON NOT NULL,

    CONSTRAINT "CurriculumInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormationLine" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,

    CONSTRAINT "FormationLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobOffer" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "information" JSON NOT NULL,

    CONSTRAINT "JobOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobPostulation " (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "logged_user" TEXT NOT NULL,
    "job_offer" TEXT NOT NULL,

    CONSTRAINT "JobPostulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoggedUser" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "identification_number" TEXT NOT NULL,
    "name" TEXT,
    "identification_type" TEXT NOT NULL,
    "given_name" TEXT,
    "family_name" TEXT,
    "email" TEXT,
    "edcmfndi" TEXT,
    "email_verified" BOOLEAN,

    CONSTRAINT "LoggedUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferFrequency" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,

    CONSTRAINT "OfferFrequency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiseNotRegistered" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "logged_user" TEXT NOT NULL,

    CONSTRAINT "SiseNotRegistered_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingCourse" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT,
    "duration_hours" INTEGER,
    "minimum_inscribed" INTEGER,
    "maximum_inscribed" INTEGER,
    "target_population" TEXT,
    "observation" TEXT,
    "course_schedule" TEXT,
    "offer_frequency" TEXT,
    "certification_entity" TEXT,
    "formation_line" TEXT,
    "region" TEXT,
    "course_responsible" TEXT,

    CONSTRAINT "TrainingCourses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseHistory" (
    "id" SERIAL NOT NULL,
    "key" TEXT,
    "document" BIGINT,
    "name" TEXT,
    "course" TEXT,
    "date" TEXT,
    "mode" TEXT,
    "cost" TEXT,
    "type" TEXT,
    "provider" TEXT,
    "year" INTEGER,
    "month" TEXT,

    CONSTRAINT "CourseHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseInscription" ADD CONSTRAINT "LoggedUser_fkey" FOREIGN KEY ("logged_user") REFERENCES "LoggedUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseInscription" ADD CONSTRAINT "TrainigCourse_fkey" FOREIGN KEY ("training_course") REFERENCES "TrainingCourse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumInformation" ADD CONSTRAINT "LoggedUser_fkey" FOREIGN KEY ("logged_user") REFERENCES "LoggedUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPostulation " ADD CONSTRAINT "LoggedUser_fkey" FOREIGN KEY ("logged_user") REFERENCES "LoggedUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPostulation " ADD CONSTRAINT "jobOffer_fkey" FOREIGN KEY ("job_offer") REFERENCES "JobOffer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SiseNotRegistered" ADD CONSTRAINT "LoggedUser_fkey" FOREIGN KEY ("logged_user") REFERENCES "LoggedUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TrainingCourse" ADD CONSTRAINT "CertificationEntity_fkey" FOREIGN KEY ("certification_entity") REFERENCES "CertificationEntity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingCourse" ADD CONSTRAINT "CourseResponsible_fkey" FOREIGN KEY ("course_responsible") REFERENCES "CourseResponsible"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TrainingCourse" ADD CONSTRAINT "FormationLine_fkey" FOREIGN KEY ("formation_line") REFERENCES "FormationLine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingCourse" ADD CONSTRAINT "OfferFrequency_fkey" FOREIGN KEY ("offer_frequency") REFERENCES "OfferFrequency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingCourse" ADD CONSTRAINT "Region_fkey" FOREIGN KEY ("region") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;
