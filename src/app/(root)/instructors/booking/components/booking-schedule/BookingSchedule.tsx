import { useBooking } from '@/providers/BookingProvider';
import { firstLetterUppercase } from '@/utils/firstLetterUppercase';
import { format } from 'date-fns';
import { CalendarIcon, MapPinIcon, NotepadText, Timer, X } from 'lucide-react';
import { FC } from 'react';


const BookingSchedule: FC = () => {
    const { schedules, setSchedules } = useBooking();

    // remove schedule handler
    const handleRemoveSchedule = (index: number) => {
        const updatedSchedules = [...schedules];
        updatedSchedules.splice(index, 1);
        setSchedules(updatedSchedules);
    }
    return (
        <>
            {
                schedules.length > 0 &&
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold mb-4">Booking Schedule</h2>
                    <div className='max-h-[234px] overflow-y-auto thin-scrollbar'>
                        {
                            schedules.map((schedule, index) => (
                                <div key={index} className="space-y-3 border-y py-2 relative group">
                                    <div className="flex items-center justify-between">
                                        <button className='absolute right-0.5 top-0.5 opacity-0 group-hover:opacity-100 duration-150 border rounded-[4px] hover:bg-gray-200 bg-gray-100'
                                            onClick={() => handleRemoveSchedule(index)}>
                                            <X />
                                        </button>
                                        <p className="flex items-start gap-2">
                                            <CalendarIcon className="size-5 text-primary mt-0.5" />
                                            {format(new Date(schedule.date), 'dd-MM-yyyy')} at {schedule.time[0]} for {schedule.duration} {schedule.duration == 2 ? 'Hours' : 'Hour'}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <p className='flex items-center gap-2'>
                                            <NotepadText className='size-5 text-primary' /> {firstLetterUppercase(schedule.type)}
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
                </div>
            }
        </>
    );
};

export default BookingSchedule;