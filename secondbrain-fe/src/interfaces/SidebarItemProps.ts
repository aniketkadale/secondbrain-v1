import { ReactElement } from "react";

export interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  onClick?: () => void;
}
