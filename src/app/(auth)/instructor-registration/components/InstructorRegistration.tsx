import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import ExperienceForm from './experience/ExperienceForm';
import PersonalInfoForm from './personal-info/PersonalInfoForm';
import CarInfoForm from './car-info/CarInfoForm';
import SecurityForm from './security/SecurityForm';

const InstructorRegistration: FC = () => {
    const searchParams = useSearchParams();
    const step = searchParams.get('step');
    const isPersonalInfoStep = step === 'personal-info'
    const isExperienceStep = step === 'experience'
    const isCarInfoStep = step === 'car-info'
    const isSecurityStep = step === 'security'
    return (
        <>
            {isPersonalInfoStep && <PersonalInfoForm />}
            {isExperienceStep && <ExperienceForm />}
            {isCarInfoStep && <CarInfoForm />}
            {isSecurityStep && <SecurityForm />}
        </>
    );
};

export default InstructorRegistration;