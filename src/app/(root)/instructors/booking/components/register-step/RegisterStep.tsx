"use client"
import { FC } from 'react';
import RegisterStepForm from './RegisterStepForm';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginFormStep from './LoginStepForm';
import { useAppSelector } from '@/redux/hook';
import VerifyVerificationCode from '@/app/(auth)/verify-email/components/VerifyVerificationCode';
import { useBooking } from '@/providers/BookingProvider';

const RegisterStep: FC = () => {
    const urlSearchParams = useSearchParams();

    const currentStep = urlSearchParams?.get('step');

    const { steps, handleStepChange, setCurrentStep } = useBooking();
    const registerStep = currentStep === 'register'
    const loginStep = currentStep === 'login';

    const { isAuthenticate, user } = useAppSelector(state => state.authSlice);

    const router = useRouter();

    // function to handle verify email success
    const handleVerifyEmailSuccess = () => {
        const params = new URLSearchParams(urlSearchParams?.toString());
        const step = steps.find(step => step.key === "payment");
        if (!step) {
            return;
        }
        params.set('step', step.key);
        handleStepChange("payment");
        setCurrentStep(step);
        router.push(`?${params.toString()}`);
    }

    return (
        <div>
            {
                isAuthenticate ?
                    user?.isEmailVerified ?
                        <div className='bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200 min-h-60 flex items-center justify-center'>
                            <h3 className='text-3xl font-semibold text-left'>Successfully logged in</h3>
                        </div>
                        :
                        <div className='bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200'>
                            <h2 className="text-xl font-semibold mb-6 text-left">Verify Email</h2>
                            <div className='flex items-center justify-center'>
                                <VerifyVerificationCode onSuccess={handleVerifyEmailSuccess} className="md:border-none md:shadow-none" isGoToDashboard={false} />
                            </div>
                        </div>
                    :
                    <>
                        {
                            registerStep ? <RegisterStepForm />
                                :
                                loginStep && <LoginFormStep />
                        }
                    </>
            }
        </div>
    );
};

export default RegisterStep;