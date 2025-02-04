/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import PersonalInfoFields, { IPersonalInfoInputs } from '@/components/shared/forms/PersonalInfoFields';
import { useInstructorRegister } from '@/providers/InstructorRegisterProvider';
import { IPersonalInfo } from '@/types/instructor';
import PhotoUpload, { IProfilePhoto } from '@/components/shared/PhotoUpload';

interface IPersonalInfoFormProps<T extends { profileImg?: string }> {
    profilePhoto: IProfilePhoto;
    setProfilePhoto: Dispatch<SetStateAction<IProfilePhoto>>;
}

const PersonalInfoForm = <T extends { profileImg?: string }>({
    profilePhoto,
    setProfilePhoto
}: IPersonalInfoFormProps<T>) => {
    const { register, handleSubmit, formState: { errors }, control, setValue, setError } = useForm<IPersonalInfoInputs>();
    const router = useRouter();
    const { setPersonalInfo, personalInfo } = useInstructorRegister();


    console.log('personalInfo', personalInfo);
    console.log('profilePhoto', profilePhoto);

    const onSubmit = (data: IPersonalInfo) => {
        console.log('data', data);
        setPersonalInfo(data);
        router.push("/instructor-registration?step=experience");
    };

    return (
        <div className='md:border md:p-16 md:shadow-lg md:rounded-lg mt-5'>
            <form id="personal-info-form" onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-primary'>Personal Info</h1>

                <div className='flex flex-col items-center'>
                    <PhotoUpload
                        profilePhoto={profilePhoto}
                        setProfilePhoto={setProfilePhoto}
                        register={register}
                        setValue={setValue}
                        setError={setError}
                        isRemoveUrl={true}
                    />
                    {errors.profileImg && <p className='text-red-500 text-sm mb-3'>{errors.profileImg.message}</p>}
                </div>

                <PersonalInfoFields
                    register={register}
                    errors={errors}
                    defaultValues={personalInfo}
                    control={control}
                    isRequired={true}
                />

                <StepNavigationButtons
                    prev=""
                    next="experience"
                    form="personal-info-form"
                />
            </form>
        </div>
    );
};

export default PersonalInfoForm;