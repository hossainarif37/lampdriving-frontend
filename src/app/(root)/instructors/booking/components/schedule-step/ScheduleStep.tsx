import { FC, useEffect, useState } from 'react';
import ScheduleCalender from './ScheduleCalender';
import ScheduleTimeSlots from './ScheduleTimeSlots';
import PickupLocation from './PickupLocation';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useBooking } from '@/providers/BookingProvider';
import { useGetInstructorAvailabilityQuery } from '@/redux/api/instructorApi/instructorApi';
import DropOffLocation from './DropOffLocation';
import { ISchedule } from '@/types/booking';
import { IWorkingHour } from '@/types/instructor';
import { CircleAlert } from 'lucide-react';


const ScheduleStep: FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string[] | null>(null);
    const [selectedDuration, setSelectedDuration] = useState<1 | 2 | 1.5>(1);
    const [pickupLocation, setPickupLocation] = useState<{ address: string; suburb: string }>({ address: '', suburb: '' });
    const [dropOffLocation, setDropOffLocation] = useState<{ address: string; suburb: string }>({ address: '', suburb: '' });
    const [bookedTimeSlots, setBookedTimeSlots] = useState<string[]>([]);
    const [scheduleTimeSlots, setScheduleTimeSlots] = useState<string[]>([]);
    const { setSchedules, instructor, schedules, avaiableScheduleHours } = useBooking();
    const { data } = useGetInstructorAvailabilityQuery({ id: instructor?._id || "" });
    const [workingHour, setWorkingHour] = useState<{ isActive: boolean, startTime: string, endTime: string }>({ isActive: false, startTime: '', endTime: '' });
    const [pickupLocationError, setPickupLocationError] = useState<{ address: boolean, suburb: boolean }>({ address: false, suburb: false });
    const [dropOffLocationError, setDropOffLocationError] = useState<{ address: boolean, suburb: boolean }>({ address: false, suburb: false });
    // add schedule handler
    const handleAddSchedule = () => {
        if (!selectedDate || !selectedTime) {
            return;
        }
        const testPackage = selectedDuration === 1.5;

        if (pickupLocation?.address === '' || pickupLocation?.suburb === '') {
            setPickupLocationError({ address: pickupLocation?.address === '', suburb: pickupLocation?.suburb === '' });
            return;
        } else {
            setPickupLocationError({ address: pickupLocation?.suburb === '', suburb: pickupLocation?.suburb === '' });
        }

        if (testPackage && (dropOffLocation?.address === '' || dropOffLocation?.suburb === '')) {
            setDropOffLocationError({ address: dropOffLocation?.address === '', suburb: dropOffLocation?.suburb === '' });
            return;
        } else if (testPackage) {
            setDropOffLocationError({ address: dropOffLocation?.suburb === '', suburb: dropOffLocation?.suburb === '' });
        }

        const schedule: ISchedule = {
            date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
            duration: selectedDuration,
            time: selectedTime ? selectedTime : [],
            pickupAddress: {
                address: pickupLocation?.address || '',
                suburb: pickupLocation?.suburb || '',
            }
        }

        if (testPackage) {
            schedule.dropOffAddress = {
                address: dropOffLocation?.address || '',
                suburb: dropOffLocation?.suburb || '',
            }
        }

        setSchedules((pre) => [...pre, schedule]);

        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedDuration(1);
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


    useEffect(() => {
        if (selectedDate && instructor?.workingHour) {
            const dateName = (format(selectedDate, 'cccc')).toLowerCase() as keyof IWorkingHour;
            if (instructor?.workingHour) {
                setWorkingHour(instructor?.workingHour[dateName]);
            }
        }
    }, [instructor?.workingHour, selectedDate]);

    useEffect(() => {
        setPickupLocationError({ address: false, suburb: false });
        setDropOffLocationError({ address: false, suburb: false });
    }, [pickupLocation, dropOffLocation]);

    const handleDuration = (duration: 1 | 2 | 1.5) => {
        setSelectedDuration(duration)
        setSelectedTime(null)
    }
    const handleSelectDate = (date: Date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    }

    return (
        <div className="space-y-6 sticky top-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="space-y-6 col-span-2">
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 relative">
                        <h2 className="text-lg font-semibold mb-4">Select Duration</h2>
                        <div className="flex gap-4">
                            {[1, 2].map((duration) => (
                                <button
                                    key={duration}
                                    disabled={duration > avaiableScheduleHours}
                                    onClick={() => handleDuration(duration as 1 | 2)}
                                    className={`flex-1 py-2 px-4 rounded-[4px] border disabled:text-gray-500 ${selectedDuration === duration
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : 'border-gray-200 hover:border-primary/70'
                                        }`}
                                >
                                    {duration}-Hour Lesson
                                </button>
                            ))}
                            <button
                                disabled={2 > avaiableScheduleHours}
                                onClick={() => handleDuration(1.5)}
                                className={`flex-1 py-2 px-4 rounded-[4px] disabled:text-gray-500 border ${selectedDuration === 1.5
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-gray-200 hover:border-primary/70'
                                    }`}
                            >
                                Test Package
                            </button>
                        </div>
                        <button title={avaiableScheduleHours === 0 ? 'No hours left to schedule' : `Add more ${avaiableScheduleHours} ${avaiableScheduleHours === 1 ? 'hour' : 'hours'} schedules`} className='absolute top-6 right-6 flex items-center gap-2'>
                            <span className='text-sm'>{avaiableScheduleHours}-Hours left</span>
                            <CircleAlert size={16} />
                        </button>
                    </div>
                </div>

                <div>
                    <ScheduleCalender
                        bookedSchedules={data?.data.schedules || []}
                        workingHours={instructor?.workingHour || null}
                        selectedDate={selectedDate}
                        onSelectDate={handleSelectDate}
                    />
                </div>
                <div>
                    <ScheduleTimeSlots
                        workingHour={workingHour}
                        scheduleTimeSlots={scheduleTimeSlots}
                        setScheduleTimeSlots={setScheduleTimeSlots}
                        bookedTimeSlots={bookedTimeSlots}
                        selectedDuration={selectedDuration}
                        selectedTime={selectedTime}
                        onSelectTime={setSelectedTime}
                        selectedDate={selectedDate}
                    />
                </div>

                <div className={`${selectedDuration === 1.5 ? 'col-span-1' : 'col-span-2'}`}>
                    <PickupLocation
                        error={pickupLocationError}
                        value={pickupLocation}
                        onChange={setPickupLocation}
                    />
                </div>
                {
                    selectedDuration === 1.5 &&
                    <div>
                        <DropOffLocation
                            error={dropOffLocationError}
                            value={dropOffLocation}
                            onChange={setDropOffLocation}
                        />
                    </div>
                }
                <div className='col-span-2'>
                    <Button disabled={selectedDuration > avaiableScheduleHours} onClick={handleAddSchedule} className='w-full'>
                        Add Schedule
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default ScheduleStep;