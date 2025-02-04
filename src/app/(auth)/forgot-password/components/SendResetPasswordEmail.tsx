import { Dispatch, FC, SetStateAction } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock } from "lucide-react"

interface ISendResetPasswordEmailProps {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
    handleSendResetPasswordEmail: (e: React.FormEvent) => void
}

const SendResetPasswordEmail: FC<ISendResetPasswordEmailProps> = ({ email, setEmail, isLoading, handleSendResetPasswordEmail }) => {

    return (
        <div className="w-full md:w-[450px] xl:w-[500px] max-w-[500px] mx-auto p-10  md:shadow-lg md:rounded-lg md:border">
            <div className="flex items-center justify-center mb-3">
                <span className="p-5 bg-secondary/30 rounded-full flex  items-center justify-center">
                    <Lock className="text-primary size-10 " />
                </span>
            </div>
            <h1 className="text-2xl font-bold text-primary/90 text-center">Forgot Password</h1>
            <p className="mb-4 text-sm text-accent text-center">Enter your email. We will send you a OTP for verification.</p>
            <div className="space-y-6">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='w-full xl:h-12 mt-1 pr-10'
                />
                <Button
                    onClick={handleSendResetPasswordEmail}
                    disabled={!email || isLoading} loading={isLoading} className="w-full" type="submit">
                    Next
                </Button>
            </div>
        </div>
    );
};

export default SendResetPasswordEmail;