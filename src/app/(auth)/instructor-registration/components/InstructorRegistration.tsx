import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import ExperienceForm from './experience/ExperienceForm';
import PersonalInfoForm from './personal-info/PersonalInfoForm';
import CarInfoForm from './car-info/CarInfoForm';
import SecurityForm from './security/SecurityForm';
import ServicesForm from './services/ServicesForm';

const InstructorRegistration: FC = () => {
    // const [personalInfo, setPersonalInfo] = useState(null);
    // const [experience, setExperience] = useState(null);
    // const [carInfo, setCarInfo] = useState(null);
    // const [services, setServices] = useState(null);
    // const [security, setSecurity] = useState(null);

    const searchParams = useSearchParams();
    const step = searchParams.get('step');
    
    const isPersonalInfoStep = step === 'personal-info';
    const isExperienceStep = step === 'experience';
    const isServicesStep = step === 'services';
    const isCarInfoStep = step === 'car-info';
    const isSecurityStep = step === 'security';
    return (
        <>
            {isPersonalInfoStep && <PersonalInfoForm  />}
            {isExperienceStep && <ExperienceForm  />}
            {isServicesStep && <ServicesForm  />}
            {isCarInfoStep && <CarInfoForm  />}
            {isSecurityStep && <SecurityForm  />}
        </>
    );
};

export default InstructorRegistration;