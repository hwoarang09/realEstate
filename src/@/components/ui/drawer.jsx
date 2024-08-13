"use client";

import React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "../../lib/utils";

const Drawer = ({ shouldScaleBackground = true, direction, ...props }) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    direction={direction}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef(
  ({ className, children, direction, ...props }, ref) => {
    console.log("DrawerContent className", className);
    console.log("DrawerContent children", children);
    console.log("DrawerContent props", props);
    console.log("DrawerContent direction", direction);

    let x_dir = "";
    if (direction === "right") x_dir = "right-0";
    else if (direction === "left") x_dir = "left-0";

    const classNameDefault =
      "fixed bottom-0 z-50 flex h-auto flex-col border bg-red-500 ";

    return (
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerPrimitive.Content
          ref={ref}
          className={cn(classNameDefault + x_dir, className)}
          {...props}
        >
          <div className="flex h-full">
            {direction === "right" && (
              <>
                <div className="flex justify-center items-center h-full">
                  <div className=" w-2 h-[100px] rounded-full bg-gray-300 ml-1" />
                </div>
                <div className="flex-1 flex flex-col">{children}</div>
              </>
            )}
            {direction === "left" && (
              <>
                {" "}
                <div className="flex-1 flex flex-col">{children}</div>
                <div className="flex justify-center items-center h-full">
                  <div className=" w-2 h-[100px] rounded-full bg-gray-300 mr-1" />
                </div>
              </>
            )}
          </div>
        </DrawerPrimitive.Content>
      </DrawerPortal>
    );
  }
);
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
