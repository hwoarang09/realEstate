import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
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

export function DrawerDemo({ handleLogout }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          {" "}
          <TfiMenu className="w-5 h-5 cursor-pointer" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="fixed inset-y-0 left-0 z-50 w-64 mt-0">
        <DrawerHeader>
          <DrawerTitle>오픈닥터</DrawerTitle>
          <DrawerDescription>오픈닥터 솔루션</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <div className="flex items-center justify-center space-x-2"></div>
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
