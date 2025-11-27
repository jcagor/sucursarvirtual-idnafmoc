/*
  Warnings:

  - The primary key for the `CourseHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `logged_user` on the `CurriculumInformation` table. All the data in the column will be lost.
  - You are about to drop the column `logged_user` on the `SiseNotRegistered` table. All the data in the column will be lost.
  - You are about to drop the column `course_responsible` on the `TrainingCourse` table. All the data in the column will be lost.
  - You are about to drop the `CourseInscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseResponsible` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobOffer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobPostulation ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LoggedUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `identification_number` to the `CurriculumInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identification_type` to the `CurriculumInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identification_number` to the `SiseNotRegistered` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identification_type` to the `SiseNotRegistered` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_type` to the `TrainingCourse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseInscription" DROP CONSTRAINT "LoggedUser_fkey";

-- DropForeignKey
ALTER TABLE "CourseInscription" DROP CONSTRAINT "TrainigCourse_fkey";

-- DropForeignKey
ALTER TABLE "CurriculumInformation" DROP CONSTRAINT "LoggedUser_fkey";

-- DropForeignKey
ALTER TABLE "JobPostulation " DROP CONSTRAINT "LoggedUser_fkey";

-- DropForeignKey
ALTER TABLE "JobPostulation " DROP CONSTRAINT "jobOffer_fkey";

-- DropForeignKey
ALTER TABLE "SiseNotRegistered" DROP CONSTRAINT "LoggedUser_fkey";

-- DropForeignKey
ALTER TABLE "TrainingCourse" DROP CONSTRAINT "CourseResponsible_fkey";

-- AlterTable
ALTER TABLE "CourseHistory" DROP CONSTRAINT "CourseHistory_pkey",
ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CourseHistory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CourseHistory_id_seq";

-- AlterTable
ALTER TABLE "CurriculumInformation" DROP COLUMN "logged_user",
ADD COLUMN     "complete" BOOLEAN,
ADD COLUMN     "download_link" TEXT,
ADD COLUMN     "identification_number" TEXT NOT NULL,
ADD COLUMN     "identification_type" TEXT NOT NULL,
ADD COLUMN     "state" BOOLEAN;

-- AlterTable
ALTER TABLE "SiseNotRegistered"
DROP COLUMN "logged_user",
ADD COLUMN     "edcmfndi" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "email_verified" BOOLEAN,
ADD COLUMN     "family_name" TEXT,
ADD COLUMN     "given_name" TEXT,
ADD COLUMN     "identification_number" TEXT NOT NULL,
ADD COLUMN     "identification_type" TEXT NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "state" BOOLEAN;

-- AlterTable
ALTER TABLE "TrainingCourse" DROP COLUMN "course_responsible",
ADD COLUMN     "course_type" TEXT NOT NULL;

-- DropTable
DROP TABLE "CourseInscription";

-- DropTable
DROP TABLE "CourseResponsible";

-- DropTable
DROP TABLE "JobOffer";

-- DropTable
DROP TABLE "JobPostulation ";

-- DropTable
DROP TABLE "LoggedUser";

-- CreateTable
CREATE TABLE "CourseType" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,

    CONSTRAINT "CourseType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AbilityType" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "AbilityType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectAffirmative" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "option" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectAffirmative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectKnowledgeAndSkills" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectKnowledgeAndSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectLanguage" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "language" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectLanguageLevel" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "level" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectLanguageLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectStudyType" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "type" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectStudyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectWorkRole" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "role" TEXT,
    "denomination_code" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectWorkRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobOfferPostulation" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "document_type" TEXT NOT NULL,
    "document_number" TEXT NOT NULL,
    "job_offer_id" TEXT NOT NULL,
    "postulation_status" TEXT,
    "information" JSON NOT NULL,
    "state" BOOLEAN,

    CONSTRAINT "JobOfferPostulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechAssistanceRecord" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "appointment_id" TEXT NOT NULL,
    "information" JSON NOT NULL,
    "identification_type" TEXT NOT NULL,
    "identification_number" TEXT NOT NULL,
    "download_links" JSON,
    "state" BOOLEAN,

    CONSTRAINT "TechAssistanceRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrainingCourse" ADD CONSTRAINT "CourseType_fkey" FOREIGN KEY ("course_type") REFERENCES "CourseType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SelectKnowledgeAndSkills" ADD CONSTRAINT "AbilityType_fkey" FOREIGN KEY ("type") REFERENCES "AbilityType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
