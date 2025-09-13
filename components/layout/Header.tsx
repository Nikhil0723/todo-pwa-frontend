import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import SideBarMenu from "../SideBarMenu";
import { ScrollArea } from "../ui/scroll-area";

export default function Header() {
  return (
    <div className=" flex justify-between p-5 items-center">
      <div>
        <h1 className="text-white">TODO app</h1>
      </div>
      <Sheet>
        <SheetTrigger>
          {" "}
          <Avatar className=" h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent className="bg-zinc-700">
          <ScrollArea className=" h-[100vh]">
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <SideBarMenu />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
