"use client";
import { Clock, Package, User2, UserCheck, Wallet } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';

const BookingSteps: FC = () => {
    const [currentStep, setCurrentStep] = useState<string>("");
    const { replace } = useRouter();
    console.log(currentStep);
    const steps = [
        {
            name: 'Instructor',
            icon: <UserCheck />,
            key: 'instructor'
        },
        {
            name: 'Book Lesson',
            icon: <Package />,
            key: 'book-lesson'
        },
        {
            name: 'Register',
            icon: <User2 />,
            key: 'register'
        },
        {
            name: 'Payment',
            icon: <Wallet />,
            key: 'payment'
        }
    ]

    const urlSearchParams = useSearchParams();
    const handleStepChange = (step: string) => {
        const searchParams = new URLSearchParams(urlSearchParams);
        searchParams.set('step', step);
        replace(`?${searchParams.toString()}`);
        setCurrentStep(step);
    };

    return (
        <div className='max-w-3xl w-full mx-auto relative'>
            <div className='flex items-center justify-between gap-4'>
                {
                    steps.map((step, index) => (
                        <button
                            key={index}
                            onClick={() => handleStepChange(step.key)}
                            className='flex flex-col items-center justify-between gap-2 max-w-3xl mx-auto'>
                            <div className='w-10 h-10 flex items-center justify-center rounded-full gradient-color text-white'>
                                {step.icon}
                            </div>
                            <p className='text-sm font-medium'>{step.name}</p>
                        </button>
                    ))
                }
            </div>
            <div className='h-3.5 bg-gray-200 rounded-md absolute top-3 -z-10 w-11/12 mx-auto left-0 right-0'>
                <div className={`h-full bg-primary rounded-md z-10 
                transition-all duration-300
                    ${currentStep === 'instructor' && 'w-2/12'}
                    ${currentStep === 'book-lesson' && 'w-6/12'}
                    ${currentStep === 'register' && 'w-9/12'}
                    ${currentStep === 'payment' && 'w-full'}
                    `} />
            </div>
        </div>
    );
};

export default BookingSteps;