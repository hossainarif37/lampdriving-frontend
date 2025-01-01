import { useEffect, useState } from 'react';
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
}


const ScheduleTimeSlots: FC<ScheduleTimeSlotsProps> = ({ selectedTime, onSelectTime, selectedDate, selectedDuration, bookedTimeSlots, classname, btnClassname }) => {
    const [disabledTimeSlots, setDisabledTimeSlots] = useState<string[]>([]);
    const startTime = "10:00";
    const endTime = "16:30";

    const getTimeSlots = (start: string, end: string) => {
        const startDate = new Date(`1970-01-01T${start}:00`);
        const endDate = new Date(`1970-01-01T${end}:00`);
        const timeSlots = [];

        while (startDate <= endDate) {
            const hour = (startDate.getHours() % 12 || 12).toString().padStart(2, '0');
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
            const duration = selectedDuration == 1 ? 1 : selectedDuration == 1.5 ? 2 : 3;
            let notFoundSlots = 0;
            for (let i = 0; i < duration; i++) {
                const nextSlot = scheduleTimeSlots[index + i + 1];
                if (nextSlot && !disabledTimeSlots.includes(nextSlot)) {
                    selectedTimeList.push(nextSlot);
                } else {
                    notFoundSlots++;
                }
            }
            for (let i = 1; i <= notFoundSlots; i++) {
                const prevSlot = scheduleTimeSlots[index - i];
                if (prevSlot && !disabledTimeSlots.includes(prevSlot)) {
                    selectedTimeList.push(prevSlot);
                }
            }
        }

        // sort timeslots
        selectedTimeList.sort((a, b) => {
            const parseTime = (timeStr: string) => {
                const [time, modifier] = timeStr.split(' ');
                let [hours, minutes] = time.split(':').map(Number);
                if (modifier === 'PM' && hours !== 12) {
                    hours += 12;
                } else if (modifier === 'AM' && hours === 12) {
                    hours = 0;
                }
                return hours * 60 + minutes;
            };

            return parseTime(a) - parseTime(b);
        });
        onSelectTime(selectedTimeList);
    }

    useEffect(() => {
        setDisabledTimeSlots(bookedTimeSlots);
        const duration = selectedDuration == 1 ? 1 : selectedDuration == 1.5 ? 2 : 3;
        for (let i = 0; i < scheduleTimeSlots.length; i++) {
            const index = scheduleTimeSlots.indexOf(scheduleTimeSlots[i]);
            let flag = 0;
            let notFoundSlots = 0;
            for (let i = 0; i < duration; i++) {
                const nextSlot = scheduleTimeSlots[index + i + 1];
                if (nextSlot && !bookedTimeSlots.includes(nextSlot)) {
                    flag++;
                    continue;
                } else {
                    notFoundSlots++;
                }
            }
            for (let i = 1; i <= notFoundSlots; i++) {
                const prevSlot = scheduleTimeSlots[index - i];
                if (prevSlot && !bookedTimeSlots.includes(prevSlot)) {
                    flag++;
                }
            }
            if (flag !== duration) {
                setDisabledTimeSlots(pre => [...pre, scheduleTimeSlots[i]]);
            }
        }
    }, [selectedDate, selectedDuration, bookedTimeSlots]);




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
                            Available Times for {format(selectedDate, 'MMMM d, yyyy')}
                        </h2>
                        <div className='h-[244px] overflow-y-auto thin-scrollbar'>
                            <div className="grid grid-cols-2 gap-3">
                                {scheduleTimeSlots.map(time => {
                                    const isDisabled = disabledTimeSlots.includes(time);
                                    return <button
                                        key={time}
                                        disabled={isDisabled}
                                        onClick={() => handleSelectTimes(time)}
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
                                        <span className='w-20'>
                                            {time}
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