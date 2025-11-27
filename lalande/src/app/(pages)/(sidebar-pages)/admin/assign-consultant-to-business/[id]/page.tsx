import { AssignConsultantToBusiness } from "presentation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function AssingConsultantToBusinessPage({ params }: PageProps) {
  return <AssignConsultantToBusiness id={params.id} />;
}
