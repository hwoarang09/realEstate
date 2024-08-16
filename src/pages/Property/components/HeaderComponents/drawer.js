import React from "react";

import { TfiMenu } from "react-icons/tfi";
import { Button } from "../../../../@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../../@/components/ui/drawer";


import VerticalToggleButtons from "./ToggleMenu";

export function DrawerDemo({ handleLogout, direction }) {
  let classNameDefault =
    "bg-background flex flex-col h-full w-[200px] right-0 top-0 ";

  let roundDir = "";
  if (direction === "left") roundDir = "rounded-r-[10px]";
  else if (direction === "right") roundDir = "rounded-l-[10px]";
  return (
    <Drawer direction={direction}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          {" "}
          <TfiMenu className="w-5 h-5 cursor-pointer" />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        direction={direction}
        className={classNameDefault + roundDir}
      >
        <DrawerHeader>
          <DrawerTitle>오픈가게</DrawerTitle>
          <DrawerDescription>오픈가게 솔루션</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 flex justify-between">
          <div>Admin님</div>
          {/* <div>로그아웃</div> */}
        </div>
        <div className="pr-2">
          <VerticalToggleButtons />
        </div>
        <DrawerFooter className="gap-0 pb-3.5 pl-2 pr-0">
          <DrawerClose asChild>
            <Button
              className="bg-white hover:bg-blue-700 text-black border-2 hover:text-white"
              onClick={handleLogout}
            >
              LogOut
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
