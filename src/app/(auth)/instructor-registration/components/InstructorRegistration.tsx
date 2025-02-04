import { useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';
import ExperienceForm from './experience/ExperienceForm';
import PersonalInfoForm from './personal-info/PersonalInfoForm';
import CarInfoForm from './car-info/CarInfoForm';
import SecurityForm from './security/SecurityForm';
import ServicesForm from './services/ServicesForm';
import { useInstructorRegister } from '@/providers/InstructorRegisterProvider';


const InstructorRegistration: FC = () => {
    // Experience
    const [instructorLicenseFile, setInstructorLicenseFile] = useState<File | null>(null);
    const [drivingLicenseFile, setDrivingLicenseFile] = useState<File | null>(null);
    const [experienceCertificateFile, setExperienceCertificateFile] = useState<File | null>(null);
    const { personalInfo, experienceInfo, servicesInfo, carInfo } = useInstructorRegister();

    // Car Info
    const [carImageFile, setCarImageFile] = useState<File | null>(null);

    const searchParams = useSearchParams();
    const step = searchParams?.get('step');

    const isPersonalInfoStep = step === 'personal-info';
    const isExperienceStep = step === 'experience';
    const isServicesStep = step === 'services';
    const isCarInfoStep = step === 'car-info';
    const isSecurityStep = step === 'security';


    return (
        <>
            {/* Personal Info */}
            {isPersonalInfoStep && <PersonalInfoForm />}

            {/* Experience */}
            {(isExperienceStep && personalInfo) && (
                <ExperienceForm
                    instructorLicenseFile={instructorLicenseFile}
                    setInstructorLicenseFile={setInstructorLicenseFile}
                    drivingLicenseFile={drivingLicenseFile}
                    setDrivingLicenseFile={setDrivingLicenseFile} experienceCertificateFile={experienceCertificateFile} setExperienceCertificateFile={setExperienceCertificateFile}
                />
            )}

            {/* Services */}
            {(isServicesStep && experienceInfo) && <ServicesForm />}

            {/* Vehicle */}
            {(isCarInfoStep && servicesInfo) && (
                <CarInfoForm
                    carImageFile={carImageFile}
                    setCarImageFile={setCarImageFile}
                />
            )}

            {/* Security */}
            {(isSecurityStep && carInfo) && <SecurityForm />}
        </>
    );
};

export default InstructorRegistration;