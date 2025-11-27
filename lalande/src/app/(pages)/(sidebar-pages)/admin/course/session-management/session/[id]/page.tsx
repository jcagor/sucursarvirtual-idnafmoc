import { Session } from "presentation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function SessionManagementPage({ params }: PageProps) {
  return <Session session_id={params.id} />;
}
