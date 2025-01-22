"use client"
import { FC, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { IWorkingHour } from '@/types/instructor';
import { useGetInstructorAvailabilityQuery } from '@/redux/api/scheduleApi/scheduleApi';
import ScheduleCalender from '@/app/(root)/instructors/booking/components/schedule-step/ScheduleCalender';
import ScheduleTimeSlots from '@/app/(root)/instructors/booking/components/schedule-step/ScheduleTimeSlots';
import { Button } from '@/components/ui/button';
import { useGetAInstructorQuery } from '@/redux/api/instructorApi/instructorApi';
import { useAppSelector } from '@/redux/hook';


const ManageAvailability: FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [bookedTimeSlots, setBookedTimeSlots] = useState<string[]>([]);
    const [workingHour, setWorkingHour] = useState<{ isActive: boolean, startTime: string, endTime: string }>({ isActive: false, startTime: '', endTime: '' });
    const [scheduleTimeSlots, setScheduleTimeSlots] = useState<string[]>([]);
    const user = useAppSelector(state => state.authSlice.user);
    const { data: instructorData } = useGetAInstructorQuery({ username: user?.username || '' });
    const { data } = useGetInstructorAvailabilityQuery({ id: instructorData?.data._id || '' });
    const [selectedTime, setSelectedTime] = useState<string[]>([]);
    useEffect(() => {
        if (!selectedDate) {
            setBookedTimeSlots([]);
        }
        const bookedSlots = data?.data.schedules.find((schedule: { date: string, time: string[] }) => {
            return format(schedule.date, 'yyyy-MM-dd') === format(selectedDate!, 'yyyy-MM-dd');
        });

        setBookedTimeSlots([...bookedSlots?.time || '']);
    }, [data?.data.schedules, selectedDate]);

    useEffect(() => {
        if (selectedDate && instructorData?.data.workingHour) {
            const workingHours = instructorData?.data.workingHour as IWorkingHour;
            const dateName = (format(selectedDate, 'cccc')).toLowerCase() as keyof typeof workingHours;
            if (workingHours) {
                setWorkingHour(workingHours[dateName]);
            }
        }
    }, [instructorData?.data.workingHour, selectedDate]);

    return (
        <div>
            {/* <div className="flex items-center justify-center pb-3 gap-6 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-600" />
                    <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-gray-400" />
                    <span>Closed / Booked</span>
                </div>
            </div> */}
            <div className='grid grid-cols-2 text-black border-y'>
                <div>
                    <ScheduleCalender
                        availableScheduleHours={1}
                        schedules={[]}
                        bookedSchedules={data?.data.schedules || []}
                        workingHours={instructorData?.data.workingHour || null}
                        classname='border-y-0 border-l-0 shadow-none border-r rounded-none'
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                    />
                </div>
                <div>
                    <ScheduleTimeSlots
                        scheduleTimeSlots={scheduleTimeSlots}
                        setScheduleTimeSlots={setScheduleTimeSlots}
                        workingHour={workingHour}
                        classname='border-none shadow-none'
                        bookedTimeSlots={bookedTimeSlots}
                        selectedDuration={1}
                        selectedTime={selectedTime}
                        onSelectTime={setSelectedTime}
                        selectedDate={selectedDate}
                        availableScheduleHours={1}
                    />
                </div>
            </div>
            <div className='text-end mx-6'>
                <Button className='w-60 mt-4'>Block Slots</Button>
            </div>
        </div>
    );
};

export default ManageAvailability;