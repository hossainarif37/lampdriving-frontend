import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useResetPasswordMutation } from '@/redux/api/authApi/authApi';
import { Eye, EyeClosed, KeyRound, Lock } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';


interface IChangePasswordProps {
    setSuccess: Dispatch<SetStateAction<boolean>>
}

const ChangePassword: FC<IChangePasswordProps> = ({ setSuccess }) => {
    const router = useRouter()
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const searchParams = useSearchParams();
    const token = searchParams?.get('token');

    const { register, handleSubmit, formState: { errors }, watch } = useForm<{ password: string, confirmPassword: string }>();
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const handleChangePassword = (data: { password: string, confirmPassword: string }) => {
        if (data.password !== data.confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            return;
        } else if (!token) {
            return;
        }
        resetPassword({ newPassword: data.password, token: token }).unwrap().then((res) => {
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
            <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-4">
                <div className='w-full'>
                    <label htmlFor="password" className='font-semibold text-primary'>Password</label>
                    <div className='w-full relative flex'>
                        <Input
                            {...register('password', {
                                minLength: {
                                    message: "Password must be at least 6 characters", value: 6
                                },
                                required: "Password is required"
                            })}
                            type={passwordVisible ? "text" : "password"}
                            id='password'
                            placeholder="Enter your password"
                            className='w-full xl:h-12 mt-1 pr-10'
                        />
                        <span
                            className='cursor-pointer absolute right-2 top-1/2 -translate-y-1/2'
                            onClick={() => handlePasswordToggle('password')}
                        >
                            {passwordVisible ? <Eye width={20} height={20} /> : <EyeClosed width={20} height={20} />}
                        </span>
                    </div>
                    {errors?.password && <p className='text-red-500 text-sm mt-1'>{errors?.password?.message}</p>}
                </div>

                <div className='w-full'>
                    <label htmlFor="confirm-password" className='font-semibold text-primary'>Confirm Password</label>
                    <div className='w-full relative flex'>
                        <Input
                            {...register('confirmPassword', {
                                minLength: {
                                    message: "Password must be at least 6 characters", value: 6
                                },
                                required: "Confirm Password is required"
                            })}
                            type={confirmPasswordVisible ? "text" : "password"}
                            id='confirm-password'
                            placeholder="Re-type your password"
                            className='w-full xl:h-12 mt-1 pr-10'
                        />
                        <span
                            className='cursor-pointer absolute right-2 top-1/2 -translate-y-1/2'
                            onClick={() => handlePasswordToggle('confirm-password')}
                        >
                            {confirmPasswordVisible ? <Eye width={20} height={20} /> : <EyeClosed width={20} height={20} />}
                        </span>
                    </div>
                    {errors?.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>}
                    {confirmPasswordError && <p className='text-red-500 text-sm mt-1'>{confirmPasswordError}</p>}
                </div>

                <Button loading={isLoading} disabled={isLoading || (!password || !confirmPassword)} className="w-full mt-6" type="submit">
                    Confirm
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;