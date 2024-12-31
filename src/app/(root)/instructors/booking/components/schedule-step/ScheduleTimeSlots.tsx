import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface ScheduleTimeSlotsProps {
    selectedTime: string[] | null;
    onSelectTime: (time: string[]) => void;
    selectedDate: Date | null;
    selectedDuration: number;
}

import { FC } from 'react';

const ScheduleTimeSlots: FC<ScheduleTimeSlotsProps> = ({ selectedTime, onSelectTime, selectedDate, selectedDuration }) => {
    const [disabledTimeSlots, setDisabledTimeSlots] = useState<string[]>([]);
    const startTime = "10:00";
    const endTime = "16:30";

    const getTimeSlots = (start: string, end: string) => {
        const startDate = new Date(`1970-01-01T${start}:00`);
        const endDate = new Date(`1970-01-01T${end}:00`);
        const timeSlots = [];

        while (startDate <= endDate) {
            const hour = startDate.getHours() % 12 || 12;
            const minute = startDate.getMinutes().toString().padStart(2, '0');
            const ampm = startDate.getHours() < 12 ? 'AM' : 'PM';
            timeSlots.push(`${hour}:${minute} ${ampm}`);
            startDate.setMinutes(startDate.getMinutes() + 30);
        }

        return timeSlots;
    };

    const scheduleTimeSlots = getTimeSlots(startTime, endTime);

    const handleSelectTimes = (time: string) => {
        const selectedTimeList = [];
        const index = scheduleTimeSlots.indexOf(time);
        if (index !== -1) {
            selectedTimeList.push(time);
            if (index < scheduleTimeSlots.length - 1) {
                if (selectedDuration === 1) {
                    selectedTimeList.push(scheduleTimeSlots[index + 1]);
                } else if (selectedDuration === 1.5) {
                    selectedTimeList.push(scheduleTimeSlots[index + 1]);
                    selectedTimeList.push(scheduleTimeSlots[index + 2]);
                }
                else if (selectedDuration === 2) {
                    selectedTimeList.push(scheduleTimeSlots[index + 1]);
                    selectedTimeList.push(scheduleTimeSlots[index + 2]);
                    selectedTimeList.push(scheduleTimeSlots[index + 3]);
                }
            }
        }
        onSelectTime(selectedTimeList);
    }
    const bookedTimeSlots = ["10:30 AM", "11:30 AM"];

    useEffect(() => {
        setDisabledTimeSlots(bookedTimeSlots);
    }, []);

    if (!selectedDate) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Available Times</h2>
                <p className="text-gray-500">Please select a date first</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">
                Available Times for {format(selectedDate, 'MMMM d, yyyy')}
            </h2>
            <div className='h-[244px] overflow-y-auto thin-scrollbar'>
                <div className="grid grid-cols-2 gap-3">
                    {scheduleTimeSlots.map(time => (
                        <button
                            key={time}
                            disabled={bookedTimeSlots.includes(time)}
                            onClick={() => handleSelectTimes(time)}
                            className={`
              py-2 px-4 rounded-[4px] border text-sm
              disabled:opacity-50
              ${selectedTime?.includes(time)
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-gray-200 hover:border-primary/70'}
            `}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScheduleTimeSlots;