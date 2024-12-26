"use client";
import { Calendar, Package, User2, UserCheck, Wallet } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, ReactNode, useState } from 'react';

interface IStep {
    name: string;
    icon: ReactNode;
    key: string;
    index: number
}

const steps: IStep[] = [
    {
        name: 'Instructor',
        icon: <UserCheck />,
        key: 'instructor',
        index: 1
    },
    {
        name: 'Package',
        icon: <Package />,
        key: 'package-selection',
        index: 2
    },
    {
        name: 'Schedule',
        icon: <Calendar />,
        key: 'schedule',
        index: 3
    },
    {
        name: 'Register',
        icon: <User2 />,
        key: 'register',
        index: 4
    },
    {
        name: 'Payment',
        icon: <Wallet />,
        key: 'payment',
        index: 5
    }
]

const BookingSteps: FC = () => {
    const urlSearchParams = useSearchParams();
    const step = urlSearchParams.get('step');

    const initialCurrentStep = step && steps.find(currstep => currstep.key === (step === "login" ? "register" : step)) || {
        name: 'Instructor',
        icon: <UserCheck />,
        key: 'instructor',
        index: 1
    };
    const [currentStep, setCurrentStep] = useState<IStep>(initialCurrentStep);


    const { replace } = useRouter();

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