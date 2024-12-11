"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

type Inputs = {
    email: string;
    password: string;
}

const LoginForm: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const handleLogin = (data: Inputs) => {
        console.log(data);
    }

    console.log(errors);

    return (
        <form
            onSubmit={handleSubmit(handleLogin)}
            className='w-full md:w-[400px] xl:w-[500px] mx-auto p-10 flex flex-col items-center shadow-lg rounded-lg border'
        >
            <h1 className='text-2xl md:text-3xl font-bold text-secondary'>Login</h1>

            <div className='w-full'>
                <div className='mt-5 flex flex-col gap-5'>
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
                <p className='text-right mt-2'>
                    <Link href="#" className='text-secondary hover:underline font-semibold'>Forgot password?</Link>
                </p>
            </div>

            <Button className='w-full mt-3 bg-primary h-12'>Login</Button>

            <p className='mt-5'>Don&apos;t have an account? <Link href="/register" className='text-blue-500 hover:underline font-semibold'>Register Here</Link></p>
        </form>
    );
};

export default LoginForm;