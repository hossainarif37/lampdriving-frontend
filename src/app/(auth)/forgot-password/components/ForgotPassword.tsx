"use client"
import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import SendVerificationEmail from './SendVerificationEmail';
import VerifyOtp from './VerifyOtp';

const ForgotPassword: FC = () => {
    const [email, setEmail] = useState();
    const searchParams = useSearchParams();
    const urlStep = searchParams.get('step');
    const [step, setStep] = useState<"send-otp" | "verify-otp" | "reset-password" | "success">("send-otp");
    useEffect(() => {
        if (urlStep === "send-otp") {
            setStep("send-otp");
        } else if (urlStep === "verify-otp") {
            setStep("verify-otp");
        } else if (urlStep === "reset-password") {
            setStep("reset-password");
        } else if (urlStep === "success") {
            setStep("success");
        } else{
            setStep("send-otp");
        }
    }, [urlStep])

    return (
        <>
            {
                step === "send-otp" ? <SendVerificationEmail /> :
                    step === "verify-otp" && <VerifyOtp />
            }
        </>
    );
};

export default ForgotPassword;