"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { useRegisterUserMutation } from '@/redux/api/authApi/authApi';
import { useAppDispatch } from '@/redux/hook';
import { saveUser } from '@/redux/slices/authSlice/authSlice';
import { IRegisterInputs } from '@/types/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';


const RegisterForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<IRegisterInputs>();
    const [registerUser, { isLoading: isRegistering }] = useRegisterUserMutation();

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

    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
            className='w-full md:w-[500px] lg:w-[620px] mx-auto p-5 md:p-10 flex flex-col items-center md:shadow-lg md:rounded-lg md:border'
        >
            <h1 className='text-2xl md:text-3xl font-bold text-secondary'>Register</h1>

            <div className='w-full mt-7'>
                <div className='flex flex-col gap-5'>
                    {/* Name */}
                    <div className='flex gap-5'>
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

                    {/* Gender */}
                    <div>
                        <label className="font-semibold text-secondary">Gender</label>
                        <Controller
                            name="gender"
                            control={control}
                            rules={{ required: "Gender is required" }}
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className='mt-1 flex gap-x-5'
                                >
                                    <div className="flex items-center space-x-1">
                                        <RadioGroupItem value="male" id="male" className='' />
                                        <label htmlFor="male" className="font-medium text-secondary">Male</label>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <RadioGroupItem value="female" id="female" />
                                        <label htmlFor="female" className="font-medium text-secondary">Female</label>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <RadioGroupItem value="other" id="other" />
                                        <label htmlFor="other" className="font-medium text-secondary">Other</label>
                                    </div>
                                </RadioGroup>
                            )}
                        />

                        {errors?.gender && <p className='text-red-500 text-sm mt-1'>{errors?.gender?.message}</p>}
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label htmlFor="date-of-birth" className='font-semibold text-secondary'>Date of Birth</label>
                        <Input
                            {...register('dateOfBirth', {
                                required: "Date of birth is required"
                            })
                            }
                            type="date" className='xl:h-12 mt-1'
                        />
                        {errors?.dateOfBirth && <p className='text-red-500 text-sm mt-1'>{errors?.dateOfBirth?.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className='font-semibold text-secondary'>Email</label>
                        <Input
                            {...register('email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            type="email" placeholder="Enter your email" className='xl:h-12 mt-1'
                        />
                        {errors?.email && <p className='text-red-500 text-sm mt-1'>{errors?.email?.message}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className='font-semibold text-secondary'>Phone</label>
                        <Input
                            {...register('phone', {
                                required: "Phone number is required"
                            })
                            }
                            type="number" placeholder="Enter your phone number" className='xl:h-12 mt-1'
                        />
                        {errors?.phone && <p className='text-red-500 text-sm mt-1'>{errors?.phone?.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className='font-semibold text-secondary'>Password</label>
                        <Input
                            {...register('password', {
                                minLength: {
                                    message: "Password must be at least 6 characters", value: 6
                                },
                                required: "Password is required"
                            })
                            }
                            type="password" placeholder="Enter your password" className='xl:h-12 mt-1'
                        />
                        {errors?.password && <p className='text-red-500 text-sm mt-1'>{errors?.password?.message}</p>}
                    </div>
                </div>
            </div>

            <Button disabled={isRegistering} className='w-full mt-3 bg-primary h-12'>Register</Button>

            <p className='mt-5'>Already have an account? <Link href="/login" className='text-blue-500 hover:underline font-semibold'>Login Here</Link></p>
        </form>
    );
};

export default RegisterForm;