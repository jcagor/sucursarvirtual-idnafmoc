import { UpdateProgramSession } from "presentation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ScheduleManagementEditPage({ params }: PageProps) {
  return <UpdateProgramSession id={params.id} />;
}
