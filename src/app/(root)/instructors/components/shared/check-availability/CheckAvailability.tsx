"use client"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, ChevronRight, Clock, XCircle } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import ScheduleCalender from '../../../booking/components/schedule-step/ScheduleCalender';
import ScheduleTimeSlots from '../../../booking/components/schedule-step/ScheduleTimeSlots';
import { Button } from '@/components/ui/button';
import { useGetInstructorAvailabilityQuery } from '@/redux/api/instructorApi/instructorApi';
import { format } from 'date-fns';
import Link from 'next/link';
import { IWorkingHour } from '@/types/instructor';

interface ICheckAvailabilityProps {
    id: string;
    name: string;
    username: string;
    workingHours: IWorkingHour;
    parent?: string;
}

const CheckAvailability: FC<ICheckAvailabilityProps> = ({ id, name, username, workingHours, parent }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [bookedTimeSlots, setBookedTimeSlots] = useState<string[]>([]);
    const [workingHour, setWorkingHour] = useState<{ isActive: boolean, startTime: string, endTime: string }>({ isActive: false, startTime: '', endTime: '' });

    const { data } = useGetInstructorAvailabilityQuery({ id });

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
        if (selectedDate && workingHours) {
            const dateName = (format(selectedDate, 'cccc')).toLowerCase() as keyof typeof workingHours;
            if (workingHours) {
                setWorkingHour(workingHours[dateName]);
            }
        }
    }, [workingHours, selectedDate]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {
                    parent === "details" ?
                        <Button
                            className="w-full py-3 px-4 bg-light border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
                        >
                            Check Availability
                        </Button>
                        :
                        <button className="flex justify-center gap-1 cursor-pointer group">
                            <Calendar className="w-4 text-primary" />
                            <span className="text-primary border-b border-transparent group-hover:border-primary">Check availability</span>
                            <ChevronRight className="text-primary w-5 -ml-1" />
                        </button>
                }
            </DialogTrigger>
            <DialogContent className='max-w-3xl py-0 px-0 space-y-0 gap-0'>
                <DialogHeader>
                    <DialogTitle className='text-2xl font-semibold px-4 pt-3 pb-1 text-center'>
                        <span className='text-primary'>Check Availability for</span> <span className='font-semibold text-gradient'>{name}</span>
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
                            bookedSchedules={data?.data.schedules || []}
                            workingHours={workingHours}
                            classname='border-y-0 border-l-0 shadow-none border-r rounded-none'
                            selectedDate={selectedDate}
                            onSelectDate={setSelectedDate}
                        />
                    </div>
                    <div>
                        <ScheduleTimeSlots
                            scheduleTimeSlots={[]}
                            setScheduleTimeSlots={() => { }}
                            workingHour={workingHour}
                            btnClassname='cursor-default'
                            classname='border-none shadow-none'
                            bookedTimeSlots={bookedTimeSlots}
                            selectedDuration={1}
                            selectedTime={[]}
                            onSelectTime={() => { }}
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
                            <Button>
                                Continue to Booking
                            </Button>
                        </Link>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default CheckAvailability;