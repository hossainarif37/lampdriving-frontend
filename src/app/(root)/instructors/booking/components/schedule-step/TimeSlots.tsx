import React from 'react';
import { format } from 'date-fns';

interface TimeSlotsProps {
    selectedTime: string | null;
    onSelectTime: (time: string) => void;
    selectedDate: Date | null;
}

import { FC } from 'react';

const TimeSlots: FC<TimeSlotsProps> = ({ selectedTime, onSelectTime, selectedDate }) => {

    const timeSlots = [
        '09:00', '10:00', '11:00', '12:00', '13:00',
        '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
    ];

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
                    {timeSlots.map(time => (
                        <button
                            key={time}
                            onClick={() => onSelectTime(time)}
                            className={`
              py-2 px-4 rounded-[4px] border text-sm
              ${selectedTime === time
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

export default TimeSlots;