import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Textarea } from '@/components/ui/textarea';
import { Dispatch, FC, SetStateAction } from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import FileUpload from '../FileUpload';
import { languageList } from '@/constant/languageList';
import { IExperience } from '@/types/instructor';

interface IExperienceInputs {
    experience: number;
    description: string;
    languages: string[];
}

interface IExperienceFieldsProps {
    register: UseFormRegister<IExperienceInputs>;
    errors: FieldErrors<IExperienceInputs>;
    defaultValues?: IExperience | undefined;
    setDefaultValues?: Dispatch<SetStateAction<IExperience | undefined>>;
    isRequired: boolean;
    drivingLicenseFile: File | null;
    setDrivingLicenseFile: Dispatch<SetStateAction<File | null>>;
    drivingLicenseURL: string;
    setDrivingLicenseURL: Dispatch<SetStateAction<string>>;
    experienceCertificateFile: File | null;
    setExperienceCertificateFile: Dispatch<SetStateAction<File | null>>;
    experienceCertificateURL: string;
    setExperienceCertificateURL: Dispatch<SetStateAction<string>>;
    selectedLanguages: string[];
    setSelectedLanguages: Dispatch<SetStateAction<string[]>>;
    selectedLanguagesError: string;
    setSelectedLanguagesError: Dispatch<SetStateAction<string>>;
    drivingLicenseError: string;
    setDrivingLicenseError: Dispatch<SetStateAction<string>>;
    experienceCertificateError: string;
    setExperienceCertificateError: Dispatch<SetStateAction<string>>;
    instructorLicenseFile: File | null;
    setInstructorLicenseFile: Dispatch<SetStateAction<File | null>>;
    instructorLicenseURL: string;
    setInstructorLicenseURL: Dispatch<SetStateAction<string>>;
    instructorLicenseError: string;
    setInstructorLicenseError: Dispatch<SetStateAction<string>>;
}

const ExperienceFields: FC<IExperienceFieldsProps> = ({ register, errors, defaultValues, setDefaultValues, isRequired, selectedLanguages, drivingLicenseFile, setDrivingLicenseFile, drivingLicenseURL, setDrivingLicenseURL, experienceCertificateFile, setExperienceCertificateFile, experienceCertificateURL, setExperienceCertificateURL, setSelectedLanguages, drivingLicenseError, setDrivingLicenseError, selectedLanguagesError, setSelectedLanguagesError, experienceCertificateError, setExperienceCertificateError, instructorLicenseFile, setInstructorLicenseFile, instructorLicenseURL, setInstructorLicenseURL, instructorLicenseError, setInstructorLicenseError }) => {
    const removeDrivingLicense = () => {
        setDrivingLicenseFile(null);
        setDrivingLicenseURL('');
    };

    const removeExperienceCertificate = () => {
        setExperienceCertificateFile(null);
        setExperienceCertificateURL('');
    };

    const removeInstructorLicense = () => {
        setInstructorLicenseFile(null);
        setInstructorLicenseURL('');
    };

    return (
        <div className='w-full mt-7'>
            <div className='flex flex-col gap-5'>
                <div className='w-full'>
                    <label htmlFor="experience" className='font-semibold text-primary'>Driving Experience</label>
                    <Input
                        {...register('experience', {
                            required: "Experience is required"
                        })
                        }
                        defaultValue={defaultValues?.experience}
                        type="number" id='experience' placeholder="How many years of experience you have?" className='h-11 xl:h-14 mt-1'
                    />
                    {errors?.experience && <p className='text-red-500 text-sm mt-1'>{errors?.experience?.message}</p>}
                </div>

                {/* Description */}
                <div className='w-full'>
                    <label htmlFor="experience" className='font-semibold text-primary'>Description</label>
                    <Textarea
                        placeholder="Enter your description"
                        rows={5}
                        {...register('description', { required: 'Description is required' })}
                        className='mt-1'
                        defaultValue={defaultValues?.description}
                    />
                    {errors?.description && <span className="text-red-500">{errors?.description?.message}</span>}
                </div>

                <div className='w-full'>
                    <label htmlFor="experience" className='font-semibold text-primary'>Languages</label>
                    <MultiSelect
                        options={languageList}
                        onValueChange={setSelectedLanguages}
                        defaultValue={defaultValues?.languages || selectedLanguages}
                        value={defaultValues?.languages}
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
                    <label htmlFor="first-name" className='font-semibold text-primary'>Instructor License</label>
                    <FileUpload
                        label="Click 1 file to upload"
                        maxSize="1500x1500px"
                        imageUrl={instructorLicenseURL}
                        setImageUrl={setInstructorLicenseURL}
                        setImageError={setInstructorLicenseError}
                        selectedFile={instructorLicenseFile}
                        setSelectedFile={setInstructorLicenseFile}
                        removeImage={removeInstructorLicense}
                    />
                    {drivingLicenseError && <p className='text-red-500 text-sm mt-1'>{drivingLicenseError}</p>}
                </div>

                {/* Driving License */}
                <div className='w-full space-y-1'>
                    <label htmlFor="first-name" className='font-semibold text-primary'>Driving License</label>
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
                    <label htmlFor="first-name" className='font-semibold text-primary'>Experience Certificate</label>
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
    );
};

export default ExperienceFields;