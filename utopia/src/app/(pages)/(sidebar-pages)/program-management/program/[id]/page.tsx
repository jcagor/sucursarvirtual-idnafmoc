import { ProgramSchedule } from "presentation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProgramSchedulePage({ params }: PageProps) {
  return <ProgramSchedule id={params.id} />;
}
