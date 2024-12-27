"use client"
import { FC } from 'react';
import RegisterStepForm from './RegisterStepForm';
import { useSearchParams } from 'next/navigation';
import LoginFormStep from './LoginStepForm';

const RegisterStep: FC = () => {
    const urlSearchParams = useSearchParams();

    const step = urlSearchParams.get('step');


    const registerStep = step === 'register'
    const loginStep = step === 'login';

    return (
        <div>

            {
                registerStep ? <RegisterStepForm />
                    :
                    loginStep && <LoginFormStep />
            }
        </div>
    );
};

export default RegisterStep;