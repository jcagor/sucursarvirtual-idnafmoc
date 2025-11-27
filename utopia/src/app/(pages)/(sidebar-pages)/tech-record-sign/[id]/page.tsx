import { TechCertRevisionTemplate } from "presentation";



interface PageProps {
  params: {
    id: string;
  };
}

export default function TechCertEditPage({ params }: PageProps) {
  return <TechCertRevisionTemplate id={params.id} />;
}
