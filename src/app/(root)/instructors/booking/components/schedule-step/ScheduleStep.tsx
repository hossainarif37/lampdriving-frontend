import { FC, useEffect, useState } from 'react';
import ScheduleCalender from './ScheduleCalender';
import ScheduleTimeSlots from './ScheduleTimeSlots';
import PickupLocation from './PickupLocation';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useBooking } from '@/providers/BookingProvider';
import DropOffLocation from './DropOffLocation';
import { IWorkingHour } from '@/types/instructor';
import { CircleAlert } from 'lucide-react';
import { useGetInstructorAvailabilityQuery } from '@/redux/api/scheduleApi/scheduleApi';
import { IScheduleInputs } from '@/types/schedule';
import { IAddress } from '@/types/user';

interface ISelectedSchedule {
    date: Date | null;
    time: string[] | null;
    duration: number;
    pickupAddress: IAddress;
    dropOffAddress: IAddress;
    type: "lesson" | "test" | "mock-test" | "blank";
}

const ScheduleStep: FC = () => {
    const { setSchedules, instructor, schedules, availableScheduleHours, testPackage, isTestPackageSelected, isAllScheduled } = useBooking();
    const [selectedSchedule, setSelectedSchedule] = useState<ISelectedSchedule>({
        date: null,
        time: null,
        duration: availableScheduleHours ? 1 : (testPackage.included && !isTestPackageSelected) ? 2 : 0,
        pickupAddress: { address: '', suburb: '' },
        dropOffAddress: { address: '', suburb: '' },
        type: availableScheduleHours ? "lesson" : (testPackage.included && !isTestPackageSelected) ? "test" : "lesson"
    });
    const [bookedTimeSlots, setBookedTimeSlots] = useState<string[]>([]);
    const [scheduleTimeSlots, setScheduleTimeSlots] = useState<string[]>([]);
    const { data } = useGetInstructorAvailabilityQuery({ id: instructor?._id || "" });
    const [workingHour, setWorkingHour] = useState<{ isActive: boolean, startTime: string, endTime: string }>({ isActive: false, startTime: '', endTime: '' });
    const [pickupLocationError, setPickupLocationError] = useState<{ address: boolean, suburb: boolean }>({ address: false, suburb: false });
    const [dropOffLocationError, setDropOffLocationError] = useState<{ address: boolean, suburb: boolean }>({ address: false, suburb: false });


    // add schedule handler
    const handleAddSchedule = () => {
        if (!selectedSchedule.date || !selectedSchedule.time) {
            return;
        }
        if (selectedSchedule.pickupAddress?.address === '' || selectedSchedule.pickupAddress?.suburb === '') {
            setPickupLocationError({ address: selectedSchedule.pickupAddress?.address === '', suburb: selectedSchedule.pickupAddress?.suburb === '' });
            return;
        } else {
            setPickupLocationError({ address: selectedSchedule.pickupAddress?.suburb === '', suburb: selectedSchedule.pickupAddress?.suburb === '' });
        }

        if (selectedSchedule.type === "test" && (selectedSchedule.dropOffAddress?.address === '' || selectedSchedule.dropOffAddress?.suburb === '')) {
            setDropOffLocationError({ address: selectedSchedule.dropOffAddress?.address === '', suburb: selectedSchedule.dropOffAddress?.suburb === '' });
            return;
        } else if (selectedSchedule.type === "test") {
            setDropOffLocationError({ address: selectedSchedule.dropOffAddress?.suburb === '', suburb: selectedSchedule.dropOffAddress?.suburb === '' });
        }

        const schedule: IScheduleInputs = {
            date: new Date(selectedSchedule.date && selectedSchedule.time ? format(selectedSchedule.date, 'yyyy-MM-dd') + ' ' + selectedSchedule.time[0] : ''),
            duration: selectedSchedule.duration,
            time: selectedSchedule.time ? selectedSchedule.time : [],
            pickupAddress: selectedSchedule.pickupAddress,
            type: selectedSchedule.type
        }

        if (selectedSchedule.type === "test") {
            schedule.dropOffAddress = selectedSchedule.dropOffAddress;
        }

        // sort schedule by date
        setSchedules((pre) => [...pre, schedule].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));

        setSelectedSchedule((pre) => ({ ...pre, time: null }));
    };

    useEffect(() => {
        if (availableScheduleHours > 1) {
            setSelectedSchedule((pre) => ({ ...pre, duration: selectedSchedule.type === "test" ? 1 : selectedSchedule.duration, type: "lesson" }));
            return;
        } else if ((availableScheduleHours) === 1) {
            setSelectedSchedule((pre) => ({ ...pre, duration: 1, type: "lesson" }));
        } else if ((testPackage.included && !isTestPackageSelected) && (availableScheduleHours) === 0) {
            setSelectedSchedule((pre) => ({ ...pre, duration: 2, type: "test" }));
        } else if ((availableScheduleHours) === 0) {
            setSelectedSchedule((pre) => ({ ...pre, duration: 0, type: "lesson" }));
        }
    }, [availableScheduleHours, isTestPackageSelected, testPackage.included, schedules])

    useEffect(() => {
        if (!selectedSchedule.date) {
            setBookedTimeSlots([]);
        }
        const bookedSlots = data?.data.schedules.find((schedule: { date: string, time: string[] }) => {
            return format(schedule.date, 'yyyy-MM-dd') === format(selectedSchedule.date!, 'yyyy-MM-dd');
        });

        let slotArr: string[] = [];
        schedules.map((schedule: { date: Date, time: string[] }) => {
            if (format(schedule.date, 'yyyy-MM-dd') === format(selectedSchedule.date!, 'yyyy-MM-dd')) {
                slotArr = [...slotArr, ...schedule.time];
            }
        })

        setBookedTimeSlots([...bookedSlots?.time || '', ...slotArr]);
    }, [data?.data.schedules, selectedSchedule.date, schedules]);


    useEffect(() => {
        if (selectedSchedule.date && instructor?.workingHour) {
            const dateName = (format(selectedSchedule.date, 'cccc')).toLowerCase() as keyof IWorkingHour;
            if (instructor?.workingHour) {
                setWorkingHour(instructor?.workingHour[dateName]);
            }
        }
    }, [instructor?.workingHour, selectedSchedule.date]);

    useEffect(() => {
        setPickupLocationError({ address: false, suburb: false });
        setDropOffLocationError({ address: false, suburb: false });
    }, [selectedSchedule.pickupAddress, selectedSchedule.dropOffAddress]);

    const handleDuration = (duration: 1 | 2, type: "lesson" | "test" | "mock-test") => {
        setSelectedSchedule((pre) => ({ ...pre, duration, type, time: null }));
    }

    const handleSelectDate = (date: Date) => {
        setSelectedSchedule((pre) => ({ ...pre, date, time: null }));
    }

    const handleSelectTime = (time: string[]) => {
        setSelectedSchedule((pre) => ({ ...pre, time }));
    }

    const handleSelectPickupLocation = (location: IAddress) => {
        setSelectedSchedule((pre) => ({ ...pre, pickupAddress: location }));
    }

    const handleSelectDropOffLocation = (location: IAddress) => {
        setSelectedSchedule((pre) => ({ ...pre, dropOffAddress: location }));
    }

    let isDisable = (selectedSchedule.duration > availableScheduleHours) || !selectedSchedule.date || !selectedSchedule.time;
    if (testPackage.included) {
        if (!isTestPackageSelected) {
            isDisable = false;
        }
    }
    return (
        <div className="space-y-6 sticky top-10">
            <div className="md:grid space-y-4 sm:space-y-6 md:space-y-0 grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-6 col-span-2">
                    <div className="bg-white rounded-lg shadow-sm  p-4 lg:p-6 border border-gray-200 relative">
                        <h2 className="text-lg font-semibold mb-4">Select Duration</h2>
                        <div className="flex gap-4 flex-wrap">
                            {[1, 2].map((duration) => (
                                <button
                                    key={duration}
                                    disabled={duration > availableScheduleHours}
                                    onClick={() => handleDuration(duration as 1 | 2, "lesson")}
                                    className={`flex-1 py-2 px-4 rounded-[4px] border disabled:text-gray-500 ${(selectedSchedule.duration === duration && selectedSchedule.type === "lesson")
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : 'border-gray-200 hover:border-primary/70'
                                        }`}
                                >
                                    {duration}-Hour Lesson
                                </button>
                            ))}
                            <button
                                disabled={!testPackage.included || isTestPackageSelected}
                                onClick={() => handleDuration(2, "test")}
                                className={`flex-1 py-2 px-4 rounded-[4px] disabled:text-gray-500 border ${selectedSchedule.type === "test"
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-gray-200 hover:border-primary/70'
                                    }`}
                            >
                                Test Package
                            </button>
                        </div>
                        <button title={availableScheduleHours === 0 ? 'No hours left to schedule' : `Add more ${availableScheduleHours} ${availableScheduleHours === 1 ? 'hour' : 'hours'} schedules`} className='absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2'>
                            <span className='text-sm'>{availableScheduleHours}-Hours left</span>
                            <CircleAlert size={16} />
                        </button>
                    </div>
                </div>

                <div>
                    <ScheduleCalender
                        schedules={schedules}
                        bookedSchedules={data?.data.schedules || []}
                        workingHours={instructor?.workingHour || null}
                        selectedDate={selectedSchedule.date}
                        onSelectDate={handleSelectDate}
                        isAllScheduled={isAllScheduled}
                    />
                </div>
                <div>
                    <ScheduleTimeSlots
                        availableScheduleHours={availableScheduleHours}
                        workingHour={workingHour}
                        scheduleTimeSlots={scheduleTimeSlots}
                        setScheduleTimeSlots={setScheduleTimeSlots}
                        bookedTimeSlots={bookedTimeSlots}
                        selectedDuration={selectedSchedule.duration}
                        selectedTime={selectedSchedule.time}
                        onSelectTime={handleSelectTime}
                        selectedDate={selectedSchedule.date}
                        isAllScheduled={isAllScheduled}
                    />
                </div>

                <div className={`${selectedSchedule.type === "test" ? 'col-span-1' : 'col-span-2'}`}>
                    <PickupLocation
                        error={pickupLocationError}
                        value={selectedSchedule.pickupAddress}
                        onChange={handleSelectPickupLocation}
                    />
                </div>
                {
                    selectedSchedule.type === "test" &&
                    <div>
                        <DropOffLocation
                            error={dropOffLocationError}
                            value={selectedSchedule.dropOffAddress}
                            onChange={handleSelectDropOffLocation}
                        />
                    </div>
                }
                <div className='col-span-2'>
                    <Button disabled={isDisable || (selectedSchedule.duration === 0)} onClick={handleAddSchedule} className='w-full'>
                        {selectedSchedule.type === "test" ? "Add Test Schedule" : "Add Lesson Schedule"}
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default ScheduleStep;