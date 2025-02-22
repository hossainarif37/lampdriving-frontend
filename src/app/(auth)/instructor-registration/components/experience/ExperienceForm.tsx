/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';
import { useFieldArray, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import ExperienceFields from '@/components/shared/forms/ExperienceFields';
import { useInstructorRegister } from '@/providers/InstructorRegisterProvider';
import { IDocument, IExperience, IExperienceCertificate } from '@/types/instructor';
import { IPhoto } from '@/hooks/useImage';

interface IExperienceFormProps {
    instructorLicense: IPhoto;
    setInstructorLicense: Dispatch<SetStateAction<IPhoto>>;
    drivingLicense: IPhoto;
    setDrivingLicense: Dispatch<SetStateAction<IPhoto>>;
    experienceCertificates: IExperienceCertificate[];
    setExperienceCertificates: Dispatch<SetStateAction<IExperienceCertificate[]>>;
}

const ExperienceForm: FC<IExperienceFormProps> = ({ instructorLicense, setInstructorLicense, drivingLicense, setDrivingLicense, experienceCertificates, setExperienceCertificates }) => {
    const { experienceInfo, setExperienceInfo } = useInstructorRegister();

    const form = useForm<IExperience>({
        defaultValues: {
            experience: {
                month: experienceInfo?.experience?.month || '',
                year: experienceInfo?.experience?.year || ''
            },
            description: experienceInfo?.description || '',
            languages: experienceInfo?.languages || [],
            documents: {
                instructorLicense: experienceInfo?.documents?.instructorLicense || '',
                drivingLicense: experienceInfo?.documents?.drivingLicense || '',
                experienceCertificates: experienceInfo?.documents?.experienceCertificates || []
            }
        }
    });
    const fieldArray = useFieldArray({ name: 'documents.experienceCertificates', control: form.control });
    const router = useRouter();

    // Selected languages
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(experienceInfo?.languages || []);
    const [selectedLanguagesError, setSelectedLanguagesError] = useState<string>('');

    useEffect(() => {
        if (form.formState.isSubmitted) {
            if (selectedLanguages.length === 0) {
                setSelectedLanguagesError('Please select at least one language.');
            } else {
                setSelectedLanguagesError('');
            }
        }
    }, [selectedLanguages, form.formState.isSubmitted]);

    const onSubmit = (data: IExperience) => {
        if (selectedLanguagesError) return;

        const experienceData = {
            ...data,
            languages: selectedLanguages
        }

        setExperienceInfo(experienceData);
        router.push("/instructor-registration?step=services");
    }

    return (
        <div className='md:border md:p-16 md:shadow-lg md:rounded-lg mt-5'>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-primary'>Experience and Certifications</h1>

                <ExperienceFields
                    form={form}
                    fieldArray={fieldArray}
                    isRequired={true}
                    instructorLicense={instructorLicense}
                    setInstructorLicense={setInstructorLicense}
                    drivingLicense={drivingLicense}
                    setDrivingLicense={setDrivingLicense}
                    selectedLanguages={selectedLanguages}
                    setSelectedLanguages={setSelectedLanguages}
                    experienceCertificates={experienceCertificates}
                    setExperienceCertificates={setExperienceCertificates}
                    defaultValues={experienceInfo}
                    selectedLanguagesError={selectedLanguagesError}
                    setSelectedLanguagesError={setSelectedLanguagesError}
                />

                <div>
                    <StepNavigationButtons prev="personal-info" next="services" />
                </div>
            </form>
        </div>
    );
};

export default ExperienceForm;