"use client";
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { useVerifyEmailMutation } from '@/redux/api/authApi/authApi';
import { useAppSelector } from '@/redux/hook';
import { CheckCircle, CircleX, ShieldBan, ShieldCheck, ShieldEllipsis } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

const VerifyVerificationToken: FC = () => {
    const { user, isAuthenticate } = useAppSelector(state => state.authSlice);
    const [error, setError] = useState("");
    const token = useSearchParams()?.get('token');
    const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

    useEffect(() => {
        if (token && isAuthenticate) {
            verifyEmail({ token }).unwrap().then((res) => {
                toast({
                    message: res.message
                })
            }).catch((err) => {
                toast({
                    success: false,
                    message: err.data.message || "Something went wrong"
                })
                setError(err.data.message || "Something went wrong");
            })
        }
    }, [user, token]);

    return (
        <div className='w-full md:w-[450px] xl:w-[500px] max-w-[500px] p-3 md:p-10 md:shadow-lg md:rounded-md md:border'>
            {
                (user?.isEmailVerified) ? null : (
                    isLoading ?
                        <div className="text-center">
                            <Skeleton className="mx-auto h-16 w-16 rounded-full mb-4" />
                            <Skeleton className="h-9 w-[300px] mx-auto mb-2" />
                            <Skeleton className="h-5 w-[250px] mx-auto" />
                        </div>
                        :
                        error ?
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-3">
                                    <span className="p-5 bg-secondary/30 rounded-full flex  items-center justify-center">
                                        <ShieldBan className="text-red-500 size-10 " />
                                    </span>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900">{error}</h1>
                                <p className="mt-2 text-gray-600">You can&apos;t do any actions with your account before verify your email.</p>
                            </div>
                            :
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-3">
                                    <span className="p-5 bg-secondary/30 rounded-full flex  items-center justify-center">
                                        <ShieldCheck className="text-primary size-10 " />
                                    </span>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900">Your Email has been verified!</h1>
                                <p className="mt-2 text-gray-600">Now you can do any actions with your account.</p>
                            </div>
                )
            }
        </div>
    );
};

export default VerifyVerificationToken;