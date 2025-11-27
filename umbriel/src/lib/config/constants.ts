import { ItemMenuInterface } from "../types/sidebar";

export const sidebarItems: ItemMenuInterface[] = [
  {
    path: "/users-management",
    label: "Gestión de usuarios",
  },
  {
    path: "/my-pime",
    label: "MyPime",
  },
];

export const ADMIN_MENU_OPTIONS = [
  {
    text: "Gestión de usuarios",
    url: "/users-management",
    imageUrl: "/icons/brief-icon.png",
  },
  {
    text: "MyPime",
    url: "/utopia",
    imageUrl: "/icons/job-vacancy.png",
  },
];
