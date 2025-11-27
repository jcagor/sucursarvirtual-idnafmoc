-- CreateTable
CREATE TABLE "AppointmentHistory" (
    "id" UUID NOT NULL,
    "appointmentId" UUID NOT NULL,
    "oldDate" TIMESTAMP(3) NOT NULL,
    "newDate" TIMESTAMP(3) NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppointmentHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AppointmentHistory" ADD CONSTRAINT "AppointmentHistory_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
