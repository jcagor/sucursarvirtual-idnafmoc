import { ProgramSessionManagement } from "presentation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ScheduleManagementEditPage({ params }: PageProps) {
  return <ProgramSessionManagement id={params.id} />;
}
