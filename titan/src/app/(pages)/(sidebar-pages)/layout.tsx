import { SidebarMenu } from "presentation";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarMenu>{children}</SidebarMenu>;
}
