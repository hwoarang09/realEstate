import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ko } from "date-fns/locale";
import { parse, format } from "date-fns";

export function DatePickerDemo({ property, setProperty, keyList }) {
  const [date, setDate] = useState(
    property[keyList] ? property[keyList] : null
  );
  useEffect(() => {
    setDate(property[keyList]);
  }, [property, keyList]);

  if (!property) {
    console.log("!property in datepicker", property);
    return;
  }

  if (
    property[keyList].length !== 8 &&
    property[keyList] !== "" &&
    property[keyList] !== "즉시" &&
    property[keyList] !== "협의"
  ) {
    console.log(
      "datepicker에 이상한 데이터 들어옴.",
      property[keyList],
      keyList
    );
    return;
  }
  const handleDateChange = (date) => {
    setProperty({ ...property, [keyList]: formatDateString(date) });
    setDate(date);
  };

  const formatDate = (date) => {
    if (date === "즉시" || date === "협의") return date;
    else if (typeof date === "string" && date.length !== 8) {
      console.log("에러처리중", date);
      return;
    } else if (typeof date === "string" && date.length === 8) {
      const parsedDate = parse(date, "yyyyMMdd", new Date());
      const returnDate = format(parsedDate, "yyyy년 MM월 dd일 이후", {
        locale: ko,
      });
      return returnDate;
    }
    console.log("데이트피커에서 알수 없는 에러", date);
    return;
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
