"use client"

import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import NavigationItem from './NavigationItem';

const StepIndicator: FC = () => {
    const searchParams = useSearchParams();
    const currentStep = searchParams.get("step");

    const steps = [
        { path: "/instructor-registration?step=personal-info", title: "Personal Info", key: "personal-info" },
        { path: "/instructor-registration?step=experience", title: "Experience", key: "experience" },
        { path: "/instructor-registration?step=car-info", title: "Car Info", key: "car-info" },
        { path: "/instructor-registration?step=security", title: "Security", key: "security" }
    ];

    // Define the order of steps
    const stepOrder = steps.map(step => step.key);

    // Determine which steps should be active
    const activeSteps = steps.reduce((acc, step, index) => {
        const stepIndex = currentStep ? stepOrder.indexOf(currentStep) : -1;
        
        // Mark current step and all previous steps as active
        if (stepIndex !== -1 && index <= stepIndex) {
            acc.push(step.key);
        }
        
        return acc;
    }, [] as string[]);

    return (
        <div>
            <ul className='flex gap-4'>
                {
                    steps.map((step, index) => (
                        <NavigationItem 
                            key={index} 
                            path={step.path} 
                            title={step.title} 
                            isActive={activeSteps.includes(step.key)}
                        />
                    ))
                }
            </ul>
        </div>
    );
};

export default StepIndicator;