import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface TimePickerProps {
  slots: string[];
  selectedTime?: string;
  onSelect: (time: string) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  slots,
  selectedTime,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {slots.map((slot) => (
        <Button
          key={slot}
          variant={selectedTime === slot ? "default" : "outline"}
          className={cn(
            "text-sm",
            selectedTime === slot ? "bg-[#7deb7d] text-black" : "text-[#3ecef7]"
          )}
          onClick={() => onSelect(slot)}
        >
          {slot}
        </Button>
      ))}
    </div>
  );
};

export default TimePicker;
