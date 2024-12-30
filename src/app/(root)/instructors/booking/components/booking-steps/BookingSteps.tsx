"use client";
import { useBooking } from '@/providers/BookingProvider';
import { IStep } from '@/types/booking';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';


const BookingSteps: FC = () => {
    const { steps, currentStep, setCurrentStep, handleStepChange } = useBooking();
    const urlSearchParams = useSearchParams();


    const { replace } = useRouter();


    return (
        <div className='max-w-3xl w-full mx-auto relative'>
            <div className='flex items-center justify-between gap-4'>
                {
                    steps.map((step, index) => (
                        <button
                            key={index}
                            onClick={() => handleStepChange(step.key)}
                            className='flex flex-col items-center justify-between gap-2 flex-1'>
                            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${(currentStep.index >= step.index) ? 'gradient-color text-white' : 'bg-[#dbeafe] text-primary'}`}>
                                <step.icon />
                            </div>
                            <p className='text-sm font-medium'>{step.name}</p>
                        </button>
                    ))
                }
            </div>
            <div className='h-3 bg-gray-200 rounded-md absolute top-3.5 -z-10 w-11/12 mx-auto left-0 right-0'>
                <div className={`h-full gradient-color rounded-md z-10 
                transition-all duration-300
                    ${currentStep.key === 'instructor' && 'w-2/12'}
                    ${currentStep.key === 'package-selection' && 'w-4/12'}
                    ${currentStep.key === 'schedule' && 'w-7/12'}
                    ${currentStep.key === 'register' && 'w-10/12'}
                    ${currentStep.key === 'payment' && 'w-full'}
                    `} />
            </div>
        </div>
    );
};

export default BookingSteps;