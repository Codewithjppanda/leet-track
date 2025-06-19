"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardCalendarToggle() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="relative">
      <Button
        className=" bg-[#f3f4f6] text-gray-800 cursor-pointer flex items-center gap-2 shadow-md border border-[#e5e7eb] hover:bg-[#e0e7ff]"
        onClick={() => setShowCalendar((prev) => !prev)}
        type="button"
      >
        <CalendarIcon className="w-4 h-4" />
        {showCalendar ? "Hide Calendar" : "Show Calendar"}
      </Button>
      {showCalendar && (
        <div className="absolute right-0 mt-2 z-50 bg-white border rounded-lg shadow-lg p-4 ">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      )}
    </div>
  );
}
