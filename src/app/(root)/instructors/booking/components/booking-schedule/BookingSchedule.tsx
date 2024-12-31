import { useBooking } from '@/providers/BookingProvider';
import { format } from 'date-fns';
import { CalendarIcon, MapPinIcon, Timer } from 'lucide-react';
import { FC } from 'react';


const BookingSchedule: FC = () => {
    const { schedules } = useBooking();
    return (
        <>
            {
                schedules &&
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold mb-4">Booking Schedule</h2>
                    {
                        schedules.map((schedule, index) => (
                            <div key={index} className="space-y-3 border-y py-2">
                                <div className="flex items-center justify-between">
                                    <p className="flex items-start gap-2">
                                        <CalendarIcon className="size-5 text-primary mt-0.5" />
                                        {format(new Date(schedule.date), 'MMMM dd, yyyy')} at {schedule.time[0]}
                                    </p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='flex items-center gap-2'>
                                        <Timer className='size-5 text-primary' /> {schedule.duration == 1.5 ? '1.5-Hours' : `${schedule.duration}-Hours`}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <MapPinIcon className="size-5 text-primary mt-0.5" />
                                        {schedule.pickupAddress.suburb}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </>
    );
};

export default BookingSchedule;