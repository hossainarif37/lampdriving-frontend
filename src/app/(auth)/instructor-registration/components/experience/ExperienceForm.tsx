/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';
import FileUpload from '@/components/shared/FileUpload';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { MultiSelect } from '@/components/ui/multi-select';
import { useRouter } from 'next/navigation';
import { IExperience } from '../InstructorRegistration';

type Inputs = {
    experience: string;
    description: string;
    languages: string[];
}

const languageList = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "chinese", label: "Chinese" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
];

interface IExperienceFormProps {
    experienceInfo: IExperience | undefined;
    setExperienceInfo: Dispatch<SetStateAction<IExperience | undefined>>
    drivingLicenseFile: File | null;
    setDrivingLicenseFile: Dispatch<SetStateAction<File | null>>;
    experienceCertificateFile: File | null;
    setExperienceCertificateFile: Dispatch<SetStateAction<File | null>>;
}

const ExperienceForm: FC<IExperienceFormProps> = ({experienceInfo, setExperienceInfo, drivingLicenseFile, setDrivingLicenseFile, experienceCertificateFile, setExperienceCertificateFile}) => {
    const [isClicked, setIsClicked] = useState(false);
    const router = useRouter();
    
    // Driving License
    const [drivingLicenseURL, setDrivingLicenseURL] = useState<string>(experienceInfo?.documents?.drivingLicense || '');
    
    const [drivingLicenseError, setDrivingLicenseError] = useState<string>('');

    // Experience Certificate
    const [experienceCertificateURL, setExperienceCertificateURL] = useState<string>(experienceInfo?.documents?.experienceCertificate || '');
    const [experienceCertificateError, setExperienceCertificateError] = useState<string>('');

    console.log('experienceInfo', experienceInfo);
    

    // Selected languages
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(experienceInfo?.languages || []);  
    const [selectedLanguagesError, setSelectedLanguagesError] = useState<string>('');


    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const removeDrivingLicense = () => {
        setDrivingLicenseFile(null);
        setDrivingLicenseURL('');
    };

    const removeExperienceCertificate = () => {
        setExperienceCertificateFile(null);
        setExperienceCertificateURL('');
    };

    console.log('Selected languages', selectedLanguages);
    const onSubmit = (data: Inputs) => {
        setIsClicked(true);
        if (!drivingLicenseURL || !experienceCertificateURL || selectedLanguages.length === 0) {
            if (!drivingLicenseURL) {
                setDrivingLicenseError(`${drivingLicenseError ? drivingLicenseError : 'Driving License is required'}`);
            }
            if (!experienceCertificateURL) {
                setExperienceCertificateError(`${experienceCertificateError ? experienceCertificateError : 'Experience Certificate is required'}`);
            }
            if (selectedLanguages.length === 0 ) {
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

        setExperienceInfo(experienceData);
        router.push("/instructor-registration?step=services");
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
            if (selectedLanguages.length > 0 || (experienceInfo?.languages?.length ?? 0) > 0) {
                setSelectedLanguagesError('');
            } else {
                setSelectedLanguagesError('Languages are required');
            }
        }
    }, [drivingLicenseURL, experienceCertificateURL, selectedLanguages, isClicked, drivingLicenseFile, experienceCertificateFile, experienceInfo]);

    return (
        <div className='border p-5 md:p-16 md:shadow-lg md:rounded-lg mt-5'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
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
                                defaultValue={experienceInfo?.experience}
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
                                defaultValue={experienceInfo?.description}
                            />
                            {errors?.description && <span className="text-red-500">{errors?.description?.message}</span>}
                        </div>

                        <div className='w-full'>
                            <label htmlFor="experience" className='font-semibold text-secondary'>Languages</label>
                            <MultiSelect
                                options={languageList}
                                onValueChange={setSelectedLanguages}
                                // defaultValue={selectedLanguages}
                                value={experienceInfo?.languages}
                                placeholder="Select Languages"
                                variant="inverted"
                                animation={2}
                                maxCount={3}
                                className='mt-1'
                            />
                            {selectedLanguagesError && <p className='text-red-500 text-sm mt-1'>{selectedLanguagesError}</p>}
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
                            {drivingLicenseError && <p className='text-red-500 text-sm mt-1'>{drivingLicenseError}</p>}
                        </div>

                        {/* Experience Certificate */}
                        <div className='w-full space-y-1'>
                            <label htmlFor="first-name" className='font-semibold text-secondary'>Experience Certificate</label>
                            <FileUpload
                                label="Click 1 file to upload"
                                maxSize="1500x1500px"
                                imageUrl={experienceCertificateURL}
                                setImageUrl={setExperienceCertificateURL}
                                setImageError={setExperienceCertificateError}
                                selectedFile={experienceCertificateFile}
                                setSelectedFile={setExperienceCertificateFile}
                                removeImage={removeExperienceCertificate}
                            />
                            {experienceCertificateError && <p className='text-red-500 text-sm mt-1'>{experienceCertificateError}</p>}
                        </div>
                    </div>
                </div>

                <div>
                    <StepNavigationButtons prev="personal-info" next="services" />
                </div>
            </form>
        </div>
    );
};

export default ExperienceForm;