/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import ExperienceFields from '@/components/shared/forms/ExperienceFields';
import { useInstructorRegister } from '@/providers/InstructorRegisterProvider';

interface Inputs {
    experience: number;
    description: string;
    languages: string[];
}

interface IExperienceFormProps {
    // experienceInfo: IExperience | undefined;
    // setExperienceInfo: Dispatch<SetStateAction<IExperience | undefined>>
    instructorLicenseFile: File | null;
    setInstructorLicenseFile: Dispatch<SetStateAction<File | null>>;
    drivingLicenseFile: File | null;
    setDrivingLicenseFile: Dispatch<SetStateAction<File | null>>;
    experienceCertificateFile: File | null;
    setExperienceCertificateFile: Dispatch<SetStateAction<File | null>>;
}

const ExperienceForm: FC<IExperienceFormProps> = ({ instructorLicenseFile, setInstructorLicenseFile, drivingLicenseFile, setDrivingLicenseFile, experienceCertificateFile, setExperienceCertificateFile }) => {
    const [isClicked, setIsClicked] = useState(false);
    const router = useRouter();
    const { experienceInfo, setExperienceInfo } = useInstructorRegister();

    // Instructor License
    const [instructorLicenseURL, setInstructorLicenseURL] = useState<string>(experienceInfo?.documents?.instructorLicense || '');

    const [instructorLicenseError, setInstructorLicenseError] = useState<string>('');

    // Driving License
    const [drivingLicenseURL, setDrivingLicenseURL] = useState<string>(experienceInfo?.documents?.drivingLicense || '');

    const [drivingLicenseError, setDrivingLicenseError] = useState<string>('');

    // Experience Certificate
    const [experienceCertificateURL, setExperienceCertificateURL] = useState<string>(experienceInfo?.documents?.experienceCertificate || '');
    const [experienceCertificateError, setExperienceCertificateError] = useState<string>('');

    // Selected languages
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(experienceInfo?.languages || []);
    const [selectedLanguagesError, setSelectedLanguagesError] = useState<string>('');


    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit = (data: Inputs) => {
        setIsClicked(true);
        if (!instructorLicenseURL || !drivingLicenseURL || !experienceCertificateURL || selectedLanguages.length === 0) {
            if (!instructorLicenseURL) {
                setInstructorLicenseError(`${instructorLicenseError ? instructorLicenseError : 'Instructor License is required'}`);
            }
            if (!drivingLicenseURL) {
                setDrivingLicenseError(`${drivingLicenseError ? drivingLicenseError : 'Driving License is required'}`);
            }
            if (!experienceCertificateURL) {
                setExperienceCertificateError(`${experienceCertificateError ? experienceCertificateError : 'Experience Certificate is required'}`);
            }
            if (selectedLanguages.length === 0) {
                setSelectedLanguagesError('Languages are required');
            }
            return;
        }

        const experienceData = {
            ...data,
            documents: {
                instructorLicense: instructorLicenseURL,
                drivingLicense: drivingLicenseURL,
                experienceCertificate: experienceCertificateURL
            },
            languages: selectedLanguages
        }

        setExperienceInfo(experienceData);
        router.push("/instructor-registration?step=services");
    }


    useEffect(() => {
        if (isClicked) {
            if (instructorLicenseURL) {
                setInstructorLicenseError('');
            } else {
                setInstructorLicenseError(`${instructorLicenseFile ? 'Upload Instructor License' : 'Instructor License is required'}`);
            }
            if (drivingLicenseURL) {
                setDrivingLicenseError('');
            } else {
                setDrivingLicenseError(`${drivingLicenseFile ? 'Upload Driving License' : 'Driving License is required'}`);
            }
            if (experienceCertificateURL) {
                setExperienceCertificateError('');
            } else {
                setExperienceCertificateError(`${experienceCertificateFile ? 'Upload Experience Certificate' : 'Experience Certificate is required'}`);
            }
            if (selectedLanguages.length > 0 || (experienceInfo?.languages?.length ?? 0) > 0) {
                setSelectedLanguagesError('');
            } else {
                setSelectedLanguagesError('Languages are required');
            }
        }
    }, [instructorLicenseURL, instructorLicenseFile, drivingLicenseURL, experienceCertificateURL, selectedLanguages, isClicked, drivingLicenseFile, experienceCertificateFile, experienceInfo]);

    return (
        <div className='md:border md:p-16 md:shadow-lg md:rounded-lg mt-5'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-primary'>Experience and Certifications</h1>

                <ExperienceFields
                    errors={errors}
                    defaultValues={experienceInfo}
                    setDefaultValues={setExperienceInfo}
                    isRequired={true}
                    register={register}
                    setDrivingLicenseError={setDrivingLicenseError}
                    setExperienceCertificateError={setExperienceCertificateError}
                    setSelectedLanguagesError={setSelectedLanguagesError}
                    drivingLicenseFile={drivingLicenseFile}
                    setDrivingLicenseFile={setDrivingLicenseFile}
                    experienceCertificateFile={experienceCertificateFile}
                    setExperienceCertificateFile={setExperienceCertificateFile}
                    drivingLicenseURL={drivingLicenseURL}
                    setDrivingLicenseURL={setDrivingLicenseURL}
                    experienceCertificateURL={experienceCertificateURL}
                    setExperienceCertificateURL={setExperienceCertificateURL}
                    drivingLicenseError={drivingLicenseError}
                    experienceCertificateError={experienceCertificateError}
                    selectedLanguages={selectedLanguages}
                    setSelectedLanguages={setSelectedLanguages}
                    selectedLanguagesError={selectedLanguagesError}
                    instructorLicenseURL={instructorLicenseURL}
                    setInstructorLicenseURL={setInstructorLicenseURL}
                    instructorLicenseError={instructorLicenseError}
                    setInstructorLicenseError={setInstructorLicenseError}
                    instructorLicenseFile={instructorLicenseFile}
                    setInstructorLicenseFile={setInstructorLicenseFile}
                />

                <div>
                    <StepNavigationButtons prev="personal-info" next="services" />
                </div>
            </form>
        </div>
    );
};

export default ExperienceForm;