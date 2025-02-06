"use client";
import { useBooking } from '@/providers/BookingProvider';
import { useAppSelector } from '@/redux/hook';
import { FC, useEffect, useState } from 'react';


const BookingSteps: FC = () => {
    const { isTestPackageSelected, steps, currentStep, handleStepChange, bookingHours, testPackage, schedules, availableScheduleHours } = useBooking();
    const isAuthenticate = useAppSelector(state => state.authSlice.isAuthenticate);


    return (
        <div className='max-w-3xl w-full mx-auto relative hidden sm:block'>
            <div className='flex items-center justify-between gap-4'>
                {
                    steps.map((step, index) => {
                        const isPackageSelected = bookingHours ? true : false || testPackage.included;
                        let isDisabled = false;

                        if (step.key !== 'instructor' && step.key !== 'package-selection') {
                            // Handle Schedule step
                            if (step.key === 'schedule') {
                                isDisabled = !isPackageSelected;
                            }
                            // Handle Register step
                            else if (step.key === 'register') {
                                isDisabled = !isPackageSelected || (availableScheduleHours > 0);
                                if (testPackage.included) {
                                    if (!isTestPackageSelected) {
                                        isDisabled = true;
                                    }
                                }
                            }
                            // Handle Payment step
                            else if (step.key === 'payment') {
                                isDisabled = !isPackageSelected || !schedules.length || !isAuthenticate || (availableScheduleHours > 0);
                                if (testPackage.included) {
                                    if (!isTestPackageSelected) {
                                        isDisabled = true;
                                    }
                                }
                            }
                        }
                        return (<button
                            key={index}
                            disabled={isDisabled}
                            onClick={() => handleStepChange(step.key)}
                            className={`flex flex-col items-center justify-between gap-2 flex-1 ${step.key === 'instructor' && 'cursor-default'}`}>
                            <div className={`size-10 flex items-center justify-center rounded-full ${(currentStep.index >= step.index) ? 'gradient-color text-white' : 'bg-[#dbeafe] text-primary'}`}>
                                <step.icon />
                            </div>
                            <p className='text-[13px] sm:text-sm font-medium'>{step.name}</p>
                        </button>)
                    })
                }
            </div>
            <div className='h-3 bg-gray-200 rounded-md absolute top-3.5 -z-10 w-11/12 mx-auto left-0 right-0'>
                <div className={`h-full gradient-color rounded-md z-10 
                transition-all duration-300
                ${isAuthenticate ?
                        `${currentStep.key === 'instructor' && 'w-2/12'}
                    ${currentStep.key === 'package-selection' && 'w-6/12'}
                    ${currentStep.key === 'schedule' && 'w-9/12'}
                    ${currentStep.key === 'payment' && 'w-full'}`
                        :
                        ` ${currentStep.key === 'instructor' && 'w-2/12'}
                ${currentStep.key === 'package-selection' && 'w-4/12'}
                ${currentStep.key === 'schedule' && 'w-7/12'}
                ${currentStep.key === 'register' && 'w-10/12'}
                ${currentStep.key === 'payment' && 'w-full'}`
                    }
                    `} />
            </div>
        </div>
    );
};

export default BookingSteps;