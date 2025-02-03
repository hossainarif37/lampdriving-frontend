"use client"
import { toast } from '@/hooks/use-toast';
import { useSendEmailVerificationMutation } from '@/redux/api/authApi/authApi';
import { useAppSelector } from '@/redux/hook';
import { ArrowRight } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

const WarningBar: FC = () => {
    const { user, isAuthenticate } = useAppSelector(state => state.authSlice);
    const [verifyEmail, { isLoading }] = useSendEmailVerificationMutation();
    const [isEmailSent, setIsEmailSent] = useState(false);

    // send verification email
    const handleSendVerificationEmail = () => {
        verifyEmail({ email: user?.email || "" }).unwrap().then((res) => {
            toast({
                message: res.message
            })
            setIsEmailSent(true);
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message || "Something went wrong"
            })
        });
    }


    return (
        isAuthenticate ?
            (user?.isEmailVerified) ? null : (
                <div className='bg-red-500 text-center flex items-center justify-center'>
                    <div className='flex items-center gap-1 text-white py-2 font-medium text-sm'>
                        {
                            isEmailSent ?
                                "An email verification link has been sent to your email. Check your email and verify your email address."
                                :
                                "Your email is not verified! Verify your email before doing any actions."
                        }
                        <button
                            onClick={handleSendVerificationEmail}
                            className='flex items-center underline'
                            disabled={isLoading}
                        >
                            {
                                isEmailSent ?
                                    `Resend verification email`
                                    :
                                    "Send verification email"
                            }
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            )
            :
            null
    );
};

export default WarningBar;