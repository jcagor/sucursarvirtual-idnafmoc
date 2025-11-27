import { AssignEmployees } from "presentation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function CourseAssignEmployeesPage({ params }: PageProps) {
  return <AssignEmployees id={params.id} />;
}
