"use client";

import PersonalInfoFields, { IPersonalInfoInputs } from '@/components/shared/forms/PersonalInfoFields';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hook';
import PhotoUpload, { IProfilePhoto } from '@/components/shared/PhotoUpload';

const PersonalInfoForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<IPersonalInfoInputs>();
    const { user } = useAppSelector((state) => state.authSlice);
    const defaultValues: IPersonalInfoInputs = {
        name: {
            firstName: user?.name?.firstName || '',
            lastName: user?.name?.lastName || '',
        },
        email: user?.email || '',
        phone: user?.phone || '',
        gender: user?.gender || 'male',
        dateOfBirth: user?.dateOfBirth || '',
    }

    const [profilePhoto, setProfilePhoto] = useState<IProfilePhoto>({
        file: null,
        url: user?.profileImg || ""
    })

    const onSubmit = (data: IPersonalInfoInputs) => {
        console.log(data);
    };

    return (
        <div className=''>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <h1 className='text-2xl font-bold text-secondary'>Personal Info</h1>

                <PhotoUpload
                    profilePhoto={profilePhoto}
                    setProfilePhoto={setProfilePhoto}
                />

                <PersonalInfoFields
                    register={register}
                    errors={errors}
                    control={control}
                    isRequired={true}
                    defaultValues={defaultValues}
                />

                <Button type='submit' className='w-full mt-7 gradient-color h-12'>Save</Button>
            </form>
        </div>
    );
};

export default PersonalInfoForm;