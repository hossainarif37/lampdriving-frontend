/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { FC, useState, useEffect, SetStateAction, Dispatch } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Eye, EyeClosed, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRegisterInstructorMutation } from '@/redux/api/authApi/authApi';
import { IRegisterInstructor } from '@/types/instructor';
import { toast } from '@/hooks/use-toast';
import { useInstructorRegister } from '@/providers/InstructorRegisterProvider';

interface Inputs {
    password: string;
    confirmPassword: string;
};


const SecurityForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<Inputs>();
    const { personalInfo, carInfo, experienceInfo, servicesInfo } = useInstructorRegister();
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const [registerInstructor, { isLoading: isRegistering }] = useRegisterInstructorMutation();


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



    const handlePasswordToggle = (field: string) => {
        if (field === 'password') {
            setPasswordVisible((prev) => !prev);
        } else if (field === 'confirm-password') {
            setConfirmPasswordVisible((prev) => !prev);
        }
    }

    // Handle checkbox changes
    const handleTermsChange = (checked: boolean) => {
        setTermsAccepted(checked);
        if (checked) {
            setTermsError("");
        }
    };

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


        const instructorFormData: IRegisterInstructor = {
            userInfo: {
                ...personalInfo,
                password: data.password
            },
            instructorInfo: {
                vehicle: carInfo,
                ...experienceInfo,
                ...servicesInfo
            }
        }


        registerInstructor(instructorFormData).unwrap()
            .then((res) => {
                toast({
                    message: res.message,
                })
            }).catch((err) => {
                console.log(err);
                toast({
                    success: false,
                    message: err.data.message || "Something went wrong",
                })
            })
    }

    return (
        <div className='border p-5 md:p-16 md:shadow-lg md:rounded-lg mt-5'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-primary">Security</h1>

                <div className="w-full mt-7">
                    <div className="flex flex-col gap-6">
                        {/* Password */}
                        <div className="w-full">
                            <label htmlFor="password" className="font-semibold text-primary">
                                Password
                            </label>
                            <div className="relative flex w-full">
                                <Input
                                    {...register("password", {
                                        minLength: {
                                            message: "Password must be at least 6 characters",
                                            value: 6,
                                        },
                                        required: "Password is required",
                                    })}
                                    defaultValue={password}
                                    type={passwordVisible ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    className="w-full xl:h-12 mt-1 pr-10"
                                />

                                <span
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    onClick={() => handlePasswordToggle("password")}
                                >
                                    {passwordVisible ? <Eye width={20} height={20} /> : <EyeClosed width={20} height={20} />}
                                </span>
                            </div>
                            {errors?.password && (
                                <p className="text-red-500 text-sm mt-1">{errors?.password?.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="w-full">
                            <label htmlFor="confirm-password" className="font-semibold text-primary">
                                Confirm Password
                            </label>
                            <div className="relative flex w-full">
                                <Input
                                    {...register("confirmPassword", {
                                        minLength: {
                                            message: "Password must be at least 6 characters",
                                            value: 6,
                                        },
                                        required: "Confirm Password is required",
                                    })}
                                    defaultValue={confirmPassword}
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    id="confirm-password"
                                    placeholder="Re-type your password"
                                    className="w-full xl:h-12 mt-1 pr-10"
                                />

                                <span
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    onClick={() => handlePasswordToggle("confirm-password")}
                                >
                                    {confirmPasswordVisible ? <Eye width={20} height={20} /> : <EyeClosed width={20} height={20} />}
                                </span>
                            </div>
                            {errors?.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                            )}
                            {confirmPasswordError && (
                                <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="w-full">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="checkbox"
                                    className="h-4 w-4"
                                    id="terms"
                                    checked={termsAccepted}
                                    onChange={(e) => handleTermsChange(e.target.checked)}
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none select-none"
                                >
                                    I accept the{" "}
                                    <Link
                                        target="_blank"
                                        href="#"
                                        className="text-primary-600 underline"
                                    >
                                        terms and conditions
                                    </Link>
                                </label>
                            </div>
                            {termsError && (
                                <p className="text-red-500 text-sm mt-1">{termsError}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <StepNavigationButtons prev="car-info" next="" />
                </div>
            </form>
        </div>
    );
};

export default SecurityForm;