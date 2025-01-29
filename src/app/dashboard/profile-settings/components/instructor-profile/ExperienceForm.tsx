"use client"

import ExperienceFields from '@/components/shared/forms/ExperienceFields';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hook';
import { IInstructor } from '@/types/instructor';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Inputs {
    experience: number;
    description: string;
    languages: string[];
}

interface IExperienceFormProps {
    drivingLicenseFile: File | null;
    setDrivingLicenseFile: Dispatch<SetStateAction<File | null>>;
    experienceCertificateFile: File | null;
    setExperienceCertificateFile: Dispatch<SetStateAction<File | null>>;
}

const ExperienceForm: FC<IExperienceFormProps> = ({ drivingLicenseFile, setDrivingLicenseFile, experienceCertificateFile, setExperienceCertificateFile }) => {
    const [isClicked, setIsClicked] = useState(false);
    const { instructor } = useAppSelector((state) => state.authSlice);
    const defaultValues = {
        experience: instructor?.experience || 0,
        description: instructor?.description || '',
        languages: instructor?.languages || [],
        documents: instructor?.documents || {}
    }

    console.log('Instructor', instructor);

    // Driving License
    const [drivingLicenseURL, setDrivingLicenseURL] = useState<string>(defaultValues?.documents?.drivingLicense || '');

    const [drivingLicenseError, setDrivingLicenseError] = useState<string>('');

    // Experience Certificate
    const [experienceCertificateURL, setExperienceCertificateURL] = useState<string>(defaultValues?.documents?.experienceCertificate || '');
    const [experienceCertificateError, setExperienceCertificateError] = useState<string>('');



    // Selected languages
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(defaultValues?.languages || []);
    const [selectedLanguagesError, setSelectedLanguagesError] = useState<string>('');


    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit = (data: Inputs) => {
        setIsClicked(true);
        if (!drivingLicenseURL || !experienceCertificateURL || selectedLanguages.length === 0) {
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
                drivingLicense: drivingLicenseURL,
                experienceCertificate: experienceCertificateURL
            },
            languages: selectedLanguages
        }
    }

    useEffect(() => {
        if (isClicked) {
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
            if (selectedLanguages.length > 0 || (defaultValues?.languages?.length ?? 0) > 0) {
                setSelectedLanguagesError('');
            } else {
                setSelectedLanguagesError('Languages are required');
            }
        }
    }, [drivingLicenseURL, experienceCertificateURL, selectedLanguages, isClicked, drivingLicenseFile, experienceCertificateFile, defaultValues?.languages?.length]);

    return (
        <div className=''>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <h1 className='text-2xl font-bold text-primary'>Experience</h1>
                <ExperienceFields
                    errors={errors}
                    defaultValues={defaultValues}
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
                />

                <Button type='submit' className='w-full mt-7 gradient-color h-12'>Save</Button>
            </form>
        </div>
    );
};

export default ExperienceForm;