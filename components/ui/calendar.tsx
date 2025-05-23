"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className="mx-auto w-[calc(var(--rdp-cell-size)*7)] [--rdp-cell-size:32px] sm:[--rdp-cell-size:40px] md:[--rdp-cell-size:56px] lg:[--rdp-cell-size:64px]">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("w-full", className)}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium text-white",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 text-[#3ecef7] border border-[#3ecef7] hover:text-[#7deb7d] hover:border-[#7deb7d] transition-colors"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "grid grid-cols-7",
          head_cell:
            "text-[#3ecef7] rounded-md font-normal text-[0.8rem] text-center",
          row: "grid grid-cols-7 gap-1 mt-2",
          cell: "text-center text-sm p-0 relative hover:bg-[#3ecef7]/10 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "p-0 font-normal aria-selected:opacity-100 text-white focus:outline-none focus:ring-0 focus:ring-offset-0"
          ),
          day_range_end: "day-range-end",
          day_selected: "bg-[#7deb7d] text-black",
          day_today: "bg-[#3ecef7] text-black",
          day_outside:
            "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        }}
        {...props}
      />
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
