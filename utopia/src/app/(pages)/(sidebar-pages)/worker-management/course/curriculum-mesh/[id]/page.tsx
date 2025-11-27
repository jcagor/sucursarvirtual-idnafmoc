import { CurriculumMesh } from "presentation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function CourseAssignEmployeesPage({ params }: PageProps) {
  return <CurriculumMesh id={params.id} />;
}
