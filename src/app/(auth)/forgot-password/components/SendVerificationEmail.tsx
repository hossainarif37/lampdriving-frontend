import { Dispatch, FC, SetStateAction } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock } from "lucide-react"
import { useRouter } from 'next/navigation';
import { useResetPasswordEmailMutation } from '@/redux/api/authApi/authApi';
import { toast } from '@/hooks/use-toast';

interface ISendVerificationEmailProps {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
}

const SendVerificationEmail: FC<ISendVerificationEmailProps> = ({ email, setEmail }) => {
    const router = useRouter()
    const [sendResetPasswordEmail, { isLoading }] = useResetPasswordEmailMutation();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        sendResetPasswordEmail({ email }).unwrap().then((res) => {
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
    return (
        <div className="w-full md:w-[450px] xl:w-[500px] max-w-[500px] mx-auto p-10  md:shadow-lg md:rounded-lg md:border">
            <div className="flex items-center justify-center mb-3">
                <span className="p-5 bg-secondary/30 rounded-full flex  items-center justify-center">
                    <Lock className="text-primary size-10 " />
                </span>
            </div>
            <h1 className="text-2xl font-bold text-primary/90 text-center">Forgot Password</h1>
            <p className="mb-4 text-sm text-accent text-center">Enter your email. We will send you a OTP for verification.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='w-full xl:h-12 mt-1 pr-10'
                />
                <Button disabled={!email || isLoading} loading={isLoading} className="w-full" type="submit">
                    Next
                </Button>
            </form>
        </div>
    );
};

export default SendVerificationEmail;