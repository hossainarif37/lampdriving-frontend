import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

const VerifyOtp: FC = () => {
    const router = useRouter()
    const [otp, setOtp] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Verifying OTP:", otp)
        router.push("/forgot-password/reset-password")
    };
    return (
        <div className="w-full md:w-[450px] xl:w-[500px] max-w-[500px] p-3 md:p-10 md:shadow-lg md:rounded-md md:border">
            <h1 className="text-2xl font-bold mb-1 text-center text-primary/90">Verify OTP</h1>
            <p className="mb-2 text-sm text-center">Enter the OTP from your reset password email.</p>
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
                <Button className="w-full" type="submit">
                    Verify
                </Button>
            </form>
        </div>
    );
};

export default VerifyOtp;