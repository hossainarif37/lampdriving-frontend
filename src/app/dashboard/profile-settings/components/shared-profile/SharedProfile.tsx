"use client"

import { IPersonalInfo } from '@/app/(auth)/instructor-registration/components/InstructorRegistration';
import PersonalInfoFields from '@/components/shared/forms/PersonalInfoFields';
import { Button } from '@/components/ui/button';
import { FC, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import UpdatePassword from './UpdatePassword';
import PhotoUpload, { IProfilePhoto } from '@/components/shared/PhotoUpload';
import { useAppSelector } from '@/redux/hook';
import { useFormWithDefaultValues } from '@/hooks/useFormWithDefaultValues';
import { useImage } from '@/hooks/useImage';
import { useUpdateUserMutation } from '@/redux/api/userApi/userApi';
import { toast } from '@/hooks/use-toast';

const SharedProfile: FC = () => {
    const { user } = useAppSelector((state) => state.authSlice);
    // Default values from the user
    const defaultValues = useMemo(() => ({
        name: {
            firstName: user?.name?.firstName || '',
            lastName: user?.name?.lastName || '',
        },
        email: user?.email || '',
        phone: user?.phone || '',
        gender: user?.gender || 'male',
        dateOfBirth: user?.dateOfBirth || '',
    }), [user]);

    const { register, handleSubmit, modifiedFields, control, formState: { errors } } = useFormWithDefaultValues(defaultValues);

    const { profilePhoto, setProfilePhoto, isImageModified, validateImage } = useImage(user?.profileImg);

    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    const onSubmit = async (data: typeof defaultValues) => {
        // Validate the image before proceeding
        if (!validateImage()) return;

        // Check if there are any changes
        if (Object.keys(modifiedFields).length === 0 && !isImageModified) {
            alert('No changes detected.');
            return;
        }

        const payload = {
            ...modifiedFields,
            ...(isImageModified && profilePhoto.url ? { profileImg: profilePhoto.url } : {}),
        };

        updateUser(payload).unwrap().then((res) => {
            toast({ message: res.message })
        }).catch((error) => {
            console.error('Failed to update profile:', error);
            toast({ success: false, message: error.data.message as string || 'Failed to update profile.' });
        })
    };

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