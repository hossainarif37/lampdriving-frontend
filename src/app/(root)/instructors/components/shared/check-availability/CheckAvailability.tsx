"use client"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, ChevronRight } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import ScheduleCalender from '../../../booking/components/schedule-step/ScheduleCalender';
import ScheduleTimeSlots from '../../../booking/components/schedule-step/ScheduleTimeSlots';
import { Button } from '@/components/ui/button';
import { useGetInstructorAvailabilityQuery } from '@/redux/api/instructorApi/instructorApi';
import { format } from 'date-fns';
import Link from 'next/link';

interface ICheckAvailabilityProps {
    id : string;
    name: string;
    username: string;
}

const CheckAvailability: FC<ICheckAvailabilityProps> = ({ id, name, username }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [bookedTimeSlots, setBookedTimeSlots] = useState<string[]>([]);

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

    return (
        <Dialog>
            <DialogTrigger className="flex justify-center gap-1 cursor-pointer underline p-6">
                <Calendar className="w-4 text-primary" />
                <span className="text-primary">Check availability</span>
                <ChevronRight className="text-primary w-5 -ml-1" />
            </DialogTrigger>
            <DialogContent className='max-w-3xl py-0 px-0 space-y-0 gap-0'>
                <DialogHeader>
                    <DialogTitle className='my-4 text-2xl font-semibold px-4'>
                        Check Availability for <span className='font-semibold text-gradient'>{name}</span>
                    </DialogTitle>
                </DialogHeader>
                <div className='grid grid-cols-2 text-black border-y'>
                    <div>
                        <ScheduleCalender
                            classname='border-y-0 border-l-0 shadow-none border-r rounded-none'
                            selectedDate={selectedDate}
                            onSelectDate={setSelectedDate}
                        />
                    </div>
                    <div>
                        <ScheduleTimeSlots
                            classname='border-none shadow-none'
                            bookedTimeSlots={bookedTimeSlots}
                            selectedDuration={1}
                            selectedTime={[]}
                            onSelectTime={() => { }}
                            selectedDate={selectedDate}
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
        </Dialog>
    );
};

export default CheckAvailability;