import { TechCertEditTemplate } from "presentation";


interface PageProps {
  params: {
    id: string;
  };
}

export default function TechCertEditPage({ params }: PageProps) {
  return <TechCertEditTemplate id={params.id} />;
}
