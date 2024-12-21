/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { FC, useState } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';
import FileUpload from '@/components/shared/FileUpload';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { MultiSelect } from '@/components/ui/multi-select';

type Inputs = {
    experience: string;
    description: string;
    languages: string[];
}

const languageList = [
    { value: "english", label: "English"},
    { value: "spanish", label: "Spanish"},
    { value: "chinese", label: "Chinese"},
    { value: "french", label: "French"},
    { value: "german", label: "German"},
];

const ExperienceForm: FC = () => {
    // Driving License
    const [drivingLicenseURL, setDrivingLicenseURL] = useState<string>('');
    const [drivingLicenseFile, setDrivingLicenseFile] = useState<File | null>(null);
    const [drivingLicenseError, setDrivingLicenseError] = useState<string>('');

    // Experience Certificate
    const [experienceCertificateURL, setExperienceCertificateURL] = useState<string>('');
    const [experienceCertificateFile, setExperienceCertificateFile] = useState<File | null>(null);
    const [experienceCertificateError, setExperienceCertificateError] = useState<string>('');

    // Selected languages
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);


    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const removeDrivingLicense = () => {
        setDrivingLicenseFile(null);
        setDrivingLicenseURL('');
    };

    const removeExperienceCertificate = () => {
        setDrivingLicenseFile(null);
        setDrivingLicenseURL('');
    };

    const handleExperience = (data: Inputs) => {
        console.log({...data, languages: selectedLanguages});
    }


    return (
        <div className='border p-5 md:p-16 md:shadow-lg md:rounded-lg mt-5'>
            <form onSubmit={handleSubmit(handleExperience)} className='w-full md:max-w-4xl flex flex-col'>
                <h1 className='text-2xl md:text-3xl font-bold text-secondary'>Experience and Certifications</h1>

                <div className='w-full mt-7'>
                    <div className='flex flex-col gap-5'>
                        <div className='w-full'>
                            <label htmlFor="experience" className='font-semibold text-secondary'>Driving Experience</label>
                            <Input
                                {...register('experience', {
                                    required: "Experience is required"
                                })
                                }
                                type="text" id='experience' placeholder="Enter your experience (ex: 2 years)" className='h-11 xl:h-14 mt-1'
                            />
                            {errors?.experience && <p className='text-red-500 text-sm mt-1'>{errors?.experience?.message}</p>}
                        </div>

                        {/* Description */}
                        <div className='w-full'>
                            <label htmlFor="experience" className='font-semibold text-secondary'>Description</label>
                            <Textarea
                                placeholder="Enter your description"
                                rows={5}
                                {...register('description', { required: 'Description is required' })}
                                className='mt-1'
                            />
                            {errors?.description && <span className="text-red-500">{errors?.description?.message}</span>}
                        </div>

                        <div className='w-full'>
                            <label htmlFor="experience" className='font-semibold text-secondary'>Languages</label>
                            <MultiSelect
                                options={languageList}
                                onValueChange={setSelectedLanguages}
                                defaultValue={selectedLanguages}
                                placeholder="Select Languages"
                                variant="inverted"
                                animation={2}
                                maxCount={3}
                                className='mt-1'
                            />
                            {/* {errors?.description && <span className="text-red-500">{errors?.description?.message}</span>} */}
                        </div>

                        {/* Driving License */}
                        <div className='w-full space-y-1'>
                            <label htmlFor="first-name" className='font-semibold text-secondary'>Driving License</label>
                            <FileUpload
                                label="Click 1 file to upload"
                                maxSize="1500x1500px"
                                imageUrl={drivingLicenseURL}
                                setImageUrl={setDrivingLicenseURL}
                                setImageError={setDrivingLicenseError}
                                selectedFile={drivingLicenseFile}
                                setSelectedFile={setDrivingLicenseFile}
                                removeImage={removeDrivingLicense}
                            />
                            {/* {errors?.driving && <p className='text-red-500 text-sm mt-1'>{errors?.name?.firstName?.message}</p>} */}
                        </div>

                        {/* Experience Certificate */}
                        <div className='w-full space-y-1'>
                            <label htmlFor="first-name" className='font-semibold text-secondary'>Experience Certificate</label>
                            <FileUpload
                                label="Click 1 file to upload"
                                maxSize="1500×1500px"
                                imageUrl={experienceCertificateURL}
                                setImageUrl={setExperienceCertificateURL}
                                setImageError={setExperienceCertificateError}
                                selectedFile={experienceCertificateFile}
                                setSelectedFile={setExperienceCertificateFile}
                                removeImage={removeExperienceCertificate}
                            />
                            {/* {errors?.driving && <p className='text-red-500 text-sm mt-1'>{errors?.name?.firstName?.message}</p>} */}
                        </div>
                    </div>
                </div>

                <div>
                    <StepNavigationButtons prev="personal-info" next="car-info" />
                </div>
            </form>
        </div>
    );
};

export default ExperienceForm;