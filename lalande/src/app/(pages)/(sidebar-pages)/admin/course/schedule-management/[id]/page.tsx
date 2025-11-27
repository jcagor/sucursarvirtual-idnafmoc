import { Schedule } from "presentation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ScheduleManagementEditPage({ params }: PageProps) {
  return <Schedule id={params.id} />;
}
