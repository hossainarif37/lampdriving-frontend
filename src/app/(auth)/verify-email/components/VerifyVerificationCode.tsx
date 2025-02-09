"use client";
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useSendEmailVerificationMutation, useVerifyEmailMutation } from '@/redux/api/authApi/authApi';
import { useAppSelector } from '@/redux/hook';
import { ShieldCheck, ShieldEllipsis } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

const VerifyVerificationCode: FC = () => {
    const [success, setSuccess] = useState<boolean>(true);
    const [verificationCode, setVerificationCode] = useState('');
    const [timer, setTimer] = useState(300);
    const [isResendDisabled, setIsResendDisabled] = useState(true)
    const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
    const [sendVerifyEmail, { isLoading: isSendingVerifyEmail }] = useSendEmailVerificationMutation();

    const { user, isAuthenticate } = useAppSelector(state => state.authSlice);


    // Handle Submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isAuthenticate) {
            return;
        }
        // e.preventDefault()
        verifyEmail({ email: user?.email || "", verificationCode }).unwrap().then((res) => {
            toast({
                message: "Email verified successfully"
            })
            setSuccess(true);
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message
            })
        })
    };

    // Resend OTP
    const handleResend = () => {
        sendVerifyEmail({ email: user?.email || "" }).unwrap().then((res) => {
            toast({
                message: res.message
            })
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message || "Something went wrong"
            })
        });

        setTimer(300)
        setIsResendDisabled(true)
    }


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    setIsResendDisabled(false)
                    clearInterval(interval)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full md:w-[450px] xl:w-[500px] max-w-[500px] p-3 md:p-10 md:shadow-lg md:rounded-md md:border">
            {
                success ?
                    <>
                        <div className="flex items-center justify-center mb-3">
                            <span className="p-5 bg-secondary/30 rounded-full flex  items-center justify-center">
                                <ShieldCheck className="text-primary size-10 " />
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-primary/90 text-center">Password Reset Success</h1>
                        <p className="mb-4 text-sm text-accent text-center">Your password has been successfully reset.</p>
                        <Button className="w-full mt-3">
                            Back to Home
                        </Button>
                    </>
                    :
                    <>
                        <div className="flex items-center justify-center mb-3">
                            <span className="p-5 bg-secondary/30 rounded-full flex  items-center justify-center">
                                <ShieldEllipsis className="text-primary size-10 " />
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-center text-primary/90">Verify Email</h1>
                        <p className="mb-2 text-sm text-center text-accent">Enter the verification code from your verification email.</p>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6">
                            <div className='text-center flex items-center justify-center mt-4'>
                                <InputOTP maxLength={6} onChange={setVerificationCode}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                            <div>
                                <Button className="w-full" type="submit" loading={isVerifying} disabled={verificationCode.length !== 6 || isVerifying || isSendingVerifyEmail}>
                                    Verify
                                </Button>
                                <div className="flex items-center justify-center gap-2 text-sm mt-2">
                                    <span className="text-primary/90">Didn&apos;t receive code? <span className='font-medium'>{formatTime(timer)}</span></span>
                                    <button
                                        onClick={handleResend}
                                        disabled={isResendDisabled}
                                        className={cn("p-0 h-auto underline text-[#2A9D8F] font-medium", isResendDisabled && "text-gray-400 pointer-events-none")}
                                    >
                                        Resend
                                    </button>
                                </div>
                            </div>
                        </form>
                    </>
            }
        </div>
    );
};

export default VerifyVerificationCode;