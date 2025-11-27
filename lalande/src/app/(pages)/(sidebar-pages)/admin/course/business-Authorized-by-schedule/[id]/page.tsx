import { ScheduleAuthorizedBusiness } from "presentation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function BusinessAuthorizedBySchedulePage({
  params,
}: PageProps) {
  return <ScheduleAuthorizedBusiness id={params.id} />;
}
