"use client";

import React, { useState, useEffect } from "react";

import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ko } from "date-fns/locale";
import { parse, format, subDays, subMonths } from "date-fns";

export function DatePickerDemo({ property, setProperty, keyList }) {
  const [date, setDate] = useState(
    property[keyList] ? property[keyList] : null
  );
  useEffect(() => {
    setDate(property[keyList]);
  }, [property, keyList]);

  if (!property) {
    console.log("property ", property);
    return;
  }

  console.log("keyList", keyList);
  console.log("property in DatePickerDemo", property);
  const handleDateChange = (date) => {
    console.log("in handleDateChange");
    console.log("in handleDateChange", date, formatDateString(date));
    setProperty({ ...property, [keyList]: formatDateString(date) });
    setDate(date);
  };
  const formatDate = (date) => {
    console.log("in formatDate", date, typeof date);
    if (date === "즉시" || date === "협의") return date;
    else if (typeof date === "string") {
      const parsedDate = parse(date, "yyyyMMdd", new Date());
      return format(parsedDate, "yyyy년 MM월 dd일 이후", { locale: ko });
    }

    const returnDate = format(date, "yyyy년 MM월 dd일 이후", { locale: ko });
    console.log("returnDate", returnDate);
    return date ? returnDate : "날짜를 선택하세요";
  };
  const formatDateString = (date) => {
    if (typeof date === "string") return date;
    return date ? format(date, "yyyyMMdd") : "";
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[220px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatDate(date) : <span>입주할 날짜를 골라주세요</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
