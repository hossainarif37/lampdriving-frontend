import { FC, useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, isBefore, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IWorkingHour } from '@/types/instructor';
import { useBooking } from '@/providers/BookingProvider';

interface IScheduleCalenderProps {
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
    classname?: string;
    workingHours: IWorkingHour | null;
    bookedSchedules: { date: string; time: [string]; }[];
}

const ScheduleCalender: FC<IScheduleCalenderProps> = ({ selectedDate, onSelectDate, classname, workingHours, bookedSchedules }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [offDays, setOffDays] = useState<string[]>([]);
    const today = new Date();
    const { instructor, schedules, availableScheduleHours } = useBooking();
    const isNextMonth = isSameDay(startOfMonth(currentMonth), startOfMonth(addMonths(new Date(), 1)));

    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth)
    });

    const goToPreviousMonth = () => {
        setCurrentMonth(new Date());
    };

    const goToNextMonth = () => {
        if (!isNextMonth) {
            setCurrentMonth(addMonths(new Date(), 1));
        }
    };

    // Calculate empty cells before the first day of the month
    const firstDayOfMonth = startOfMonth(currentMonth).getDay();
    const emptyDays = Array(firstDayOfMonth).fill(null);

    useEffect(() => {
        if (workingHours) {
            const offDaysKeys = Object.keys(workingHours) as Array<keyof typeof workingHours>;
            for (const key of offDaysKeys) {
                if (workingHours[key].isActive === false) {
                    setOffDays((pre) => [...pre, key]);
                }
            }
        }
    }, [workingHours]);

    const getTimeSlots = (start: string, end: string) => {
        const startDate = new Date(`1970-01-01T${start}:00`);
        const endDate = new Date(`1970-01-01T${end}:00`);
        const timeSlots = [];

        while (startDate < endDate) {
            const hour = (startDate.getHours() % 12 || 12).toString().padStart(2, '0');
            const minute = startDate.getMinutes().toString().padStart(2, '0');
            const ampm = startDate.getHours() < 12 ? 'AM' : 'PM';
            timeSlots.push(`${hour}:${minute} ${ampm}`);
            startDate.setMinutes(startDate.getMinutes() + 60);
        }

        return timeSlots;
    };


    // for finding the date that is fully booked

    const findFullyBookedDate = (date: Date) => {
        const dateName = (format(date, 'cccc')).toLowerCase() as keyof IWorkingHour;
        if (!instructor?.workingHour) return true;
        const dayWorkingHour = instructor.workingHour[dateName];

        if (!dayWorkingHour?.isActive) {
            return true;
        }

        // get all available slots with working hour
        const availableSlots = getTimeSlots(dayWorkingHour.startTime, dayWorkingHour.endTime);


        if (availableSlots.length === 0) return true;

        // get booked slots from booked schedules
        const bookedSlots = bookedSchedules.find((schedule: { date: string, time: string[] }) => {
            return format(schedule.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
        });

        // get added schedule slots
        let scheduledSlots: string[] = [];
        schedules.forEach((schedule: { date: string, time: string[] }) => {
            if (format(schedule.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) {
                scheduledSlots = [...scheduledSlots, ...schedule.time];
            }
        });


        // get all booked slots
        const totalBookedSlots = [...bookedSlots?.time || [], ...scheduledSlots];

        // normalize time formats for comparison
        const normalizedBookedSlots = totalBookedSlots.map(slot => slot.trim().toUpperCase());
        const normalizedAvailableSlots = availableSlots.map(slot => slot.trim().toUpperCase());


        // for not booking slots
        if (normalizedBookedSlots.length === 0) return false;

        return normalizedAvailableSlots.every(slot =>
            normalizedBookedSlots.includes(slot)
        );
    };

    useEffect(() => {
        for (let i = 0; i < days.length && !selectedDate; i++) {
            const day = days[i];
            const isPastDate = isBefore(day, startOfDay(today));
            const isFullyBooked = findFullyBookedDate(day);
            if (!isFullyBooked && !isPastDate) {
                onSelectDate(day);
                break;
            }
        }
    }, [schedules])

    return (
        <div className={cn("bg-white rounded-lg shadow-sm p-6 border border-gray-200", classname)}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">
                    {format(currentMonth, 'MMMM yyyy')}
                </h2>
                <div className="flex gap-2">
                    <button
                        className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
                        onClick={goToPreviousMonth}
                        disabled={!isNextMonth}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
                        onClick={goToNextMonth}
                        disabled={isNextMonth}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {emptyDays.map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square" />
                ))}
                {days.map(day => {
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    const isTodayDate = isToday(day);
                    const isPastDate = isBefore(day, startOfDay(today));
                    const dayName = (format(day, 'cccc')).toLowerCase();
                    const isOffDay = offDays.includes(dayName);
                    const isFullyBooked = findFullyBookedDate(day);
                    const isDisable = isOffDay || isPastDate || isFullyBooked || availableScheduleHours <= 0;

                    return (
                        <button
                            key={day.toISOString()}
                            onClick={() => !isPastDate && onSelectDate(day)}
                            disabled={isDisable}
                            className={`
                                aspect-square p-2 rounded-[4px] flex items-center justify-center text-sm disabled:opacity-50
                                ${isSelected ? 'bg-primary text-white' :
                                    isTodayDate ? 'bg-primary/5 text-primary' :
                                        isPastDate ? 'text-gray-300 ' :
                                            'hover:bg-gray-50'}
                            `}
                        >
                            {format(day, 'd')}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ScheduleCalender;