"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { genderOptions } from '@/constant/gender';
import { toast } from '@/hooks/use-toast';
import { useRegisterUserMutation } from '@/redux/api/authApi/authApi';
import { IRegisterInputs } from '@/types/auth';
import { Eye, EyeClosed } from 'lucide-react';
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

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const router = useRouter();

    const handleRegister = (data: IRegisterInputs) => {
        console.log(data);
        // registerUser(data).unwrap().then((res) => {
        //     toast({
        //         message: res.message,
        //     })
        //     router.push("/login");
        // }).catch((err) => {
        //     toast({
        //         success: false,
        //         message: err.data.message || "Something went wrong",
        //     })
        // })
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
            <h1 className='text-2xl md:text-3xl font-bold text-secondary'>Learner Registration</h1>

            <div className='w-full mt-10'>
                <div className='flex flex-col gap-5'>
                    {/* Name Section */}
                    <div className='flex flex-col md:flex-row gap-5'>
                        <div className='w-full'>
                            <label htmlFor="first-name" className='font-semibold text-secondary'>First Name</label>
                            <Input
                                {...register('name.firstName', {
                                    required: "First name is required"
                                })}
                                type="text" id='first-name' placeholder="Enter your firstname" className='xl:h-12 mt-1'
                            />
                            {errors?.name?.firstName && <p className='text-red-500 text-sm mt-1'>{errors?.name?.firstName?.message}</p>}
                        </div>
                        <div className='w-full'>
                            <label htmlFor="last-name" className='font-semibold text-secondary'>Last Name</label>
                            <Input
                                {...register('name.lastName', {
                                    required: "Last name is required"
                                })}
                                type="text" id="last-name" placeholder="Enter your lastname" className='xl:h-12 mt-1'
                            />
                            {errors?.name?.lastName && <p className='text-red-500 text-sm mt-1'>{errors?.name?.lastName?.message}</p>}
                        </div>
                    </div>


                    {/* License Information */}
                    <div className='w-full'>
                        <h1 className='text-2xl font-semibold text-secondary mb-3'>Local License</h1>

                        <div className='flex flex-col md:flex-row gap-5'>
                            <div className='w-full'>
                                <label htmlFor="local-licence" className='font-semibold text-secondary'>Local Licence No.</label>
                                <Input
                                    {...register('localLicense.licenseNumber', {
                                        required: "Local licence number is required"
                                    })}
                                    type="text" id='local-licence' className='xl:h-12 mt-1'
                                />
                                {errors?.localLicense?.licenseNumber && <p className='text-red-500 text-sm mt-1'>{errors?.localLicense?.licenseNumber?.message}</p>}
                            </div>
                            <div className='w-full'>
                                <label htmlFor="issue-date" className='font-semibold text-secondary'>Issue Date</label>
                                <Input
                                    {...register('localLicense.issueDate', {
                                        required: "Issue date is required"
                                    })}
                                    type="date" id='issue-date' className='xl:h-12 mt-1'
                                />
                                {errors?.localLicense?.issueDate && <p className='text-red-500 text-sm mt-1'>{errors?.localLicense?.issueDate?.message}</p>}
                            </div>
                            <div className='w-full'>
                                <label htmlFor="expire-date" className='font-semibold text-secondary'>Expire Date</label>
                                <Input
                                    {...register('localLicense.expiryDate')}
                                    type="date" id='expire-date' className='xl:h-12 mt-1'
                                />
                                {errors?.localLicense?.expiryDate && <p className='text-red-500 text-sm mt-1'>{errors?.localLicense?.expiryDate?.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Overseas Experience */}
                    <div>
                        <h1 className='text-2xl font-semibold text-secondary mb-3'>Overseas Experience (If Applicable)</h1>
                        <div className='flex flex-col md:flex-row gap-5'>
                            <div className='w-full'>
                                <label htmlFor="overseas-country" className='font-semibold text-secondary'>Country Name</label>
                                <Input
                                    {...register('overseasExperience.countryName')}
                                    type="text" id='overseas-country' placeholder="Enter country name if applicable" className='xl:h-12 mt-1'
                                />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="overseas-license" className='font-semibold text-secondary'>Overseas License No.</label>
                                <Input
                                    {...register('overseasExperience.licenseNumber')}
                                    type="text" id='overseas-license' placeholder="Enter license number if applicable" className='xl:h-12 mt-1'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-5'>
                        <div className='w-full'>
                            <label htmlFor="issue-date" className='font-semibold text-secondary'>Issue Date</label>
                            <Input
                                {...register('overseasExperience.issueDate')}
                                type="date" id='issue-date' className='xl:h-12 mt-1'
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="expire-date" className='font-semibold text-secondary'>Expiry Date</label>
                            <Input
                                {...register('overseasExperience.expiryDate')}
                                type="date" id='expire-date' className='xl:h-12 mt-1'
                            />
                        </div>
                    </div>

                    {/* Driving School Information */}
                    <div className='flex flex-col md:flex-row gap-5'>
                        <div className='w-full'>
                            <label htmlFor="driving-school" className='font-semibold text-secondary'>Previous Driving School (if any)</label>
                            <Input
                                {...register('previousDrivingSchool')}
                                type="text" id='driving-school' placeholder="Enter previous driving school name" className='xl:h-12 mt-1'
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="total-hours" className='font-semibold text-secondary'>Total Driving Hours</label>
                            <Input
                                {...register('totalLessonHours')}
                                type="number" id='total-hours' placeholder="Enter total driving hours" className='xl:h-12 mt-1'
                            />
                        </div>
                    </div>

                    {/* Referral Information */}
                    <div className='w-full'>
                        <label htmlFor="referral" className='font-semibold text-secondary'>How did you find us?</label>
                        <Controller
                            name="referralSource"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value || ''}>
                                    <SelectTrigger id='referral' className="xl:h-12 mt-1">
                                        <SelectValue placeholder="Select how you found us" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="online">Online Search</SelectItem>
                                        <SelectItem value="word-of-mouth">Word of Mouth</SelectItem>
                                        <SelectItem value="referral">Referral</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    {/* Contact Information */}
                    <div className='flex flex-col md:flex-row gap-5'>
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
                        <div className='w-full'>
                            <label htmlFor="facebook" className='font-semibold text-secondary'>Facebook ID</label>
                            <Input
                                {...register('facebookId')}
                                type="text" id='facebook' placeholder="Enter your Facebook ID" className='xl:h-12 mt-1'
                            />
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className='flex flex-col md:flex-row gap-5 mb-5'>
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
                                    {passwordVisible ? <Eye width={20} height={20} /> : <EyeClosed width={20} height={20} />}
                                </span>
                            </div>
                            {errors?.password && <p className='text-red-500 text-sm mt-1'>{errors?.password?.message}</p>}
                        </div>

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
                                    {confirmPasswordVisible ? <Eye width={20} height={20} /> : <EyeClosed width={20} height={20} />}
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