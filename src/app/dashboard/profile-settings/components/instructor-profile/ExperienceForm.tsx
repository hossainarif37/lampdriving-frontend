"use client"

import ExperienceFields from '@/components/shared/forms/ExperienceFields';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { IPhoto } from '@/hooks/useImage';
import { useUpdateInstructorMutation } from '@/redux/api/instructorApi/instructorApi';
import { IExperience } from '@/types/instructor';
import { FC, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

interface IExperienceFormProps {
    instructor: any;
}

const ExperienceForm: FC<IExperienceFormProps> = ({ instructor }) => {
    const form = useForm<IExperience>({
        defaultValues: {
            experience: {
                month: instructor?.experience?.month || '',
                year: instructor?.experience?.year || ''
            },
            description: instructor?.description || '',
            languages: instructor?.languages || [],
            documents: {
                instructorLicense: instructor?.documents?.instructorLicense || '',
                drivingLicense: instructor?.documents?.drivingLicense || '',
                experienceCertificates: instructor?.documents?.experienceCertificates || []
            }
        }
    });

    const [instructorLicense, setInstructorLicense] = useState<IPhoto>({
        file: null,
        url: instructor?.documents?.instructorLicense || undefined
    })

    const [drivingLicense, setDrivingLicense] = useState<IPhoto>({
        file: null,
        url: instructor?.documents?.drivingLicense || undefined
    })

    const fieldArray = useFieldArray({ name: 'documents.experienceCertificates', control: form.control });

    const [updateInstructor, { isLoading: isUpdating }] = useUpdateInstructorMutation();

    // Selected languages
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(instructor?.languages || []);
    const [selectedLanguagesError, setSelectedLanguagesError] = useState<string>('');

    console.log(instructor, 'instructor');

    const onSubmit = (data: IExperience) => {
        const experienceData = {
            ...data,
            languages: selectedLanguages
        }

        updateInstructor(experienceData).unwrap()
            .then((res) => {
                toast({ message: res.message })
            })
            .catch((error) => {
                console.error('Failed to update profile:', error);
                toast({ success: false, message: error.data.message as string || 'Failed to update profile.' });
            })
    }

    return (
        <div className=''>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <h1 className='text-2xl font-bold text-primary'>Experience</h1>
                <ExperienceFields
                    form={form}
                    fieldArray={fieldArray}
                    isRequired={true}
                    selectedLanguages={selectedLanguages}
                    setSelectedLanguages={setSelectedLanguages}
                    instructorLicense={instructorLicense}
                    setInstructorLicense={setInstructorLicense}
                    drivingLicense={drivingLicense}
                    setDrivingLicense={setDrivingLicense}
                />

                <Button disabled={isUpdating} loading={isUpdating} type='submit' className='w-full mt-7 gradient-color h-12'>Save</Button>
            </form>
        </div>
    );
};

export default ExperienceForm;