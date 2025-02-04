"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import SendVerificationEmail from './SendResetPasswordEmail';
import VerifyOtp from './VerifyOtp';
import ChangePassword from './ChangePassword';
import ResetPasswordSuccess from './ResetPasswordSuccess';
import { toast } from '@/hooks/use-toast';
import { useResetPasswordEmailMutation } from '@/redux/api/authApi/authApi';

const ForgotPassword: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const urlStep = searchParams.get('step');
    const [step, setStep] = useState<"send-otp" | "verify-otp" | "change-password" | "success">("send-otp");

    const router = useRouter();

    const [sendResetPasswordEmail, { isLoading: isSendResetPasswordEmailLoading }] = useResetPasswordEmailMutation();
    const handleSendResetPasswordEmail = () => {
        sendResetPasswordEmail({ email }).unwrap().then((_res) => {
            toast({
                message: "An reset email has been sent to your email"
            })
            router.push("/forgot-password?step=verify-otp")
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message || "Something went wrong"
            })
        })
    }

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
                step === "send-otp" ?
                    <SendVerificationEmail
                        handleSendResetPasswordEmail={handleSendResetPasswordEmail}
                        isLoading={isSendResetPasswordEmailLoading}
                        email={email}
                        setEmail={setEmail} /> :
                    step === "verify-otp" ? <VerifyOtp email={email} handleResendResetPasswordEmail={handleSendResetPasswordEmail} /> :
                        step === "change-password" ? <ChangePassword setSuccess={setSuccess} /> :
                            step === "success" && <ResetPasswordSuccess success={success} />
            }
        </>
    );
};

export default ForgotPassword;