import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { addDays, format, isSameDay, isWithinInterval } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function DatePickerWithRange({
  className,
  property,
  setProperty,
  keyList,
}) {
  const [date, setDate] = useState({
    // from: new Date(2022, 0, 20),
    // to: addDays(new Date(2022, 0, 20), 20),
    from: property?.from_updated_date
      ? new Date(property.from_updated_date)
      : null,
    to: property?.to_updated_date ? new Date(property.to_updated_date) : null,
  });

  useEffect(() => {
    if (property) {
      setDate({
        from: property.from_updated_date
          ? new Date(property.from_updated_date)
          : null,
        to: property.to_updated_date
          ? new Date(property.to_updated_date)
          : null,
      });
    }
  }, [property]);
  const handleSelect = (selectedRange) => {
    console.log("handleSelect", selectedRange);
    if (selectedRange) {
      setDate(selectedRange);
      setProperty((prevProperty) => ({
        ...prevProperty,
        from_updated_date: selectedRange.from,
        to_updated_date: selectedRange.to,
        tmpSortDate: null,
      }));
    }
  };
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>전체</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <DayPicker
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={1}
            modifiers={{
              start: date.from,
              end: date.to,
              inRange: date.from &&
                date.to && {
                  from: addDays(date.from, 1),
                  to: addDays(date.to, -1),
                },
            }}
            modifiersStyles={{
              start: {
                backgroundColor: "black",
                color: "white",
                borderRadius: "4px 0 0 4px",
                border: "2px solid black",
              },
              end: {
                backgroundColor: "black",
                color: "white",
                borderRadius: "0 4px 4px 0",
                border: "2px solid black",
              },
              inRange: {
                backgroundColor: "lightgray",
                color: "black",
              },
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
