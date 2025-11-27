import { ListRegisteredEmployees } from "presentation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ListRegisteredEmployeesPage({ params }: PageProps) {
  return <ListRegisteredEmployees id={params.id} />;
}
