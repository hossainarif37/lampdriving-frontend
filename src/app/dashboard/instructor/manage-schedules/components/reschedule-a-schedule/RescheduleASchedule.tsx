"use client"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Clock, XCircle } from 'lucide-react';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import Link from 'next/link';
import { IWorkingHour } from '@/types/instructor';
import { useGetInstructorAvailabilityQuery } from '@/redux/api/scheduleApi/scheduleApi';
import ScheduleCalender from '@/app/(root)/instructors/booking/components/schedule-step/ScheduleCalender';
import ScheduleTimeSlots from '@/app/(root)/instructors/booking/components/schedule-step/ScheduleTimeSlots';
import { useGetAInstructorQuery } from '@/redux/api/instructorApi/instructorApi';
import { IAddress } from '@/types/user';

interface IRescheduleAScheduleProps {
    id: string;
    username: string;
    showAvailability: boolean;
    setShowAvailability: Dispatch<SetStateAction<boolean>>;
    duration: number;
    pickupAddress: IAddress;
    dropOffAddress?: IAddress;
}

const RescheduleASchedule: FC<IRescheduleAScheduleProps> = ({ id, username, showAvailability, setShowAvailability, duration }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string[]>([]);
    const [bookedTimeSlots, setBookedTimeSlots] = useState<string[]>([]);
    const [workingHour, setWorkingHour] = useState<{ isActive: boolean, startTime: string, endTime: string }>({ isActive: false, startTime: '', endTime: '' });
    const [scheduleTimeSlots, setScheduleTimeSlots] = useState<string[]>([]);
    const { data: instructorData } = useGetAInstructorQuery({ username });
    const { data } = useGetInstructorAvailabilityQuery({ id: instructorData?.data._id || '' });
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
        <Dialog open={showAvailability} onOpenChange={setShowAvailability}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} className='h-[36px] py-0 font-normal capitalize text-start justify-start px-2 w-full'>
                    Reschedule
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-3xl py-0 px-0 space-y-0 gap-0'>
                <DialogHeader>
                    <DialogTitle className='text-2xl font-semibold px-4 pt-3 pb-1 text-center'>
                        <span className='text-primary'>Reschedule a Schedule {username}</span>
                    </DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-center pb-3 gap-6 mt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary-600" />
                        <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-gray-400" />
                        <span>Closed / Booked</span>
                    </div>
                </div>
                <div className='grid grid-cols-2 text-black border-y'>
                    <div>
                        <ScheduleCalender
                            availableScheduleHours={1}
                            schedules={[]}
                            bookedSchedules={data?.data.schedules || []}
                            workingHours={instructorData?.data.workingHour as IWorkingHour}
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
                            selectedDuration={duration}
                            selectedTime={selectedTime}
                            onSelectTime={setSelectedTime}
                            selectedDate={selectedDate}
                            availableScheduleHours={1}
                        />
                    </div>
                </div>
                <DialogFooter className='pt-4 bg-gray-50'>
                    <div className="flex items-center justify-end gap-4 pb-4 px-4">
                        <DialogClose asChild>
                            <Button
                                variant={"outline"}
                                className=""
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Link href={`/instructors/booking?instructor=${username}&step=package-selection`}>
                            <Button className='bg-primary' size="lg">
                                Continue
                            </Button>
                        </Link>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default RescheduleASchedule;