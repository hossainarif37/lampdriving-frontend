import { FC } from 'react';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];


const BookingCalendar: FC = () => {
    const currentDate = new Date();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const renderCalendarDays = () => {
        const days = [];

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10" />);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(
                <button
                    key={day}
                    className="h-10 w-10 rounded-full hover:bg-blue-100 transition-colors duration-200 
                     flex items-center justify-center mx-auto
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-primary">
                    {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-2">
                {DAYS.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {renderCalendarDays()}
            </div>
        </div>
    );
};

export default BookingCalendar;




// import React from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface CalendarProps {
//     selectedDate: Date | null;
//     onDateSelect: (date: Date) => void;
// }

// export function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
//     const [currentMonth, setCurrentMonth] = React.useState(new Date());

//     const daysInMonth = new Date(
//         currentMonth.getFullYear(),
//         currentMonth.getMonth() + 1,
//         0
//     ).getDate();

//     const firstDayOfMonth = new Date(
//         currentMonth.getFullYear(),
//         currentMonth.getMonth(),
//         1
//     ).getDay();

//     const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
//     const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//     const prevMonth = () => {
//         setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
//     };

//     const nextMonth = () => {
//         setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
//     };

//     return (
//         <div className="w-full bg-white p-8 max-w-2xl mx-auto">
//             <div className="flex items-center justify-between mb-4">
//                 <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full">
//                     <ChevronLeft className="h-5 w-5" />
//                 </button>
//                 <h3 className="font-medium">
//                     {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
//                 </h3>
//                 <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
//                     <ChevronRight className="h-5 w-5" />
//                 </button>
//             </div>

//             <div className="grid grid-cols-7 gap-1 mb-2">
//                 {weekDays.map(day => (
//                     <div key={day} className="text-center text-sm font-medium text-gray-500">
//                         {day}
//                     </div>
//                 ))}
//             </div>

//             <div className="grid grid-cols-7 gap-1">
//                 {Array(firstDayOfMonth).fill(null).map((_, index) => (
//                     <div key={`empty-${index}`} />
//                 ))}
//                 {days.map(day => {
//                     const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
//                     const isSelected = selectedDate?.toDateString() === date.toDateString();
//                     const isToday = new Date().toDateString() === date.toDateString();

//                     return (
//                         <button
//                             key={day}
//                             onClick={() => onDateSelect(date)}
//                             className={`
//                 aspect-square flex items-center justify-center p-2 text-sm rounded-full
//                 hover:bg-blue-50 hover:text-blue-600
//                 ${isSelected ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white' : ''}
//                 ${isToday && !isSelected ? 'bg-blue-50 text-blue-600' : ''}
//               `}
//                         >
//                             {day}
//                         </button>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }