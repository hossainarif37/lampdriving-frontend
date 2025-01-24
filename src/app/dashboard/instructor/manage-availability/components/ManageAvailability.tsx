"use client"
import { FC, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { IWorkingHour } from '@/types/instructor';
import { useCreateAScheduleMutation, useGetInstructorAvailabilityQuery } from '@/redux/api/scheduleApi/scheduleApi';
import ScheduleCalender from '@/app/(root)/instructors/booking/components/schedule-step/ScheduleCalender';
import ScheduleTimeSlots from '@/app/(root)/instructors/booking/components/schedule-step/ScheduleTimeSlots';
import { Button } from '@/components/ui/button';
import { useGetAInstructorQuery } from '@/redux/api/instructorApi/instructorApi';
import { useAppSelector } from '@/redux/hook';
import { toast } from '@/hooks/use-toast';
import { ISchedule } from '@/types/schedule';


const ManageAvailability: FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [bookedTimeSlots, setBookedTimeSlots] = useState<string[]>([]);
    const [workingHour, setWorkingHour] = useState<{ isActive: boolean, startTime: string, endTime: string }>({ isActive: false, startTime: '', endTime: '' });
    const [scheduleTimeSlots, setScheduleTimeSlots] = useState<string[]>([]);
    const user = useAppSelector(state => state.authSlice.user);
    const { data: instructorData } = useGetAInstructorQuery({ username: user?.username || '' });
    const { data } = useGetInstructorAvailabilityQuery({ id: instructorData?.data._id || '' });
    const [selectedTime, setSelectedTime] = useState<string[]>([]);

    const [createASchedule, { isLoading }] = useCreateAScheduleMutation();
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

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        setSelectedTime([]);
    }

    const handleSelectTimes = (time: string[]) => {
        const newTime = time.filter(t => !selectedTime.includes(t));
        const removedTime = selectedTime.filter(t => time.includes(t));
        setSelectedTime(pre => [...pre, ...newTime].filter(t => !removedTime.includes(t)));
    }

    const handleBlockSlots = () => {
        const schedule: Partial<ISchedule> = {
            date: new Date(selectedDate && selectedTime ? format(selectedDate, 'yyyy-MM-dd') + ' ' + selectedTime[0] : ''),
            time: selectedTime,
            duration: selectedTime.length,
            pickupAddress: {
                address: ' ',
                suburb: ' '
            },
            type: "blank",
            instructor: instructorData?.data._id
        }
        createASchedule(schedule).unwrap().then((res) => {
            toast({
                message: res.message
            })
            setSelectedTime([]);
            setSelectedDate(null);
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message || "Something went wrong"
            })
        });
    }
    
    return (
        <div>
            <div className='grid grid-cols-2 text-black gap-6'>
                <div>
                    <ScheduleCalender
                        availableScheduleHours={1}
                        schedules={[]}
                        classname='shadow-none'
                        bookedSchedules={data?.data.schedules || []}
                        workingHours={instructorData?.data.workingHour || null}
                        selectedDate={selectedDate}
                        onSelectDate={handleDateChange}
                    />
                </div>
                <div>
                    <ScheduleTimeSlots
                        classname='shadow-none'
                        slotContainerClassname='h-[350px] overflow-y-scroll'
                        scheduleTimeSlots={scheduleTimeSlots}
                        setScheduleTimeSlots={setScheduleTimeSlots}
                        workingHour={workingHour}
                        bookedTimeSlots={bookedTimeSlots}
                        selectedDuration={1}
                        selectedTime={selectedTime}
                        onSelectTime={handleSelectTimes}
                        selectedDate={selectedDate}
                        availableScheduleHours={1}
                    />
                </div>
            </div>
            <div className='text-end'>
                <Button loading={isLoading} onClick={handleBlockSlots} disabled={selectedTime.length === 0} className='w-60 mt-4'>Block Slots</Button>
            </div>
        </div>
    );
};

export default ManageAvailability;