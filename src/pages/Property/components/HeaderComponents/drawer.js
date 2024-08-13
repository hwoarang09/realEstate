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

export function DrawerDemo({ handleLogout, direction }) {
  let classNameDefault =
    "bg-background flex flex-col h-3/4 w-[300px] right-0 top-0 ";

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
          <DrawerTitle>오픈닥터</DrawerTitle>
          <DrawerDescription>오픈닥터 솔루션</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <div className="flex items-center justify-starts space-x-2">
            매물찾기
          </div>
          <div className="flex items-center justify-starts space-x-2">
            고객관리
          </div>
          <div className="flex items-center justify-starts space-x-2">
            입지분석
          </div>
          <div className="flex items-center justify-starts space-x-2">
            매물추천
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button onClick={handleLogout}>LogOut</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
