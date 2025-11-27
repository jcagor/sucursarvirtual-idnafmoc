import { CourseSchedule } from "presentation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function CourseSchedulePage({ params }: PageProps) {
  return <CourseSchedule id={params.id} />;
}
