"use client"
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import PacakageSelectionStep from '../package-selection-step/PacakageSelectionStep';
import BookingInfo from '../booking-info/BookingInfo';
import InstructorInfo from '../instructor-info/InstructorInfo';
import { BookingProvider } from '@/providers/BookingProvider';

const Booking: FC = () => {
    const urlSearchParams = useSearchParams();
    const step = urlSearchParams.get('step');

    const pacakageSelectionStep = step === 'package-selection';

    return (
        <BookingProvider>
            <div className='py-8 grid grid-cols-6 gap-6'>
                <div className='col-span-4'>
                    {
                        pacakageSelectionStep && <PacakageSelectionStep />
                    }
                </div>
                <div className='col-span-2 space-y-6'>
                    <BookingInfo />
                    <InstructorInfo />
                </div>
            </div>
        </BookingProvider>
    );
};

export default Booking;