"use client"
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import PacakageSelectionStep from '../package-selection-step/PacakageSelectionStep';
import BookingInfo from '../booking-info/BookingInfo';
import InstructorInfo from '../instructor-info/InstructorInfo';
import ScheduleStep from '../schedule-step/ScheduleStep';
import RegisterStep from '../register-step/RegisterStep';
import PaymentStep from '../payment-step/PaymentStep';
import BookingSchedule from '../booking-schedule/BookingSchedule';
import { BookingProvider } from '@/providers/BookingProvider';
import BookingSteps from '../booking-steps/BookingSteps';
import SuccessStep from '../success-step/SuccessStep';

const Booking: FC = () => {
    const urlSearchParams = useSearchParams();
    const step = urlSearchParams.get('step');

    const pacakageSelectionStep = step === 'package-selection';
    const scheduleStep = step === 'schedule';
    const registerStep = step === 'register' || step === 'login';
    const paymentStep = step === 'payment';
    const successStep = step === 'success';
    return (
        <BookingProvider>
            <div hidden={successStep}>
                <BookingSteps />
            </div>
            <div className='py-8 grid grid-cols-6 gap-6'>
                <div className={`${successStep ? 'col-span-6' : 'col-span-4'}`}>
                    {
                        pacakageSelectionStep ? <PacakageSelectionStep /> :
                            scheduleStep ? <ScheduleStep /> :
                                registerStep ? <RegisterStep /> :
                                    paymentStep ? <PaymentStep /> :
                                        successStep && <SuccessStep />
                    }
                </div>
                <div hidden={successStep} className='col-span-2 space-y-6'>
                    <BookingInfo />
                    <BookingSchedule />
                    <InstructorInfo />
                </div>
            </div>
        </BookingProvider>
    );
};

export default Booking;