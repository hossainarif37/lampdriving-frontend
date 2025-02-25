"use client"
import PhotoUpload from '@/components/shared/PhotoUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { genderOptions } from '@/constant/gender';
import { toast } from '@/hooks/use-toast';
import { IPhoto } from '@/hooks/useImage';
import { useBooking } from '@/providers/BookingProvider';
import { useRegisterUserMutation } from '@/redux/api/authApi/authApi';
import { useAppDispatch } from '@/redux/hook';
import { saveUser } from '@/redux/slices/authSlice/authSlice';
import { ILearnerLicense, IRegisterInputs } from '@/types/auth';
import { Eye, EyeClosed } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


const RegisterStepForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, control, watch, setError, setValue } = useForm<IRegisterInputs>();
    const { steps, handleStepChange, registerButtonRef, isRegistering, setIsRegistering } = useBooking();
    const dispatch = useAppDispatch();
    const [selectedLicense, setSelectedLicense] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<IPhoto>({
        file: null,
        url: undefined
    });

    const [registerUser] = useRegisterUserMutation();
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const urlSearchParams = useSearchParams();
    const router = useRouter();

    // handler for navigating with exisiting query
    const handleNavigate = () => {
        handleStepChange("login");
        const searchParams = new URLSearchParams(urlSearchParams || '');
        searchParams.set('step', 'login');
        router.replace(`?${searchParams.toString()}`);
    }

    const handlePasswordToggle = (field: string) => {
        if (field === 'password') {
            setPasswordVisible((prev) => !prev);
        } else if (field === 'confirm-password') {
            setConfirmPasswordVisible((prev) => !prev);
        }
    }

    const handleRegister = (data: IRegisterInputs) => {
        setIsRegistering(true);
        // Clean up the license object based on licenseType
        let cleanedLicense: ILearnerLicense;

        switch (data.license.licenseType) {
            case 'NSW':
                cleanedLicense = {
                    licenseType: 'NSW',
                    licenseNumber: data.license.licenseNumber,
                    expiryDate: data.license.expiryDate
                };
                break;
            case 'Other State':
                cleanedLicense = {
                    licenseType: 'Other State',
                    stateName: data.license.stateName,
                    licenseNumber: data.license.licenseNumber,
                    expiryDate: data.license.expiryDate
                };
                break;
            case 'Overseas':
                cleanedLicense = {
                    licenseType: 'Overseas',
                    countryName: data.license.countryName,
                    licenseNumber: data.license.licenseNumber,
                    expiryDate: data.license.expiryDate
                };
                break;
            default:
                throw new Error('Invalid license type');
        }

        const cleanedData: IRegisterInputs = {
            ...data,
            license: cleanedLicense,
            confirmPassword: undefined // Optionally remove confirmPassword if not needed by backend
        };

        registerUser(cleanedData).unwrap().then((res) => {
            toast({
                message: res.message
            });
            dispatch(saveUser({ user: res.data, isAuthenticate: true, isLoading: false, instructor: res.data.instructor }));
            setIsRegistering(false);
            const params = new URLSearchParams(urlSearchParams?.toString());
            const step = steps.find(step => step.key === "payment");
            if (!step) {
                return;
            }
            // if (res.data.isEmailVerified) {
            //     params.set('step', step.key);
            //     handleStepChange("payment");
            //     setCurrentStep(step);
            // } else {
            params.set('emailSent', "true");
            router.push(`?${params.toString()}`);
            // }
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message || "Something went wrong",
            })
            setIsRegistering(false);
        })
    }

    useEffect(() => {
        if (confirmPassword && confirmPassword?.length >= 6) {
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
            className='bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200'
        >
            <h2 className="text-xl font-semibold mb-6 text-left">Register Learner</h2>
            <div className='w-full mt-10'>
                <div className='flex flex-col gap-3'>
                    <div>
                        {/* <h1 className='text-2xl font-semibold text-primary mb-3'>Personal Information</h1> */}

                        <div className='flex flex-col items-center'>
                            <PhotoUpload
                                profilePhoto={profilePhoto}
                                setProfilePhoto={setProfilePhoto}
                                register={register}
                                setValue={setValue}
                                setError={setError}
                                isRemoveUrl={true}
                            />
                            {errors.profileImg && <p className='text-red-500 text-sm mb-3'>{errors.profileImg.message}</p>}
                        </div>

                        <div className='flex flex-col gap-y-5'>
                            {/* Name Section */}
                            <div className='flex flex-col md:flex-row gap-5'>
                                <div className='w-full'>
                                    <label htmlFor="first-name" className='font-semibold text-primary'>First Name</label>
                                    <Input
                                        {...register('name.firstName', {
                                            required: "First name is required"
                                        })}
                                        type="text" id='first-name' placeholder="Enter your first name" className='xl:h-12 mt-1'
                                    />
                                    {errors?.name?.firstName && <p className='text-red-500 text-sm mt-1'>{errors?.name?.firstName?.message}</p>}
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="last-name" className='font-semibold text-primary'>Last Name</label>
                                    <Input
                                        {...register('name.lastName', {
                                            required: "Last name is required"
                                        })}
                                        type="text" id="last-name" placeholder="Enter your last name" className='xl:h-12 mt-1'
                                    />
                                    {errors?.name?.lastName && <p className='text-red-500 text-sm mt-1'>{errors?.name?.lastName?.message}</p>}
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className='flex flex-col md:flex-row gap-5'>
                                <div className='w-full'>
                                    <label htmlFor="email" className='font-semibold text-primary'>Email</label>
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

                                {/* Phone */}
                                <div className='w-full'>
                                    <label htmlFor="phone" className='font-semibold text-primary'>Phone</label>
                                    <Input
                                        {...register('phone', {
                                            required: "Phone number is required",
                                            minLength: {
                                                value: 10,
                                                message: "Phone number must be 10 digits"
                                            }
                                        })}
                                        type="number"
                                        id="phone"
                                        placeholder="Enter your phone number"
                                        className="xl:h-12 mt-1"
                                        onKeyDown={(e) => {
                                            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                                e.preventDefault();
                                            }
                                        }}
                                        onInput={(e) => {
                                            const input = e.target as HTMLInputElement;
                                            if (input.value.length > 10) {
                                                input.value = input.value.slice(0, 10);
                                            }
                                        }}
                                    />
                                    {errors?.phone && <p className='text-red-500 text-sm mt-1'>{errors?.phone?.message}</p>}
                                </div>
                            </div>

                            {/* Gender */}
                            <div className='w-full'>
                                <label className="font-semibold text-primary">Gender</label>
                                <Controller
                                    name="gender"
                                    control={control}
                                    rules={{ required: "Gender is required" }}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value || ''}>
                                            <SelectTrigger id='gender' className="xl:h-12 mt-1">
                                                <SelectValue className="placeholder:text-[#00000012]" placeholder="Select Gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    genderOptions.map((gender, i) => (
                                                        <SelectItem key={i} value={gender.toLowerCase()}>
                                                            {gender}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                {errors?.gender && <p className='text-red-500 text-sm mt-1'>{errors?.gender?.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* License Options */}
                    <div className="mt-5 space-y-4">
                        <label className="font-semibold text-primary">License Type (Select one)</label>
                        <Controller
                            name="license.licenseType" // Changed to nested path
                            control={control}
                            rules={{ required: "License type is required" }}
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={(value: 'NSW' | 'Other State' | 'Overseas') => {
                                        setSelectedLicense(value);
                                        field.onChange(value);
                                    }}
                                    value={field.value}
                                    className="space-y-2"
                                >
                                    {/* Australian NSW License */}
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="NSW" id="nsw" />
                                            <label className='cursor-pointer' htmlFor="nsw">Australian NSW License</label>
                                        </div>
                                        {selectedLicense === 'NSW' && (
                                            <div className='flex flex-col lg:flex-row gap-5 ml-6'>
                                                <div className='w-full'>
                                                    <label className='font-semibold text-primary' htmlFor="nsw-license-no">License No.</label>
                                                    <Input
                                                        {...register('license.licenseNumber', {
                                                            required: selectedLicense === 'NSW' ? "License number is required" : false
                                                        })}
                                                        className="xl:h-12 mt-1"
                                                        placeholder="License No."
                                                        id="nsw-license-no"
                                                    />
                                                    {errors.license?.licenseNumber && (
                                                        <p className='text-red-500 text-sm mt-1'>{errors.license.licenseNumber.message}</p>
                                                    )}
                                                </div>
                                                <div className='w-full'>
                                                    <label className='font-semibold text-primary' htmlFor="nsw-license-expiry-date">Expiry Date</label>
                                                    <Input
                                                        {...register('license.expiryDate', {
                                                            required: selectedLicense === 'NSW' ? "Expiry date is required" : false
                                                        })}
                                                        className="xl:h-12 mt-1"
                                                        type="date"
                                                        id="nsw-license-expiry-date"
                                                    />
                                                    {errors.license?.expiryDate && (
                                                        <p className='text-red-500 text-sm mt-1'>{errors.license.expiryDate.message}</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Other State License */}
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Other State" id="other_state" />
                                            <label className='cursor-pointer' htmlFor="other_state">Other State License</label>
                                        </div>
                                        {selectedLicense === 'Other State' && (
                                            <div className='flex flex-col lg:flex-row gap-5 ml-6'>
                                                <div className='w-full'>
                                                    <label className='font-semibold text-primary' htmlFor="other-state-name">State Name</label>
                                                    <Input
                                                        {...register('license.stateName', {
                                                            required: selectedLicense === 'Other State' ? "State name is required" : false
                                                        })}
                                                        className="xl:h-12 mt-1"
                                                        placeholder="State Name"
                                                        id="other-state-name"
                                                    />
                                                    {errors.license?.stateName && (
                                                        <p className='text-red-500 text-sm mt-1'>{errors.license.stateName.message}</p>
                                                    )}
                                                </div>
                                                <div className='w-full'>
                                                    <label className='font-semibold text-primary' htmlFor="other-state-license-no">License No.</label>
                                                    <Input
                                                        {...register('license.licenseNumber', {
                                                            required: selectedLicense === 'Other State' ? "License number is required" : false
                                                        })}
                                                        className="xl:h-12 mt-1"
                                                        placeholder="License No."
                                                        id="other-state-license-no"
                                                    />
                                                    {errors.license?.licenseNumber && (
                                                        <p className='text-red-500 text-sm mt-1'>{errors.license.licenseNumber.message}</p>
                                                    )}
                                                </div>
                                                <div className='w-full'>
                                                    <label className='font-semibold text-primary' htmlFor="other-state-license-expiry-date">Expiry Date</label>
                                                    <Input
                                                        {...register('license.expiryDate', {
                                                            required: selectedLicense === 'Other State' ? "Expiry date is required" : false
                                                        })}
                                                        className="xl:h-12 mt-1"
                                                        type="date"
                                                        id="other-state-license-expiry-date"
                                                    />
                                                    {errors.license?.expiryDate && (
                                                        <p className='text-red-500 text-sm mt-1'>{errors.license.expiryDate.message}</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Overseas License */}
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Overseas" id="overseas" />
                                            <label className='cursor-pointer' htmlFor="overseas">Overseas License</label>
                                        </div>
                                        {selectedLicense === 'Overseas' && (
                                            <div className='flex flex-col lg:flex-row gap-5 ml-6'>
                                                <div className='w-full'>
                                                    <label className='font-semibold text-primary' htmlFor="overseas-country-name">Country Name</label>
                                                    <Input
                                                        {...register('license.countryName', {
                                                            required: selectedLicense === 'Overseas' ? "Country name is required" : false
                                                        })}
                                                        className="xl:h-12 mt-1"
                                                        placeholder="Country Name"
                                                        id="overseas-country-name"
                                                    />
                                                    {errors.license?.countryName && (
                                                        <p className='text-red-500 text-sm mt-1'>{errors.license.countryName.message}</p>
                                                    )}
                                                </div>
                                                <div className='w-full'>
                                                    <label className='font-semibold text-primary' htmlFor="overseas-license-no">License No.</label>
                                                    <Input
                                                        {...register('license.licenseNumber', {
                                                            required: selectedLicense === 'Overseas' ? "License number is required" : false
                                                        })}
                                                        className="xl:h-12 mt-1"
                                                        placeholder="License No."
                                                        id="overseas-license-no"
                                                    />
                                                    {errors.license?.licenseNumber && (
                                                        <p className='text-red-500 text-sm mt-1'>{errors.license.licenseNumber.message}</p>
                                                    )}
                                                </div>
                                                <div className='w-full'>
                                                    <label className='font-semibold text-primary' htmlFor="overseas-license-expiry-date">Expiry Date</label>
                                                    <Input
                                                        {...register('license.expiryDate', {
                                                            required: selectedLicense === 'Overseas' ? "Expiry date is required" : false
                                                        })}
                                                        className="xl:h-12 mt-1"
                                                        type="date"
                                                        id="overseas-license-expiry-date"
                                                    />
                                                    {errors.license?.expiryDate && (
                                                        <p className='text-red-500 text-sm mt-1'>{errors.license.expiryDate.message}</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </RadioGroup>
                            )}
                        />
                        {errors.license?.licenseType && (
                            <p className='text-red-500 text-sm mt-1'>{errors.license.licenseType.message}</p>
                        )}
                    </div>

                    {/* Password Section */}
                    <div className="mt-5">
                        {/* <h1 className='text-2xl font-semibold text-primary mb-3'>Security</h1> */}
                        <div className='flex flex-col md:flex-row gap-5 mb-5'>
                            <div className='w-full'>
                                <label htmlFor="password" className='font-semibold text-primary'>Password</label>
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
                                <label htmlFor="confirm-password" className='font-semibold text-primary'>Confirm Password</label>
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
            </div>

            <Button
                disabled={isRegistering}
                ref={registerButtonRef}
                type="submit"
                className='w-full mt-6 hidden'
            >
                Register
            </Button>

            <p className='mt-5'>Already have an account? <span onClick={handleNavigate} className='text-blue-500 hover:underline font-semibold cursor-pointer'>
                Login Here
            </span>
            </p>

        </form>
    );
};

export default RegisterStepForm;