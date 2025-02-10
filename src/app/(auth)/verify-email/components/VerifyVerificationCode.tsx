"use client";
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useSendEmailVerificationMutation, useVerifyEmailMutation } from '@/redux/api/authApi/authApi';
import { useAppSelector } from '@/redux/hook';
import { Send, ShieldCheck, ShieldEllipsis } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface IVerifyVerificationCodeProps {
    className?: string;
    isGoToDashboard?: boolean;
}
const VerifyVerificationCode: FC<IVerifyVerificationCodeProps> = ({ className, isGoToDashboard = true }) => {
    const searchParams = useSearchParams();
    const [success, setSuccess] = useState<boolean>(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [timer, setTimer] = useState(0);
    const [isResendDisabled, setIsResendDisabled] = useState(true)

    const [isEmailSent, setIsEmailSent] = useState(searchParams.get('emailSent') === 'true' ? true : false);

    const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
    const [sendVerifyEmail, { isLoading: isSendingVerifyEmail }] = useSendEmailVerificationMutation();

    const { user, isAuthenticate } = useAppSelector(state => state.authSlice);


    // Handle Submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isAuthenticate) {
            return;
        }
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

    const handleSendEmail = () => {
        sendVerifyEmail({ email: user?.email || "" }).unwrap().then((res) => {
            toast({
                message: res.message
            })
            setIsEmailSent(true);
            setTimer(300)
            setIsResendDisabled(true)
        }).catch((err) => {
            toast({
                success: false,

                message: err.data.message || "Something went wrong"
            })
        });
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
    }, [isResendDisabled])

    return (
        <div className={cn("w-full md:w-[450px] xl:w-[500px] max-w-[500px] p-3 md:p-10 md:shadow-lg md:rounded-md md:border", className)}>
            {
                !isEmailSent ?
                    <>
                        <div className="flex items-center justify-center mb-3">
                            <span className="p-5 bg-secondary/30 rounded-full flex  items-center justify-center">
                                <Send className="text-primary size-10" />
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-primary/90 text-center">Send Verification Email</h1>
                        <p className="mb-4 text-sm text-accent text-center">Send a verification email to {user?.email}</p>
                        <Button onClick={handleSendEmail} loading={isSendingVerifyEmail} className="w-full mt-3">
                            Send Verification Email
                        </Button>
                    </>
                    :
                    success ?
                        <>
                            <div className="flex items-center justify-center mb-3">
                                <span className="p-5 bg-secondary/30 rounded-full flex  items-center justify-center">
                                    <ShieldCheck className="text-primary size-10 " />
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold text-primary/90 text-center">Email Verified Successfully</h1>
                            <p className="mb-4 text-sm text-accent text-center">Your email has been successfully verified.</p>
                            {
                                isGoToDashboard &&
                                <Link href={`/dashboard/${user?.role === "learner" ? "learner" : "instructor"}`}>
                                    <Button className="w-full mt-3">
                                        Go to Dashboard
                                    </Button>
                                </Link>
                            }
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
                                            onClick={handleSendEmail}
                                            disabled={isResendDisabled || isSendingVerifyEmail || isVerifying}
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