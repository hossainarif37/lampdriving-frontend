"use client"
import { FC } from 'react';
import RegisterStepForm from './RegisterStepForm';
import { useSearchParams } from 'next/navigation';
import LoginFormStep from './LoginStepForm';
import { useAppSelector } from '@/redux/hook';
import VerifyVerificationCode from '@/app/(auth)/verify-email/components/VerifyVerificationCode';

const RegisterStep: FC = () => {
    const urlSearchParams = useSearchParams();

    const step = urlSearchParams?.get('step');


    const registerStep = step === 'register'
    const loginStep = step === 'login';

    const isAuthenticate = useAppSelector(state => state.authSlice.isAuthenticate);


    return (
        <div>
            {
                isAuthenticate ?
                    <div className='bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200'>
                        <h2 className="text-xl font-semibold mb-6 text-left">Verify Email</h2>
                        <div className='flex items-center justify-center'>
                            <VerifyVerificationCode className="md:border-none md:shadow-none" isGoToDashboard={false} />
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