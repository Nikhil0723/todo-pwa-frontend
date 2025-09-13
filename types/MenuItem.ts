import { IconType } from "react-icons";

export interface MenuItem {
  label: string;
  path?: string;
  url?: string;
  badge?: number | string;
  badgeType?: string;
  color?: string;
  actionType?: "route" | "external" | "dialog" | "function";
  action?: string;
  icon: IconType; 
}
