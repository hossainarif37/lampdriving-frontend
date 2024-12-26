"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useLoginUserMutation } from '@/redux/api/authApi/authApi';
import { useAppDispatch } from '@/redux/hook';
import { saveUser } from '@/redux/slices/authSlice/authSlice';
import { ILoginInputs } from '@/types/auth';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';



const LoginForm: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginInputs>();
    const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const dispatch = useAppDispatch();

    const router = useRouter();

    const handleLogin = (data: ILoginInputs) => {
        loginUser(data).unwrap().then((res) => {
            toast({
                message: res.message
            });
            dispatch(saveUser({ user: res.data, isAuthenticate: true, isLoading: false }));
            router.push('/')
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message || "Something went wrong"
            });
        })
    }

    const handlePasswordToggle = (field: string) => {
        setPasswordVisible((prev) => !prev);
    }

    return (
        <form
            onSubmit={handleSubmit(handleLogin)}
            className='w-full md:w-[450px] xl:w-[500px] mx-auto p-5 md:p-10 flex flex-col items-center md:shadow-lg md:rounded-lg md:border'
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
                            <button
                                className='cursor-pointer absolute right-2 top-1/2 -translate-y-1/2'
                                type='button'
                                onClick={() => handlePasswordToggle('password')}
                            >
                                {passwordVisible ? <Eye width={20} height={20} /> : <EyeOff width={20} height={20} />}
                            </button>
                        </div>
                        {errors?.password && <p className='text-red-500 text-sm mt-1'>{errors?.password?.message}</p>}
                    </div>
                </div>

                <p className='text-right mt-2'>
                    <Link href="#" className='text-secondary hover:underline font-semibold'>Forgot password?</Link>
                </p>
            </div>

            {/* Submit */}
            <Button className='w-full mt-3 gradient-color h-12' disabled={isLoginLoading}>Login</Button>

            <p className='mt-5'>Don&apos;t have an account? <Link href="/register" className='text-blue-500 hover:underline font-semibold'>Register Here</Link></p>
        </form>
    );
};

export default LoginForm;