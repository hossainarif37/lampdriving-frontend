import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Clock, XCircle } from 'lucide-react';

interface ScheduleTimeSlotsProps {
    selectedTime: string[] | null;
    onSelectTime: (time: string[]) => void;
    selectedDate: Date | null;
    selectedDuration: number;
    bookedTimeSlots: string[];
    classname?: string;
    btnClassname?: string;
    workingHour: { isActive: boolean, startTime: string, endTime: string }
    scheduleTimeSlots: string[];
    setScheduleTimeSlots: Dispatch<SetStateAction<string[]>>;
    availableScheduleHours: number;
}


const ScheduleTimeSlots: FC<ScheduleTimeSlotsProps> = (props) => {
    const {
        selectedTime,
        onSelectTime,
        selectedDate,
        selectedDuration,
        bookedTimeSlots,
        classname,
        btnClassname,
        availableScheduleHours,
        workingHour, scheduleTimeSlots, setScheduleTimeSlots } = props;


    const isTwoOurSelected = selectedDuration !== 1;

    const startTime = `${workingHour.startTime.split(':')[0].padStart(2, '0')}:${workingHour.startTime.split(':')[1]}`;
    const endTime = `${workingHour.endTime.split(':')[0].padStart(2, '0')}:${workingHour.endTime.split(':')[1]}`;

    const getTimeSlots = (start: string, end: string) => {
        const startDate = new Date(`1970-01-01T${start}:00`);
        const endDate = new Date(`1970-01-01T${end}:00`);
        const timeSlots = [];

        while (startDate <= endDate) {
            const hour = (startDate.getHours() % 12 || 12).toString().padStart(2, '0');
            const minute = startDate.getMinutes().toString().padStart(2, '0');
            const ampm = startDate.getHours() < 12 ? 'AM' : 'PM';
            timeSlots.push(`${hour}:${minute} ${ampm}`);
            startDate.setMinutes(startDate.getMinutes() + 60);
        }
        return timeSlots;
    };

    const handleSelectTimes = (time: string) => {
        const index = scheduleTimeSlots.indexOf(time.split(' - ')[0]);
        if (index !== -1) {
            const startTime = scheduleTimeSlots[index];
            const endTime = scheduleTimeSlots[index + 1];
            if (selectedDuration == 1) {
                onSelectTime([startTime]);
            } else {
                onSelectTime([startTime, endTime]);
            }
        }
    }

    useEffect(() => {
        setScheduleTimeSlots(getTimeSlots(startTime, endTime));
    }, [startTime, endTime]);

    
    return (
        <div className={cn("bg-white rounded-lg shadow-sm p-6 border border-gray-200", classname)}>
            {
                !selectedDate ?
                    <>
                        <h2 className="text-lg font-semibold mb-4">Available Times</h2>
                        <p className="text-gray-500">Please select a date first</p>
                    </>
                    :
                    <>
                        <h2 className="text-lg font-semibold mb-4">
                            {scheduleTimeSlots.slice(0, scheduleTimeSlots.length - (isTwoOurSelected ? 2 : 1)).length === 0 ? `No Available Times ` :
                                'Available Times '}
                            for {format(selectedDate, 'MMMM d, yyyy')}
                        </h2>
                        <div className='h-[244px] overflow-y-auto thin-scrollbar'>
                            <div className="grid grid-cols-1 gap-3">
                                {scheduleTimeSlots.slice(0, scheduleTimeSlots.length - (isTwoOurSelected ? 2 : 1)).map((time, index) => {
                                    const slotIndex = scheduleTimeSlots.indexOf(time);
                                    const isDisabled = (bookedTimeSlots.includes(time) || (isTwoOurSelected && bookedTimeSlots.includes(scheduleTimeSlots[slotIndex + 1])));
                                    const isHidden = (isTwoOurSelected) && (index % 2 !== 0);
                                    if (isHidden) return null;

                                    return <button
                                        key={index}
                                        disabled={isDisabled || availableScheduleHours <= 0}
                                        onClick={() => handleSelectTimes(`${time} - ${scheduleTimeSlots[scheduleTimeSlots.indexOf(time) + 1]}`)}
                                        className={cn(`py-2 px-4 rounded-[4px] border text-sm disabled:opacity-50 flex items-center justify-center
                                        ${selectedTime?.includes(time) ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-gray-200 hover:border-primary/70'}`, btnClassname)}
                                    >
                                        {
                                            isDisabled ?
                                                <XCircle className="w-4 h-4" />
                                                :
                                                <Clock className="w-4 h-4" />
                                        }
                                        <span className='w-40'>
                                            {time} - {scheduleTimeSlots[scheduleTimeSlots.indexOf(time) + (isTwoOurSelected ? 2 : 1)]}
                                        </span>
                                    </button>
                                })}
                            </div>
                        </div>
                    </>
            }
        </div>
    );
};

export default ScheduleTimeSlots;