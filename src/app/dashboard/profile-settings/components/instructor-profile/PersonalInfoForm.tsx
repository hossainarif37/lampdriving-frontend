/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PersonalInfoFields, { IPersonalInfoInputs } from '@/components/shared/forms/PersonalInfoFields';
import { FC, useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hook';
import PhotoUpload, { IProfilePhoto } from '@/components/shared/PhotoUpload';
import { useFormWithDefaultValues } from '@/hooks/useFormWithDefaultValues';
import { useImage } from '@/hooks/useImage';

const PersonalInfoForm: FC = () => {
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

        try {
            console.log(payload); // Replace with API call
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile.');
        }
    };

    return (
        <div>
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
                    isRequired={false}
                    defaultValues={defaultValues}
                />

                <Button type='submit' className='w-full mt-7 gradient-color h-12'>
                    Save
                </Button>
            </form>
        </div>
    );
};

export default PersonalInfoForm;
