"use client"
import { IWorkingHour } from '@/types/instructor';
import { Calendar, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { FC, useState } from 'react';

const CheckAvailability = dynamic(
    () => import('./CheckAvailability'),
    {
        loading: () => (
            <button
                className="flex justify-center gap-1 cursor-pointer group"
            >
                <Calendar className="w-4 text-primary" />
                <span className="text-primary border-b border-transparent group-hover:border-primary">
                    Checking availability
                </span>
                <ChevronRight className="text-primary w-5 -ml-1" />
            </button>
        ),
        ssr: false
    }
);

interface ICheckAvailabilityBtnProps {
    id: string;
    name: string;
    username: string;
    workingHours: IWorkingHour;
}


const CheckAvailabilityBtn: FC<ICheckAvailabilityBtnProps> = ({ id, name, username, workingHours }) => {
    const [showAvailability, setShowAvailability] = useState(false);

    return (
        <div className="text-center flex items-center justify-center">
            {showAvailability ? (
                <CheckAvailability
                    showAvailability={showAvailability}
                    setShowAvailability={setShowAvailability}
                    workingHours={workingHours}
                    name={name}
                    username={username}
                    id={id}
                />
            ) : (
                <button
                    className="flex justify-center gap-1 cursor-pointer group"
                    onClick={() => setShowAvailability(true)}
                >
                    <Calendar className="w-4 text-primary" />
                    <span className="text-primary border-b border-transparent group-hover:border-primary">
                        Check availability
                    </span>
                    <ChevronRight className="text-primary w-5 -ml-1" />
                </button>
            )}
        </div>
    );
};

export default CheckAvailabilityBtn;