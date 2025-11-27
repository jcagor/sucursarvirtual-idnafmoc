import { TechAssistanceCertTemplate } from "presentation";


interface PageProps {
  params: {
    id: string;
  };
}

export default function TechCertEditPage({ params }: PageProps) {
  return <TechAssistanceCertTemplate appId={params.id} />;
}
