"use client";

import React, { useState, useEffect } from "react";

import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ko } from "date-fns/locale";
import { parse, format } from "date-fns";
export function DatePickerDemo({ property, setProperty }) {
  const [date, setDate] = useState(property?.available_date);
  useEffect(() => {
    setDate(property?.available_date);
  }, [property]);

  if (!property) {
    console.log("property ", property);
    return;
  }

  const handleDateChange = (date) => {
    setProperty({ ...property, available_date: formatDateString(date) });
    setDate(date);
  };
  const formatDate = (date) => {
    if (date === "즉시" || date === "협의") return date;
    else if (typeof date === "string") {
      const parsedDate = parse(date, "yyyyMMdd", new Date());
      return format(parsedDate, "yyyy년 MM월 dd일 이후", { locale: ko });
    }
    return date
      ? format(date, "yyyy년 MM월 dd일 이후", { locale: ko })
      : "날짜를 선택하세요";
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
