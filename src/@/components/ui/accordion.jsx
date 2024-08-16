("use client");

import { cn } from "../../lib/utils";
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(function AccordionItem(
  { className, ...props },
  ref
) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b", className)}
      {...props}
    />
  );
});

AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(function AccordionTrigger(
  { className, children, isActive, ...props },
  ref
) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "text-blue-600 flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline hover:text-blue-600 [&[data-state=open]>svg]:rotate-180",
          isActive ? "text-blue-600" : "text-gray-900",
          className
        )}
        {...props}
      >
        {children}

        <ChevronDown className="h-4 w-4 text-blue-600 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(function AccordionContent(
  { className, children, ...props },
  ref
) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
});

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
