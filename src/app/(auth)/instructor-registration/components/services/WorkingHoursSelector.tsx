"use client"

import { useState, useEffect } from "react"
import { Clock, ChevronDown} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"

interface WorkingHoursProps {
  onUpdate?: (schedule: ISchedule) => void;
  schedule: ISchedule;
  setSchedule: React.Dispatch<React.SetStateAction<ISchedule>>;
  setWorkingHoursError: React.Dispatch<React.SetStateAction<string>>;
}

const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2)
  const minute = i % 2 === 0 ? "00" : "30"
  return `${String(hour).padStart(2, "0")}:${minute}`
})

const WorkingHoursSelector: React.FC<WorkingHoursProps> = ({ onUpdate, schedule, setSchedule, setWorkingHoursError }) => {
  const [openDays, setOpenDays] = useState<string[]>([]);
  const [checkboxState, setCheckboxState] = useState<Record<string, boolean>>(
    () => DAYS.reduce((acc, day) => ({ ...acc, [day]: false }), {})
  );

  const toggleDay = (day: string) => {
    setOpenDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const updateSchedule = (day: string, update: Partial<IDaySchedule>) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        ...update,
      },
    }));
    


    // Reset the "Apply to all" checkbox for the day
    if (update.startTime || update.endTime) {
      setCheckboxState((prev) => ({
        ...prev,
        [day]: false,
      }));
    }
  };

  const applyToAll = (sourceDay: string) => {
    const source = schedule[sourceDay];
    setSchedule((prev) => {
      const updated = { ...prev };
      DAYS.forEach((day) => {
        if (day !== sourceDay) {
          updated[day] = { ...source };
        }
      });
      return updated;
    });
  };

  useEffect(() => {
    onUpdate?.(schedule);
  }, [schedule, onUpdate]);

  return (
    <div className="space-y-4 rounded-md border p-4 mt-1">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Schedule</h3>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setOpenDays(openDays.length === DAYS.length ? [] : [...DAYS])
          }
          className="px-5 md:px-10"
        >
          {openDays.length === DAYS.length ? "Collapse all" : "Expand all"}
        </Button>
      </div>

      <div className="divide-y">
        {DAYS.map((day) => (
          <Collapsible
            key={day}
            open={openDays.includes(day)}
            onOpenChange={() => toggleDay(day)}
          >
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <Switch
                  id={`${day}-active`}
                  checked={schedule[day]?.isActive}
                  onCheckedChange={(checked) =>{
                    updateSchedule(day, { isActive: checked });
                    // if (!checked) {
                    //   setWorkingHoursError('At least one working day must be active');
                    // }else{
                    //   setWorkingHoursError('');
                    // }
                  }
                    
                  }
                />
                <Label
                  htmlFor={`${day}-active`}
                  className={cn(
                    "text-sm font-medium capitalize",
                    !schedule[day]?.isActive &&
                      "text-muted-foreground line-through"
                  )}
                >
                  {day}
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button type="button" variant={"outline"} size={"sm"}>
                  {schedule[day]?.isActive && (
                  <span className="text-sm">
                    {schedule[day]?.startTime} - {schedule[day]?.endTime}
                  </span>
                )}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openDays.includes(day) && "rotate-180"
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>

            <CollapsibleContent className="pb-4">
              <div className="mt-2 grid gap-4 rounded-lg bg-light p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <TimeSelect
                    label="Start Time"
                    time={schedule[day]?.startTime}
                    onChange={(value) =>
                      updateSchedule(day, { startTime: value })
                    }
                    disabled={!schedule[day]?.isActive}
                  />
                  <TimeSelect
                    label="End Time"
                    time={schedule[day]?.endTime}
                    onChange={(value) => updateSchedule(day, { endTime: value })}
                    disabled={!schedule[day]?.isActive}
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="checkbox"
                      id={`apply-to-all-${day}`}
                      className="h-4 w-4 rounded cursor-pointer border-gray-300 text-primary focus:ring-primary"
                      checked={checkboxState[day]}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setCheckboxState((prev) => ({
                          ...prev,
                          [day]: isChecked,
                        }));

                        if (isChecked) {
                          applyToAll(day);
                        }
                      }}
                      disabled={!schedule[day]?.isActive}
                    />
                    <Label
                      htmlFor={`apply-to-all-${day}`}
                      className={`text-sm font-medium text-gray-700 ${
                        !schedule[day]?.isActive
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      Apply this schedule to all
                    </Label>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};


// Component for Time Selection with Searchable Command
import { Input } from "@/components/ui/input"
import { IDaySchedule, ISchedule } from "@/types/instructor"
import { DAYS } from "@/constant/days"

function TimeSelect({
  label,
  time,
  onChange,
  disabled,
}: {
  label: string;
  time: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false); // State to manage popover open state

  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      <Popover
        open={isOpen}
        onOpenChange={(open) => setIsOpen(open)} // Update popover state
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"

            disabled={disabled}
            className="w-full text-secondary justify-between"
          >
            <Clock />
            <span>{time || "Select time"}</span>
            <span><ChevronDown /></span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-2">
          <Command>
            <CommandInput placeholder="Search time..." />
            <CommandList>
              {TIME_OPTIONS.map((timeOption) => (
                <CommandItem
                  key={timeOption}
                  onSelect={() => {
                    onChange(timeOption);
                    setIsOpen(false);
                  }}
                >
                  {timeOption}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}


export default WorkingHoursSelector;