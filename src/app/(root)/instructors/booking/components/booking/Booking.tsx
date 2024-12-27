"use client"
import { FC } from 'react';
import { BookingProvider } from '@/providers/BookingProvider';

const Booking: FC = () => {

    return (
        <BookingProvider>
            <div className='py-8 grid grid-cols-6 gap-6'>
                <div className='col-span-4'>

                </div>
                <div className='col-span-2 space-y-6'>

                </div>
            </div>
        </BookingProvider>
    );
};

export default Booking;