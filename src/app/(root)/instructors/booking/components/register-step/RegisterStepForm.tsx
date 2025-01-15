"use client"
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBooking } from '@/providers/BookingProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { Controller } from 'react-hook-form';


const RegisterStepForm: FC = () => {
    const { register, formState: { errors }, control } = useBooking().useRegisterForm;


    const urlSearchParams = useSearchParams();
    const router = useRouter();

    // handler for navigating with exisiting query
    const handleNavigate = () => {
        const searchParams = new URLSearchParams(urlSearchParams);
        searchParams.set('step', 'login');
        router.replace(`?${searchParams.toString()}`);
    }


    return (
        <form
            // onSubmit={handleSubmit(handleRegister)}
            className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'
        >
            <h2 className="text-xl font-semibold mb-6 text-left">Register Learner</h2>
            <div className='w-full mt-7'>
                <div className='flex flex-col gap-5'>
                    {/* Name */}
                    <div className='flex gap-5'>
                        {/* First Name */}
                        <div className='w-full'>
                            <label htmlFor="first-name" className='font-semibold text-primary'>First Name</label>
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
                            <label htmlFor="last-name" className='font-semibold text-primary'>Last Name</label>
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

                    <div className='flex gap-5'>
                        {/* Gender */}
                        <div className='flex-1'>
                            <label className="font-semibold text-primary">Gender</label>
                            <Controller
                                name="gender"
                                control={control}
                                rules={{ required: "Gender is required" }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value || ''}>
                                        <SelectTrigger className="xl:h-12 mt-1">
                                            <SelectValue className="placeholder:text-[#00000012]" placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={"male"}>Male</SelectItem>
                                            <SelectItem value={"female"}>Female</SelectItem>
                                            <SelectItem value={"other"}>Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            {errors?.gender && <p className='text-red-500 text-sm mt-1'>{errors?.gender?.message}</p>}
                        </div>


                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className='font-semibold text-primary'>Email</label>
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
                        <label htmlFor="phone" className='font-semibold text-primary'>Phone</label>
                        <Input
                            maxLength={10}
                            {...register('phone', {
                                required: "Phone number is required",
                                maxLength: {
                                    message: "Phone number must be at most 10 characters", value: 10
                                },
                                minLength: {
                                    message: "Phone number must be at least 10 characters", value: 10
                                }
                            })
                            }
                            type="number" placeholder="Enter your phone number" className='xl:h-12 mt-1'
                        />
                        {errors?.phone && <p className='text-red-500 text-sm mt-1'>{errors?.phone?.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className='font-semibold text-primary'>Password</label>
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

            <p className='mt-5'>Already have an account? <span onClick={handleNavigate} className='text-blue-500 hover:underline font-semibold cursor-pointer'>
                Login Here
            </span>
            </p>
        </form>
    );
};

export default RegisterStepForm;