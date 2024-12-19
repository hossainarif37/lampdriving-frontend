"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLoginUserMutation } from '@/redux/api/authApi/authApi';
import { ILoginInputs } from '@/types/auth';
import Link from 'next/link';
import { FC } from 'react';
import { useForm } from 'react-hook-form';



const LoginForm: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginInputs>();
    const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();

    const handleLogin = (data: ILoginInputs) => {
        const dbResponsePromise = loginUser(data).unwrap();
        console.log(dbResponsePromise, isLoginLoading);
    }

    console.log(isLoginLoading);

    return (
        <form
            onSubmit={handleSubmit(handleLogin)}
            className='w-full md:w-[400px] xl:w-[500px] mx-auto p-10 flex flex-col items-center md:shadow-lg md:rounded-lg md:border'
        >
            <h1 className='text-2xl md:text-3xl font-bold text-secondary'>Login</h1>

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

                <p className='text-right mt-2'>
                    <Link href="#" className='text-secondary hover:underline font-semibold'>Forgot password?</Link>
                </p>
            </div>

            {/* Submit */}
            <Button className='w-full mt-3 bg-primary h-12'>Login</Button>

            <p className='mt-5'>Don&apos;t have an account? <Link href="/register" className='text-blue-500 hover:underline font-semibold'>Register Here</Link></p>
        </form>
    );
};

export default LoginForm;