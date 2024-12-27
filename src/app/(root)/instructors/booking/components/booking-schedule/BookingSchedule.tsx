import { CalendarIcon, MapPinIcon, Timer } from 'lucide-react';
import { FC } from 'react';


const BookingSchedule: FC = () => {

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Booking Schedule</h2>
            <div className="space-y-3 border-y py-2">
                <div className="flex items-center justify-between">
                    <p className="flex items-start gap-2">
                        <CalendarIcon className="size-5 text-primary mt-0.5" />
                        December 10, 2024 at 10:00
                    </p>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='flex items-center gap-2'>
                        <Timer className='size-5 text-primary' /> 2 hours
                    </p>
                    <p className="flex items-center gap-2">
                        <MapPinIcon className="size-5 text-primary mt-0.5" />
                        Alexandria, NSW 2015
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookingSchedule;