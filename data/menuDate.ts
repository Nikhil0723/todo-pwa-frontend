import { FaBug, FaGithub, FaPlus, FaRegCircleCheck } from "react-icons/fa6";
import {
  MdCategory,
  MdDeleteForever,
  MdDevices,
  MdFileDownload,
  MdLogout,
  MdOutlineInstallDesktop,
} from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { HiMiniUserCircle } from "react-icons/hi2";

export const menuData = {
  pages: [
    { label: "Tasks", icon: FaRegCircleCheck, badge: 2, path: "/" },
    { label: "Add Task", icon: FaPlus, path: "/add" },
    { label: "Categories", icon: MdCategory, path: "/categories" },
    { label: "Purge Tasks", icon: MdDeleteForever, path: "/purge" },
    { label: "Transfer", icon: MdFileDownload, path: "/transfer" },
    { label: "Sync Devices", icon: MdDevices, path: "/sync" },
  ],
  links: [
    {
      label: "Github",
      icon: FaGithub,
      badge: 293,
      badgeType: "star",
      url: "https://github.com",
    },
    {
      label: "Report Issue",
      icon: FaBug,
      badge: 2,
      badgeType: "green",
      url: "https://github.com/issues",
    },
  ],

  settings: [
    { label: "Install App", icon: MdOutlineInstallDesktop, path: "/install" },
    { label: "Logout", icon: MdLogout, color: "red", path: "/logout" },
    { label: "Settings", icon: IoMdSettings, path: "/settings" },
  ],
  user: [
    {
      label: "User",
      icon: HiMiniUserCircle,
      badge: "online",
      color: "purple",
      path: "/user",
    },
  ],
};
