"use client"

import { Input } from '@/components/ui/input';
import { useBooking } from '@/providers/BookingProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';


const LoginFormStep: FC = () => {
    const { register, formState: { errors } } = useBooking().useLoginForm;

    const urlSearchParams = useSearchParams();
    const router = useRouter();


    // handler for navigating with exisiting query
    const handleNavigate = () => {
        const searchParams = new URLSearchParams(urlSearchParams);
        searchParams.set('step', 'register');
        router.replace(`?${searchParams.toString()}`);
    }


    return (
        <form
            className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'
        >
            <h2 className="text-xl font-semibold mb-6 text-left">Learner Login</h2>

            <div className='w-full mt-7'>
                <div className='flex flex-col gap-5'>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className='font-semibold text-secondary'>Email/Phone</label>
                        <Input
                            {...register('emailOrPhone', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            type="text" id='emailOrPhone' placeholder="Enter your email or phone" className='xl:h-12 mt-1'
                        />
                        {errors?.emailOrPhone && <p className='text-red-500 text-sm mt-1'>{errors?.emailOrPhone?.message}</p>}
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
                            type="password" id='password' placeholder="Enter your password" className='xl:h-12 mt-1'
                        />
                        {errors?.password && <p className='text-red-500 text-sm mt-1'>{errors?.password?.message}</p>}
                    </div>
                </div>

                {/* <p className='text-right mt-2'>
                    <Link href="#" className='text-secondary hover:underline font-semibold'>Forgot password?</Link>
                </p> */}
            </div>

            <p className='mt-5'>Don&apos;t have an account? <span onClick={handleNavigate} className='text-blue-500 hover:underline font-semibold cursor-pointer'>
                Register Here
            </span>
            </p>
        </form>
    );
};

export default LoginFormStep;