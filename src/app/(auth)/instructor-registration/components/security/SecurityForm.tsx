"use client"
import { FC, useState, useEffect } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

interface Inputs {
    password: string;
    confirmPassword: string;
};

const SecurityForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<Inputs>();
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // Separate state for checkboxes and their errors
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [termsError, setTermsError] = useState("");

    // Watch password fields
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    useEffect(() => {
        if (confirmPassword && password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError("");
        }
    }, [password, confirmPassword]);

    // Handle checkbox changes
    const handleTermsChange = (checked: boolean) => {
        setTermsAccepted(checked);
        if (checked) {
            setTermsError("");
        }
    };

    const handlePasswordToggle = (field: string) => {
        if (field === 'password') {
            setPasswordVisible((prev) => !prev);
        } else if (field === 'confirm-password') {
            setConfirmPasswordVisible((prev) => !prev);
        }
    }

    const onSubmit = (data: Inputs) => {
        // Validate checkboxes
        if (!termsAccepted) {
            setTermsError("You must accept the terms and conditions");
            return;
        }

        if (data.password !== data.confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            return;
        }

        console.log({ ...data, termsAccepted });
    }

    return (
        <div className='border p-5 md:p-16 md:shadow-lg md:rounded-lg mt-5'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full flex flex-col'
            >
                <h1 className='text-2xl md:text-3xl font-bold text-secondary'>Security</h1>

                <div className='w-full mt-7'>
                    <div className='flex flex-col gap-5'>
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className='font-semibold text-secondary'>Password</label>
                            <div className='relative flex'>
                                <Input
                                    {...register('password', {
                                        minLength: {
                                            message: "Password must be at least 6 characters", value: 6
                                        },
                                        required: "Password is required"
                                    })
                                    }
                                    type={`${passwordVisible ? "text" : "password"}`}
                                    id='password'
                                    placeholder="Enter your password"
                                    className='xl:h-12 mt-1'
                                />

                                <button
                                    className='cursor-pointer -translate-x-10'
                                    type='button'
                                    onClick={() => handlePasswordToggle('password')}
                                >
                                    {passwordVisible ? <Eye /> : <EyeOff />}
                                </button>
                            </div>
                            {errors?.password && <p className='text-red-500 text-sm mt-1'>{errors?.password?.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirm-password" className='font-semibold text-secondary'>Confirm Password</label>
                            <div className='relative flex'>
                                <Input
                                    {...register('confirmPassword', {
                                        minLength: {
                                            message: "Password must be at least 6 characters", value: 6
                                        },
                                        required: "Confirm Password is required"
                                    })
                                    }
                                    type={`${confirmPasswordVisible ? "text" : "password"}`}
                                    id='confirm-password'
                                    placeholder="Re-type your password"
                                    className='xl:h-12 mt-1'
                                />

                                <button
                                    className='cursor-pointer -translate-x-10'
                                    type='button'
                                    onClick={() => handlePasswordToggle('confirm-password')}
                                >
                                    {confirmPasswordVisible ? <Eye /> : <EyeOff />}
                                </button>
                            </div>
                            {errors?.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>}
                            {confirmPasswordError && <p className='text-red-500 text-sm mt-1'>{confirmPasswordError}</p>}
                        </div>

                        {/* Terms and Conditions */}
                        <div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='checkbox'
                                    className='h-4 w-4'
                                    id="terms"
                                    checked={termsAccepted}
                                    onChange={(e) => handleTermsChange(e.target.checked)}
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    I accept the <Link target='_blank' href="#" className='text-indigo-600 underline'>terms and conditions</Link>
                                </label>
                            </div>
                            {termsError && <p className='text-red-500 text-sm mt-1'>{termsError}</p>}
                        </div>
                    </div>
                </div>

                <div>
                    <StepNavigationButtons prev="car-info" next="" />
                </div>
            </form>
        </div>
    );
};

export default SecurityForm;