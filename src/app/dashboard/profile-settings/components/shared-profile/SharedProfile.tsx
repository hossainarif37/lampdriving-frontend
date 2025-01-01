"use client"

import { IPersonalInfo } from '@/app/(auth)/instructor-registration/components/InstructorRegistration';
import PersonalInfoFields from '@/components/shared/forms/PersonalInfoFields';
import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import UpdatePassword from './UpdatePassword';
import PhotoUpload, { IProfilePhoto } from '@/components/shared/PhotoUpload';

const SharedProfile: FC = () => {
    const { register, handleSubmit, formState: { errors }, control, watch } = useForm<IPersonalInfo>();
    const [profilePhoto, setProfilePhoto] = useState<IProfilePhoto>({
        file: null,
        url: ""
    })

    console.log('profilePhoto', profilePhoto);

    const onSubmit = (data: IPersonalInfo) => console.log(data);    

    return (
        <div>         
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full md:w-[500px] lg:w-[750px] mx-auto p-5 md:p-10 flex flex-col items-start md:shadow-lg bg-light md:rounded-lg md:border'
            >
                <h1 className='text-xl md:text-2xl font-bold text-secondary'>Personal Details</h1>

                <PhotoUpload
                    profilePhoto={profilePhoto}
                    setProfilePhoto={setProfilePhoto}
                />

                <PersonalInfoFields
                    register={register}
                    errors={errors}
                    control={control}
                    isRequired={false}
                />
                <Button type='submit' className='w-full text-gray-300 mt-7 gradient-color h-12'>Update</Button>
            </form >
            <UpdatePassword />
        </div>
    );
};

export default SharedProfile;