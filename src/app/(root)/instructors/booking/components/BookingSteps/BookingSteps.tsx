"use client";
import { Package, User2, UserCheck, Wallet } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, ReactNode, useState } from 'react';

interface IStep {
    name: string;
    icon: ReactNode;
    key: string;
    index: number
}

const BookingSteps: FC = () => {
    const [currentStep, setCurrentStep] = useState<IStep>({
        name: 'Instructor',
        icon: <UserCheck />,
        key: 'instructor',
        index: 1
    });
    
    const { replace } = useRouter();

    const steps: IStep[] = [
        {
            name: 'Instructor',
            icon: <UserCheck />,
            key: 'instructor',
            index: 1
        },
        {
            name: 'Book Lesson',
            icon: <Package />,
            key: 'book-lesson',
            index: 2
        },
        {
            name: 'Register',
            icon: <User2 />,
            key: 'register',
            index: 3
        },
        {
            name: 'Payment',
            icon: <Wallet />,
            key: 'payment',
            index: 4
        }
    ]

    const urlSearchParams = useSearchParams();
    const handleStepChange = (step: IStep) => {
        const searchParams = new URLSearchParams(urlSearchParams);
        searchParams.set('step', step.key);
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
                            onClick={() => handleStepChange(step)}
                            className='flex flex-col items-center justify-between gap-2 flex-1'>
                            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${(currentStep.index >= step.index) ? 'gradient-color text-white' : 'bg-[#dbeafe] text-primary'}`}>
                                {step.icon}
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
                    ${currentStep.key === 'book-lesson' && 'w-6/12'}
                    ${currentStep.key === 'register' && 'w-9/12'}
                    ${currentStep.key === 'payment' && 'w-full'}
                    `} />
            </div>
        </div>
    );
};

export default BookingSteps;