import { FC, useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, isBefore, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IScheduleCalenderProps {
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
    classname?: string;
}

const ScheduleCalender: FC<IScheduleCalenderProps> = ({ selectedDate, onSelectDate, classname }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const today = new Date();

    const isNextMonth = isSameDay(startOfMonth(currentMonth), startOfMonth(addMonths(new Date(), 1)));

    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth)
    });

    const goToPreviousMonth = () => {
        console.log('first')
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

                    return (
                        <button
                            key={day.toISOString()}
                            onClick={() => !isPastDate && onSelectDate(day)}
                            disabled={isPastDate}
                            className={`
                                aspect-square p-2 rounded-[4px] flex items-center justify-center text-sm
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