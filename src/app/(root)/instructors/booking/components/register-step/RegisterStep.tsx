"use client"
import { FC } from 'react';
import RegisterStepForm from './RegisterStepForm';
import { useSearchParams } from 'next/navigation';
import LoginFormStep from './LoginStepForm';
import { useAppSelector } from '@/redux/hook';

const RegisterStep: FC = () => {
    const urlSearchParams = useSearchParams();

    const step = urlSearchParams.get('step');


    const registerStep = step === 'register'
    const loginStep = step === 'login';

    const isAuthenticate = useAppSelector(state => state.authSlice.isAuthenticate);


    return (
        <div>
            {
                isAuthenticate ?
                    <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-60 flex items-center justify-center'>
                        <h3 className='text-3xl font-semibold text-left'>Successfully logged in</h3>
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