"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useBooking } from '@/providers/BookingProvider';
import { useLoginUserMutation } from '@/redux/api/authApi/authApi';
import { useAppDispatch } from '@/redux/hook';
import { saveUser } from '@/redux/slices/authSlice/authSlice';
import { ILoginInputs } from '@/types/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';


const LoginFormStep: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginInputs>();
    const { steps, setCurrentStep, handleStepChange, loginButtonRef, isLogging, setIsRegistering } = useBooking();
    const dispatch = useAppDispatch();
    const [loginUser] = useLoginUserMutation();

    const urlSearchParams = useSearchParams();
    const router = useRouter();

    // handle login function
    const handleLogin = (data: ILoginInputs) => {
        loginUser(data).unwrap().then((res) => {
            toast({
                message: res.message
            });
            dispatch(saveUser({ user: res.data, isAuthenticate: true, isLoading: false }));
            const params = new URLSearchParams(urlSearchParams?.toString());
            const step = steps.find(step => step.key === "payment");
            if (!step) {
                return;
            }
            if (res.data.isEmailVerified) {
                params.set('step', step.key);
                handleStepChange("payment");
                setCurrentStep(step);
            } 
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message || "Something went wrong"
            });
        })
    }


    // handler for navigating with exisiting query
    const handleNavigate = () => {
        handleStepChange("register");
        const searchParams = new URLSearchParams(urlSearchParams || '');
        searchParams.set('step', 'register');
        router.replace(`?${searchParams.toString()}`);
    }


    return (
        <form
            onSubmit={handleSubmit(handleLogin)}
            className='bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200'
        >
            <h2 className="text-xl font-semibold mb-6 text-left">Learner Login</h2>

            <div className='w-full mt-7'>
                <div className='flex flex-col gap-5'>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className='font-semibold text-primary'>Email/Phone</label>
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
                        <label htmlFor="password" className='font-semibold text-primary'>Password</label>
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
                    <Link href="#" className='text-primary hover:underline font-semibold'>Forgot password?</Link>
                </p> */}
            </div>

            <Button
                disabled={isLogging}
                ref={loginButtonRef}
                type="submit"
                className='w-full mt-6 hidden'
            >
                Login
            </Button>

            <p className='mt-5'>Don&apos;t have an account? <span onClick={handleNavigate} className='text-blue-500 hover:underline font-semibold cursor-pointer'>
                Register Here
            </span>
            </p>
        </form>
    );
};

export default LoginFormStep;