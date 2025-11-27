import { ProgramScheduleManagement } from "presentation/components/templates/Admin/program/ProgramScheduleManagement";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ScheduleManagementEditPage({ params }: PageProps) {
  return <ProgramScheduleManagement id={params.id} />;
}
