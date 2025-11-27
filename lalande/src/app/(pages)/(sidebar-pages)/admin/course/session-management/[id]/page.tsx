import { SessionManagement } from "presentation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function SessionManagementPage({ params }: PageProps) {
  return <SessionManagement schedule_id={params.id} />;
}
