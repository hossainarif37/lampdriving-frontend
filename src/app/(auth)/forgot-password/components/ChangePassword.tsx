import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useResetPasswordMutation } from '@/redux/api/authApi/authApi';
import { Eye, EyeClosed, KeyRound, Lock } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, FC, SetStateAction, useState } from 'react';


interface IChangePasswordProps {
    setSuccess: Dispatch<SetStateAction<boolean>>
}

const ChangePassword: FC<IChangePasswordProps> = ({ setSuccess }) => {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [error, setError] = useState<string>("")
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return;
        } else if (!token) {
            return;
        }

        resetPassword({ newPassword: password, token: token }).unwrap().then((res) => {
            toast({
                message: res.message
            })
            setSuccess(true)
            router.push("/forgot-password?step=success")
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message
            })
        })
    }
    const handlePasswordToggle = (field: string) => {
        if (field === 'password') {
            setPasswordVisible((prev) => !prev);
        } else if (field === 'confirm-password') {
            setConfirmPasswordVisible((prev) => !prev);
        }
    }
    return (
        <div className="w-full md:w-[450px] xl:w-[500px] max-w-[500px] p-3 md:p-10 md:shadow-lg md:rounded-md md:border">
            <div className="flex items-center justify-center mb-3">
                <span className="p-5 bg-secondary/30 rounded-full flex  items-center justify-center">
                    <KeyRound className="text-primary size-10 " />
                </span>
            </div>
            <h1 className="text-2xl font-bold text-center text-primary/90">Change Password</h1>
            <p className="mb-2 text-sm text-accent text-center">Setup Your New Password</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='w-full relative flex'>
                    <Input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="New password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='w-full xl:h-12 mt-1 pr-10'
                    />
                    <span
                        className='cursor-pointer absolute right-2 top-1/2 -translate-y-1/2'
                        onClick={() => handlePasswordToggle('password')}
                    >
                        {passwordVisible ? <Eye width={20} height={20} /> : <EyeClosed width={20} height={20} />}
                    </span>
                </div>
                <div className='w-full relative flex'>
                    <Input
                        type={confirmPasswordVisible ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className='w-full xl:h-12 mt-1 pr-10'
                    />
                    <span
                        className='cursor-pointer absolute right-2 top-1/2 -translate-y-1/2'
                        onClick={() => handlePasswordToggle('confirm-password')}
                    >
                        {confirmPasswordVisible ? <Eye width={20} height={20} /> : <EyeClosed width={20} height={20} />}
                    </span>
                </div>
                <div>
                    {
                        error &&
                        <p className='text-red-500 mb-2'>{error}</p>
                    }
                    <Button loading={isLoading} disabled={isLoading || (!password || !confirmPassword)} className="w-full" type="submit">
                        Confirm
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;