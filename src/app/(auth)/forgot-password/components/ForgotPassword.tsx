"use client"
import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import SendVerificationEmail from './SendVerificationEmail';
import VerifyOtp from './VerifyOtp';
import ChangePassword from './ChangePassword';
import ResetPasswordSuccess from './ResetPasswordSuccess';

const ForgotPassword: FC = () => {
    const [email, setEmail] = useState<string>('');
    const searchParams = useSearchParams();
    const urlStep = searchParams.get('step');
    const [step, setStep] = useState<"send-otp" | "verify-otp" | "change-password" | "success">("send-otp");
    useEffect(() => {
        if (urlStep === "send-otp") {
            setStep("send-otp");
        } else if (urlStep === "verify-otp") {
            setStep("verify-otp");
        } else if (urlStep === "change-password") {
            setStep("change-password");
        } else if (urlStep === "success") {
            setStep("success");
        } else {
            setStep("send-otp");
        }
    }, [urlStep])

    return (
        <>
            {
                step === "send-otp" ? <SendVerificationEmail email={email} setEmail={setEmail} /> :
                    step === "verify-otp" ? <VerifyOtp email={email} /> :
                        step === "change-password" ? <ChangePassword /> :
                            step === "success" && <ResetPasswordSuccess />
            }
        </>
    );
};

export default ForgotPassword;