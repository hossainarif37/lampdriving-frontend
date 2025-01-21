"use client"
import { Button } from '@/components/ui/button';
import { IWorkingHour } from '@/types/instructor';
import { IAddress } from '@/types/user';
import { Calendar, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { FC, useState } from 'react';

const RescheduleASchedule = dynamic(
    () => import('./RescheduleASchedule'),
    {
        loading: () => (
            <Button variant={"ghost"} className='h-[36px] py-0 font-normal capitalize text-start justify-start px-2 w-full'>
                Reschedule
            </Button>
        ),
        ssr: false
    }
);

interface IRescheduleAScheduleBtnProps {
    id: string;
    username: string;
    duration: number;
    pickupAddress: IAddress;
    dropOffAddress?: IAddress;
}


const RescheduleAScheduleBtn: FC<IRescheduleAScheduleBtnProps> = ({ id, username, duration, pickupAddress, dropOffAddress }) => {
    const [showAvailability, setShowAvailability] = useState(false);

    return (
        <div className="flex items-center justify-center">
            {showAvailability ? (
                <RescheduleASchedule
                    duration={duration}
                    pickupAddress={pickupAddress}
                    dropOffAddress={dropOffAddress}
                    showAvailability={showAvailability}
                    setShowAvailability={setShowAvailability}
                    username={username}
                    id={id}
                />
            ) : (
                <Button
                    onClick={() => setShowAvailability(true)}
                    variant={"ghost"} className='h-[36px] py-0 font-normal capitalize text-start justify-start px-2 w-full'>
                    Reschedule
                </Button>
            )}
        </div>
    );
};

export default RescheduleAScheduleBtn;