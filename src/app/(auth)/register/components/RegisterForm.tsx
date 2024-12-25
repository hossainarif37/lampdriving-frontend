"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { genderOptions } from '@/constant/gender';
import { toast } from '@/hooks/use-toast';
import { useRegisterUserMutation } from '@/redux/api/authApi/authApi';
import { IRegisterInputs } from '@/types/auth';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';


const RegisterForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, control, watch } = useForm<IRegisterInputs>();
    const [registerUser, { isLoading: isRegistering }] = useRegisterUserMutation();
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // Watch password fields
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const router = useRouter();

    const handleRegister = (data: IRegisterInputs) => {
        registerUser(data).unwrap().then((res) => {
            toast({
                message: res.message,
            })
            router.push("/login");
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message || "Something went wrong",
            })
        })
    }

    const handlePasswordToggle = (field: string) => {
        if (field === 'password') {
            setPasswordVisible((prev) => !prev);
        } else if (field === 'confirm-password') {
            setConfirmPasswordVisible((prev) => !prev);
        }
    }

    useEffect(() => {
        if (confirmPassword?.length >= 6) {
            if (confirmPassword && password !== confirmPassword) {
                setConfirmPasswordError("Passwords do not match");
            } else {
                setConfirmPasswordError("");
            }
        }
    }, [password, confirmPassword]);

    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
            className='w-full md:w-[500px] lg:w-[750px] mx-auto p-5 md:p-10 flex flex-col items-center md:shadow-lg md:rounded-lg md:border'
        >
            <h1 className='text-2xl md:text-3xl font-bold text-secondary'>Register</h1>

            <div className='w-full mt-7'>
                <div className='flex flex-col gap-5'>
                    {/* Name */}
                    <div className='flex flex-col md:flex-row gap-5'>
                        {/* First Name */}
                        <div className='w-full'>
                            <label htmlFor="first-name" className='font-semibold text-secondary'>First Name</label>
                            <Input
                                {...register('name.firstName', {
                                    required: "First name is required"
                                })
                                }
                                type="text" id='first-name' placeholder="Enter your firstname" className='xl:h-12 mt-1'
                            />
                            {errors?.name?.firstName && <p className='text-red-500 text-sm mt-1'>{errors?.name?.firstName?.message}</p>}
                        </div>

                        {/* Last Name */}
                        <div className='w-full'>
                            <label htmlFor="last-name" className='font-semibold text-secondary'>Last Name</label>
                            <Input
                                {...register('name.lastName', {
                                    required: "Last name is required"
                                })
                                }
                                type="text" id="last-name" placeholder="Enter your lastname" className='xl:h-12 mt-1'
                            />
                            {errors?.name?.lastName && <p className='text-red-500 text-sm mt-1'>{errors?.name?.lastName?.message}</p>}
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-5'>
                        {/* Gender */}
                        <div className='w-full'>
                            <label className="font-semibold text-secondary">Gender</label>
                            <Controller
                                name="gender"
                                control={control}
                                rules={{ required: "Gender is required" }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value || ''}>
                                        <SelectTrigger id='gender' className="xl:h-12 mt-1">
                                            <SelectValue className="placeholder:text-[#00000012]" placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                genderOptions.map((gender, i) => (
                                                    <SelectItem key={i} value={gender.toLowerCase()}>
                                                        {gender}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            {errors?.gender && <p className='text-red-500 text-sm mt-1'>{errors?.gender?.message}</p>}
                        </div>

                        {/* Date of Birth */}
                        <div className='w-full'>
                            <label htmlFor="date-of-birth" className='font-semibold text-secondary'>Date of Birth</label>
                            <Input
                                {...register('dateOfBirth', {
                                    required: "Date of birth is required"
                                })
                                }
                                type="date" id='date-of-birth' className='xl:h-12 mt-1'
                            />
                            {errors?.dateOfBirth && <p className='text-red-500 text-sm mt-1'>{errors?.dateOfBirth?.message}</p>}
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-5'>
                        {/* Email */}
                        <div className='w-full'>
                            <label htmlFor="email" className='font-semibold text-secondary'>Email</label>
                            <Input
                                {...register('email', {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                type="email" id='email' placeholder="Enter your email" className='xl:h-12 mt-1'
                            />
                            {errors?.email && <p className='text-red-500 text-sm mt-1'>{errors?.email?.message}</p>}
                        </div>

                        {/* Phone */}
                        <div className='w-full'>
                            <label htmlFor="phone" className='font-semibold text-secondary'>Phone</label>
                            <Input
                                {...register('phone', {
                                    required: "Phone number is required",
                                    maxLength: {
                                        value: 10,
                                        message: "Phone number must be 10 digits"
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Phone number must be 10 digits"
                                    }
                                })
                                }
                                type="number" id='phone' placeholder="Enter your phone number" className='xl:h-12 mt-1'
                            />
                            {errors?.phone && <p className='text-red-500 text-sm mt-1'>{errors?.phone?.message}</p>}
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-5 mb-5 w-full'>
                        {/* Password */}
                        <div className='w-full'>
                            <label htmlFor="password" className='font-semibold text-secondary'>Password</label>
                            <div className='w-full relative flex'>
                                <Input
                                    {...register('password', {
                                        minLength: {
                                            message: "Password must be at least 6 characters", value: 6
                                        },
                                        required: "Password is required"
                                    })}
                                    type={passwordVisible ? "text" : "password"}
                                    id='password'
                                    placeholder="Enter your password"
                                    className='w-full xl:h-12 mt-1 pr-10'
                                />
                                <span
                                    className='cursor-pointer absolute right-2 top-1/2 -translate-y-1/2'
                                    onClick={() => handlePasswordToggle('password')}
                                >
                                    {passwordVisible ? <Eye width={20} height={20} /> : <EyeOff width={20} height={20} />}
                                </span>
                            </div>
                            {errors?.password && <p className='text-red-500 text-sm mt-1'>{errors?.password?.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className='w-full'>
                            <label htmlFor="confirm-password" className='font-semibold text-secondary'>Confirm Password</label>
                            <div className='w-full relative flex'>
                                <Input
                                    {...register('confirmPassword', {
                                        minLength: {
                                            message: "Password must be at least 6 characters", value: 6
                                        },
                                        required: "Confirm Password is required"
                                    })}
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    id='confirm-password'
                                    placeholder="Re-type your password"
                                    className='w-full xl:h-12 mt-1 pr-10'
                                />
                                <span
                                    className='cursor-pointer absolute right-2 top-1/2 -translate-y-1/2'
                                    onClick={() => handlePasswordToggle('confirm-password')}
                                >
                                    {confirmPasswordVisible ? <Eye width={20} height={20} /> : <EyeOff width={20} height={20} />}
                                </span>
                            </div>
                            {errors?.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>}
                            {confirmPasswordError && <p className='text-red-500 text-sm mt-1'>{confirmPasswordError}</p>}
                        </div>
                    </div>
                </div>
            </div>

            <Button disabled={isRegistering} className='w-full mt-3 gradient-color h-12'>Register</Button>

            <p className='mt-5'>Already have an account? <Link href="/login" className='text-blue-500 hover:underline font-semibold'>Login Here</Link></p>
        </form>
    );
};

export default RegisterForm;