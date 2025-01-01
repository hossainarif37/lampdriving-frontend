"use client"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, ChevronRight } from 'lucide-react';
import { FC, useState } from 'react';
import ScheduleCalender from '../../../booking/components/schedule-step/ScheduleCalender';
import ScheduleTimeSlots from '../../../booking/components/schedule-step/ScheduleTimeSlots';
import { Button } from '@/components/ui/button';

const CheckAvailability: FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string[] | null>(null);
    const [selectedDuration, setSelectedDuration] = useState<1 | 2 | 1.5>(1);
    const [bookedTimeSlots, setBookedTimeSlots] = useState<string[]>([]);

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
                        Check Availability
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
                            selectedDuration={selectedDuration}
                            selectedTime={selectedTime}
                            onSelectTime={setSelectedTime}
                            selectedDate={selectedDate}
                        />
                    </div>
                </div>
                <DialogFooter className='pt-4 bg-gray-50'>
                    <div className="flex items-center justify-end gap-4 pb-4 px-4">
                        <Button
                            variant={"outline"}
                            // onClick={onClose}
                            className=""
                        >
                            Cancel
                        </Button>
                        <Button>
                            Continue to Booking
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CheckAvailability;