// StepIndicator.tsx
import { useSearchParams, useRouter } from 'next/navigation';
import { FC, useMemo, useEffect } from 'react';
import NavigationItem from './NavigationItem';
import { useInstructorRegister } from '@/providers/InstructorRegisterProvider';

const StepIndicator: FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentStep = searchParams.get("step");
    const { personalInfo, experienceInfo, servicesInfo, carInfo } = useInstructorRegister();

    const steps = useMemo(() => [
        {
            path: "/instructor-registration?step=personal-info",
            title: "Personal Info",
            key: "personal-info",
            isDisabled: false,
            requiredInfo: true
        },
        {
            path: "/instructor-registration?step=experience",
            title: "Experience",
            key: "experience",
            isDisabled: !personalInfo,
            requiredInfo: personalInfo
        },
        {
            path: "/instructor-registration?step=services",
            title: "Services",
            key: "services",
            isDisabled: !experienceInfo,
            requiredInfo: experienceInfo
        },
        {
            path: "/instructor-registration?step=car-info",
            title: "Car Info",
            key: "car-info",
            isDisabled: !servicesInfo,
            requiredInfo: servicesInfo
        },
        {
            path: "/instructor-registration?step=security",
            title: "Security",
            key: "security",
            isDisabled: !carInfo,
            requiredInfo: carInfo
        }
    ], [personalInfo, experienceInfo, servicesInfo, carInfo]);

    const activeStepIndex = useMemo(() => {
        const index = steps.findIndex(step => step.key === currentStep);
        return index === -1 ? 0 : index;
    }, [currentStep, steps]);

    // Route protection
    useEffect(() => {
        const currentStepData = steps.find(step => step.key === currentStep);
        if (!currentStepData || currentStepData.isDisabled) {
            router.replace('/instructor-registration?step=personal-info');
        }
    }, [currentStep, steps, router]);

    return (
        <div className="w-full">
            <ul className="flex overflow-x-auto pb-5 md:pb-0 gap-4">
                {steps.map((step, index) => (
                    <NavigationItem
                        key={step.key}
                        path={step.path}
                        title={step.title}
                        isActive={!step.isDisabled && index <= activeStepIndex}
                        isDisabled={step.isDisabled}
                    />
                ))}
            </ul>
        </div>
    );
};

export default StepIndicator;