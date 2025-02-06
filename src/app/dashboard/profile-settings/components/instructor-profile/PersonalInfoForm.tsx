/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PersonalInfoFields, { IPersonalInfoInputs } from '@/components/shared/forms/PersonalInfoFields';
import { FC, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hook';
import PhotoUpload from '@/components/shared/PhotoUpload';
import { useFormWithDefaultValues } from '@/hooks/useFormWithDefaultValues';
import { useImage } from '@/hooks/useImage';
import { useUpdateUserMutation } from '@/redux/api/userApi/userApi';
import { toast } from '@/hooks/use-toast';

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
        profileImg: user?.profileImg || '',
    }), [user]);

    const {
        register,
        handleSubmit,
        modifiedFields,
        control,
        formState: { errors },
        setValue,
        setError
    } = useFormWithDefaultValues<IPersonalInfoInputs>(defaultValues);

    const { profilePhoto, setProfilePhoto, isImageModified, validateImage } = useImage(user?.profileImg);

    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    const onSubmit = async (data: IPersonalInfoInputs) => {
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

        updateUser(payload).unwrap()
            .then((res) => {
                toast({ message: res.message })
            })
            .catch((error) => {
                console.error('Failed to update profile:', error);
                toast({ success: false, message: error.data.message as string || 'Failed to update profile.' });
            })
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <h1 className='text-2xl font-bold text-primary'>Personal Info</h1>

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
                    control={control}
                    isRequired={false}
                    defaultValues={defaultValues}
                />

                <Button type='submit' className='w-full mt-7 gradient-color h-12' disabled={isUpdating}>
                    {isUpdating ? 'Updating...' : 'Update Profile'}
                </Button>
            </form>
        </div>
    );
};

export default PersonalInfoForm;
