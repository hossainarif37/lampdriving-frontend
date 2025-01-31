import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
            <h1 className="text-2xl font-bold mb-4 text-center text-primary/90">Verify OTP</h1>
            <p className="mb-2 text-sm">Enter the OTP from your reset password email.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    className='w-full xl:h-12 mt-1 pr-10'
                />
                <Button className="w-full" type="submit">
                    Verify
                </Button>
            </form>
        </div>
    );
};

export default VerifyOtp;