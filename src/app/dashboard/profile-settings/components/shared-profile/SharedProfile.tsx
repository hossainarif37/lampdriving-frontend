"use client"

import { IPersonalInfo } from '@/app/(auth)/instructor-registration/components/InstructorRegistration';
import PersonalInfoFields from '@/components/shared/forms/PersonalInfoFields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { genderOptions } from '@/constant/gender';
import { IRegisterInputs } from '@/types/auth';
import { Eye, EyeClosed, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const SharedProfile: FC = () => {
    const { register, handleSubmit, formState: { errors }, control, watch } = useForm<IPersonalInfo>();
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    // Watch password fields
    // const password = watch('password');
    // const confirmPassword = watch('confirmPassword');
    // const router = useRouter();

    const onSubmit = (data: IPersonalInfo) => {
        console.log(data);
    }
    const handlePasswordToggle = (field: string) => {
        if (field === 'password') {
            setPasswordVisible((prev) => !prev);
        } else if (field === 'confirm-password') {
            setConfirmPasswordVisible((prev) => !prev);
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full md:w-[500px] lg:w-[750px] mx-auto p-5 md:p-10 flex flex-col items-start md:shadow-lg bg-light md:rounded-lg md:border'
        >
            <h1 className='text-2xl md:text-3xl font-bold text-secondary'>Personal Details</h1>

            <PersonalInfoFields
                register={register}
                errors={errors}
                control={control}
            />

            <Button className='w-full mt-7 gradient-color h-12'>Update</Button>
        </form >
    );
};

export default SharedProfile;