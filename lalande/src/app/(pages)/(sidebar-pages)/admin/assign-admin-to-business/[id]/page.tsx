import { AssignAdminToBusiness } from "presentation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function AssingConsultantToBusinessPage({ params }: PageProps) {
  return <AssignAdminToBusiness id={params.id} />;
}
