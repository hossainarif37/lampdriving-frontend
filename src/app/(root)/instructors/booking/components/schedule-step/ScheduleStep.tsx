import { FC, useEffect, useState } from 'react';
import ScheduleCalender from './ScheduleCalender';
import ScheduleTimeSlots from './ScheduleTimeSlots';
import LocationInput from './PickupLocation';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useBooking } from '@/providers/BookingProvider';
import { IShedule } from '@/types/booking';
import { useGetInstructorAvailabilityQuery } from '@/redux/api/instructorApi/instructorApi';


const ScheduleStep: FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string[] | null>(null);
    const [selectedDuration, setSelectedDuration] = useState<1 | 2 | 1.5>(1);
    const [location, setLocation] = useState<{ address: string; suburb: string }>({ address: '', suburb: '' });
    const [bookedTimeSlots, setBookedTimeSlots] = useState<string[]>([]);

    const { setSchedules, instructor, schedules } = useBooking();
    const { data } = useGetInstructorAvailabilityQuery({ id: instructor?._id || "" });
    const handleAddSchedule = () => {
        if (!selectedDate || !selectedTime) {
            return;
        }
        if (location?.address === '' || location?.suburb === '') {
            return;
        }

        const schedule: IShedule = {
            date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
            duration: selectedDuration,
            time: selectedTime ? selectedTime : [],
            pickupAddress: {
                address: location?.address || '',
                suburb: location?.suburb || '',
            }
        }

        setSchedules((pre) => [...pre, schedule]);

        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedDuration(1);
        setLocation({ address: '', suburb: '' });
    };

    useEffect(() => {
        if (!selectedDate) {
            setBookedTimeSlots([]);
        }
        const bookedSlots = data?.data.schedules.find((schedule: { date: string, time: string[] }) => {
            return format(schedule.date, 'yyyy-MM-dd') === format(selectedDate!, 'yyyy-MM-dd');
        });

        let slotArr: string[] = [];
        schedules.map((schedule: { date: string, time: string[] }) => {
            if (format(schedule.date, 'yyyy-MM-dd') === format(selectedDate!, 'yyyy-MM-dd')) {
                slotArr = [...slotArr, ...schedule.time];
            }
        })
        setBookedTimeSlots([...bookedSlots?.time || '', ...slotArr]);
    }, [data?.data.schedules, selectedDate, schedules]);

    return (
        <div className="space-y-6 sticky top-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="space-y-6 col-span-2">
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h2 className="text-lg font-semibold mb-4">Select Duration</h2>
                        <div className="flex gap-4">
                            {[1, 2].map((duration) => (
                                <button
                                    key={duration}
                                    onClick={() => setSelectedDuration(duration as 1 | 2)}
                                    className={`flex-1 py-2 px-4 rounded-[4px] border ${selectedDuration === duration
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : 'border-gray-200 hover:border-primary/70'
                                        }`}
                                >
                                    {duration}-Hour Lesson
                                </button>
                            ))}
                            <button
                                onClick={() => setSelectedDuration(1.5)}
                                className={`flex-1 py-2 px-4 rounded-[4px] border ${selectedDuration === 1.5
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-gray-200 hover:border-primary/70'
                                    }`}
                            >
                                Test Package
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <ScheduleCalender
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                    />
                </div>
                <div>
                    <ScheduleTimeSlots
                        bookedTimeSlots={bookedTimeSlots}
                        selectedDuration={selectedDuration}
                        selectedTime={selectedTime}
                        onSelectTime={setSelectedTime}
                        selectedDate={selectedDate}
                    />
                </div>

                <div className='col-span-2'>
                    <LocationInput
                        value={location}
                        onChange={setLocation}
                    />
                </div>
                <div className='col-span-2'>
                    <Button onClick={handleAddSchedule} className='w-full'>
                        Add Schedule
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default ScheduleStep;