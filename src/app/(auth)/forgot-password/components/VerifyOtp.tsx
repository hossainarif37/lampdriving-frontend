import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useVerifyResetPasswordOtpMutation } from '@/redux/api/authApi/authApi';
import { ShieldEllipsis } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface IVerifyOtpProps {
    email: string;
    handleResendResetPasswordEmail: () => void;
}

const VerifyOtp: FC<IVerifyOtpProps> = ({ email, handleResendResetPasswordEmail }) => {
    const router = useRouter();
    const [timer, setTimer] = useState(300);
    const [isResendDisabled, setIsResendDisabled] = useState(true)
    const [otp, setOtp] = useState("");
    const [verifyOtp, { isLoading }] = useVerifyResetPasswordOtpMutation();

    // Handle Submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        verifyOtp({ email, otp }).unwrap().then((res) => {
            toast({
                message: "OTP verified successfully"
            })
            router.push(`/forgot-password?step=change-password&token=${res.data.resetToken}`)
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message
            })
        })
    };

    // Resend OTP
    const handleResend = () => {
        handleResendResetPasswordEmail();
        setTimer(300)
        setIsResendDisabled(true)
    }


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
    }

    useEffect(() => {
        if (!email) {
            router.push("/forgot-password");
        }
    }, [email])

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
            <div className="flex items-center justify-center mb-3">
                <span className="p-5 bg-secondary/30 rounded-full flex  items-center justify-center">
                    <ShieldEllipsis className="text-primary size-10 " />
                </span>
            </div>
            <h1 className="text-2xl font-bold text-center text-primary/90">Verify OTP</h1>
            <p className="mb-2 text-sm text-center text-accent">Enter the OTP from your reset password email.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className='text-center flex items-center justify-center mt-4'>
                    <InputOTP maxLength={6} onChange={setOtp}>
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
                    <Button className="w-full" type="submit" loading={isLoading} disabled={otp.length !== 6 || isLoading}>
                        Verify
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-sm mt-2">
                        <span className="text-primary/90">Didn't receive code? <span className='font-medium'>{formatTime(timer)}</span></span>
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
        </div>
    );
};

export default VerifyOtp;