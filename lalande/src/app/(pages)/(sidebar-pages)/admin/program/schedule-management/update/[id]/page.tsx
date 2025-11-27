import { UpdateProgramSchedule } from "presentation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ScheduleManagementEditPage({ params }: PageProps) {
  return <UpdateProgramSchedule id={params.id} />;
}
