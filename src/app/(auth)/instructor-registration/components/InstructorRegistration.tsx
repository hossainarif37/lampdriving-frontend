import { useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';
import ExperienceForm from './experience/ExperienceForm';
import PersonalInfoForm from './personal-info/PersonalInfoForm';
import CarInfoForm from './car-info/CarInfoForm';
import SecurityForm from './security/SecurityForm';
import ServicesForm from './services/ServicesForm';
import { useInstructorRegister } from '@/providers/InstructorRegisterProvider';
import { IPhoto } from '@/components/shared/PhotoUpload';
import { IExperienceCertificate, IVehicleImages } from '@/types/instructor';

const InstructorRegistration: FC = () => {
    const { personalInfo, experienceInfo, servicesInfo, carInfo } = useInstructorRegister();


    const [profilePhoto, setProfilePhoto] = useState<IPhoto>({
        file: null,
        url: personalInfo?.profileImg || undefined
    });

    const [instructorLicense, setInstructorLicense] = useState<IPhoto>({
        file: null,
        url: experienceInfo?.documents?.instructorLicense || undefined
    })

    const [drivingLicense, setDrivingLicense] = useState<IPhoto>({
        file: null,
        url: experienceInfo?.documents?.drivingLicense || undefined
    })

    const [experienceCertificates, setExperienceCertificates] = useState<IExperienceCertificate[]>([
        {
            experienceType: '',
            url: experienceInfo?.documents?.experienceCertificates?.[0]?.url || ''
        }
    ]);

    // Car Info
    const [carImages, setCarImages] = useState<IVehicleImages[]>([
        {
            id: carInfo?.images?.[0]?.id || '',
            url: carInfo?.images?.[0]?.url || ''
        },
        {
            id: carInfo?.images?.[1]?.id || '',
            url: carInfo?.images?.[1]?.url || ''
        },
        {
            id: carInfo?.images?.[2]?.id || '',
            url: carInfo?.images?.[2]?.url || ''
        },
    ]);

    const searchParams = useSearchParams();
    const step = searchParams?.get('step');

    const isPersonalInfoStep = step === 'personal-info';
    const isExperienceStep = step === 'experience';
    const isServicesStep = step === 'services';
    const isCarInfoStep = step === 'car-info';
    const isSecurityStep = step === 'security';

    console.log('experienceInfo', experienceInfo);

    return (
        <>
            {/* Personal Info */}
            {isPersonalInfoStep && <PersonalInfoForm
                profilePhoto={profilePhoto}
                setProfilePhoto={setProfilePhoto}
            />}

            {/* Experience */}
            {(isExperienceStep && personalInfo) && (
                <ExperienceForm
                    instructorLicense={instructorLicense}
                    setInstructorLicense={setInstructorLicense}
                    drivingLicense={drivingLicense}
                    setDrivingLicense={setDrivingLicense}
                    experienceCertificates={experienceCertificates}
                    setExperienceCertificates={setExperienceCertificates}
                />
            )}

            {/* Services */}
            {(isServicesStep && experienceInfo) && <ServicesForm />}

            {/* Vehicle */}
            {(isCarInfoStep && servicesInfo) && (
                <CarInfoForm
                    carImages={carImages}
                    setCarImages={setCarImages}
                />
            )}

            {/* Security */}
            {(isSecurityStep && carInfo) && <SecurityForm />}
        </>
    );
};

export default InstructorRegistration;