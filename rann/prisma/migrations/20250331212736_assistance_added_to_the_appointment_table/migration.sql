-- CreateEnum
CREATE TYPE "Attendance" AS ENUM ('Absent', 'Attended', 'Assigned');

-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN "attendance" "Attendance" NOT NULL;
