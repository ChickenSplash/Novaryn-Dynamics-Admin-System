import React from "react";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";

interface Calendar24Props {
  date?: Date;
  setDate: (date?: Date) => void;
}

export function Calendar24({ date, setDate }: Calendar24Props) {
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState("10:30:00"); // default time

  // helper: combine date + time into one Date object
  const combineDateTime = (selectedDate?: Date, selectedTime?: string) => {
    if (!selectedDate) return;
    const [hours, minutes, seconds] = (selectedTime || "00:00:00").split(":").map(Number);
    const combined = new Date(selectedDate);
    combined.setHours(hours, minutes, seconds);
    setDate(combined); // send full datetime back up
  };

  return (
    <div className="flex gap-4">
      {/* Date Picker */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          Due Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(selectedDate) => {
                setOpen(false);
                combineDateTime(selectedDate, time);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Picker */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={time}
          onChange={(e) => {
            const newTime = e.target.value;
            setTime(newTime);
            combineDateTime(date, newTime);
          }}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}
