import { useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';
import ExperienceForm from './experience/ExperienceForm';
import PersonalInfoForm from './personal-info/PersonalInfoForm';
import CarInfoForm from './car-info/CarInfoForm';
import SecurityForm from './security/SecurityForm';
import ServicesForm from './services/ServicesForm';
import { IName } from '@/types/user';
import { IDocument, IVehicle, IWorkingHour } from '@/types/instructor';

export interface IPersonalInfo {
    name: IName;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
}

export interface IExperience {
    experience: string;
    description: string;
    languages: string[];
    documents: IDocument;
}

export interface IServices {
    serviceAreas: string[];
    pricePerHour: number;
    workingHour: IWorkingHour;
}

export interface ISecurity {
    password: string;
}



const InstructorRegistration: FC = () => {
    const [personalInfo, setPersonalInfo] = useState<IPersonalInfo | undefined>(undefined);
    const [experienceInfo, setExperienceInfo] = useState<IExperience | undefined>(undefined);
    const [carInfo, setCarInfo] = useState<IVehicle | undefined>(undefined);
    const [servicesInfo, setServicesInfo] = useState<IServices | undefined>(undefined);

    const searchParams = useSearchParams();
    const step = searchParams.get('step');

    const isPersonalInfoStep = step === 'personal-info';
    const isExperienceStep = step === 'experience';
    const isServicesStep = step === 'services';
    const isCarInfoStep = step === 'car-info';
    const isSecurityStep = step === 'security';

    const instructorData = {
        ...experienceInfo,
        ...servicesInfo,
        vehicle: {
            ...carInfo
        }
    }

    console.log(carInfo);

    return (
        <>
            {/* Personal Info */}
            {isPersonalInfoStep && <PersonalInfoForm personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />}

            {/* Experience */}
            {isExperienceStep && <ExperienceForm experienceInfo={experienceInfo} setExperienceInfo={setExperienceInfo} />}

            {/* Services */}
            {isServicesStep && <ServicesForm servicesInfo={servicesInfo} setServicesInfo={setServicesInfo} />}

            {/* Vehicle */}
            {isCarInfoStep && <CarInfoForm carInfo={carInfo} setCarInfo={setCarInfo} />}

            {/* Security */}
            {isSecurityStep && <SecurityForm userInfo={personalInfo} instructorInfo={instructorData} />}
        </>
    );
};

export default InstructorRegistration;