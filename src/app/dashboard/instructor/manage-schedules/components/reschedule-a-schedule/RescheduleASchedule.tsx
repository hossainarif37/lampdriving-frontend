"use client"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Clock, XCircle } from 'lucide-react';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { format, set } from 'date-fns';
import { IWorkingHour } from '@/types/instructor';
import { useGetInstructorAvailabilityQuery, useRescheduleAScheduleMutation } from '@/redux/api/scheduleApi/scheduleApi';
import { useGetAInstructorQuery } from '@/redux/api/instructorApi/instructorApi';
import { IAddress } from '@/types/user';
import RescheduleTime from './RescheduleTime';
import RescheduleLocation from './RescheduleLocation';
import { toast } from '@/hooks/use-toast';

interface IRescheduleAScheduleProps {
    id: string;
    username: string;
    showAvailability: boolean;
    setShowAvailability: Dispatch<SetStateAction<boolean>>;
    duration: number;
    pickupAddress: IAddress;
    dropOffAddress?: IAddress;
    type: "lesson" | "test" | "mock-test";
}

const RescheduleASchedule: FC<IRescheduleAScheduleProps> = ({ id, username, showAvailability, setShowAvailability, duration, type }) => {
    const [step, setStep] = useState<"time" | "location">("time");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string[]>([]);
    const [bookedTimeSlots, setBookedTimeSlots] = useState<string[]>([]);
    const [workingHour, setWorkingHour] = useState<{ isActive: boolean, startTime: string, endTime: string }>({ isActive: false, startTime: '', endTime: '' });
    const [scheduleTimeSlots, setScheduleTimeSlots] = useState<string[]>([]);
    const { data: instructorData } = useGetAInstructorQuery({ username });
    const { data } = useGetInstructorAvailabilityQuery({ id: instructorData?.data._id || '' });
    const [pickupLocation, setPickupLocation] = useState<IAddress>({ address: '', suburb: '' });
    const [pickupLocationError, setPickupLocationError] = useState<{ address: boolean, suburb: boolean }>({ address: false, suburb: false });
    const [dropOffLocation, setDropOffLocation] = useState<IAddress>({ address: '', suburb: '' });
    const [dropOffLocationError, setDropOffLocationError] = useState<{ address: boolean, suburb: boolean }>({ address: false, suburb: false });

    const [rescheduleASchedule, { isLoading }] = useRescheduleAScheduleMutation();

    const handleSubmit = () => {

        if (!selectedDate || !selectedTime) {
            return;
        }

        if (step === "time" && selectedDate && selectedTime.length > 0) {
            setStep("location");
            return;
        }
        const testPackage = type === "test";

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

        const schedule = {
            date: selectedDate,
            time: selectedTime,
            pickupAddress: { ...pickupLocation },
        }
        rescheduleASchedule({ id, data: schedule }).unwrap().then((res) => {
            toast({
                message: res.message
            });
            setShowAvailability(false);
        }).catch((err) => {
            toast({
                success: false,
                message: err?.data?.message || "Something went wrong"
            })
        });
    }

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


    const isDisable = (!selectedDate || selectedTime.length < 0) || (step == "location" && isLoading);
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
                        <span className='text-primary'>Reschedule a Schedule</span>
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
                <div className='grid grid-cols-2 text-black border-y min-h-[372px]'>
                    {
                        step === "time" ?
                            <RescheduleTime
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                scheduleTimeSlots={scheduleTimeSlots}
                                setScheduleTimeSlots={setScheduleTimeSlots}
                                workingHour={workingHour}
                                duration={duration}
                                selectedTime={selectedTime}
                                bookedTimeSlots={bookedTimeSlots}
                                data={data}
                                instructorData={instructorData}
                                setSelectedTime={setSelectedTime}
                            />
                            :
                            <RescheduleLocation
                                type={type}
                                setPickupLocation={setPickupLocation}
                                dropOffLocation={dropOffLocation}
                                dropOffLocationError={dropOffLocationError}
                                pickupLocation={pickupLocation}
                                pickupLocationError={pickupLocationError}
                                setDropOffLocation={setDropOffLocation}
                            />
                    }
                </div>
                <DialogFooter className='pt-4 bg-gray-50'>
                    <div className="flex items-center justify-end gap-4 pb-4 px-4">
                        {
                            step == "time" ?
                                <DialogClose asChild>
                                    <Button
                                        variant={"outline"}
                                        className=""
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>
                                :
                                <Button
                                    variant={"outline"}
                                    className=""
                                    onClick={() => setStep("time")}
                                >
                                    Back
                                </Button>
                        }
                        <Button loading={isLoading} onClick={handleSubmit} disabled={isDisable} className='bg-primary' size="lg">
                            {
                                step == "time" ?
                                    "Next"
                                    :
                                    "Reschedule"
                            }
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default RescheduleASchedule;