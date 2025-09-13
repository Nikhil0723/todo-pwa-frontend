"use client";
import { menuData } from "@/data/menuDate";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Menu = () => {
  const router = useRouter();

  const handleClick = (route: string) => {
    if (route) {
      router.push(route); // 👈 dynamic route from menuData
    } else if (route) {
      window.open(route, "_blank");
    }
  };

  return (
    <div className=" text-white p-4 space-y-6">
      {/* Pages */}
      <div>
        {menuData.pages.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between p-4 hover:bg-zinc-500 rounded-md cursor-pointer"
            onClick={() => handleClick(item.path)}
          >
            <div className=" flex items-center justify-start gap-4">
              <item.icon className="text-2xl " />
              <span> {item.label}</span>
            </div>
            {item.badge && (
              <span className="bg-purple-600 text-xs px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      <Separator />
      <div>
        {menuData.links.map((item) => (
          <Link
            key={item.label}
            href={item.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 hover:bg-zinc-500 rounded-md cursor-pointer"
          >
            <div className=" flex items-center justify-start gap-4">
              <item.icon className="text-xl" />
              <span> {item.label}</span>
            </div>
            {item.badge && (
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  item.badgeType === "star"
                    ? "bg-yellow-600"
                    : item.badgeType === "green"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>

      <Separator />
      <div>
        {menuData.settings.map((item) => (
          <div
            key={item.label}
            className={`flex items-center justify-between p-4 hover:bg-zinc-500 rounded-md cursor-pointer ${
              item.color === "red" ? "text-red-500" : ""
            }`}
          >
            <div className=" flex items-center justify-start gap-4">
              <item.icon className="text-2xl" />
              <span> {item.label}</span>
            </div>
          </div>
        ))}
      </div>
      <Separator />
      <div>
        {menuData.user.map((item) => (
          <div
            key={item.label}
            className={`flex items-center justify-between p-4 hover:bg-zinc-500 rounded-md cursor-pointer ${
              item.color === "red" ? "text-red-500" : ""
            }`}
          >
            <div className=" flex items-center justify-start gap-4">
              <item.icon className="text-4xl" />
              <span> {item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
