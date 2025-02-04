/* eslint-disable react/no-unescaped-entities */
"use client"
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { useVerifyEmailMutation } from '@/redux/api/authApi/authApi';
import { useAppSelector } from '@/redux/hook';
import { CheckCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

const VerifyEmailPage: FC = () => {
    const { user, isAuthenticate, isAuthLoading } = useAppSelector(state => state.authSlice);
    const [error, setError] = useState("");
    const token = useSearchParams()?.get('token');
    const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

    const router = useRouter();

    useEffect(() => {
        if ((user?.isEmailVerified || !token || !user?.email) && !isAuthLoading) {
            router.push('/');
            return;
        }
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
        <div className='wrapper min-h-[calc(100vh-56px)] flex items-center justify-center'>
            {isAuthenticate ?
                (user?.isEmailVerified) ? null : (
                    isLoading ?
                        <div className="text-center mb-12">
                            <Skeleton className="mx-auto h-16 w-16 rounded-full mb-4" />
                            <Skeleton className="h-9 w-[300px] mx-auto mb-2" />
                            <Skeleton className="h-5 w-[250px] mx-auto" />
                        </div>
                        :
                        error ?
                            <div className="text-center mb-12">
                                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                                <h1 className="text-3xl font-bold text-gray-900">{error}</h1>
                                <p className="mt-2 text-gray-600">You can&apos;t do any actions with your account before verify your email.</p>
                            </div>
                            :
                            <div className="text-center mb-12">
                                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                                <h1 className="text-3xl font-bold text-gray-900">Your Email has been verified!</h1>
                                <p className="mt-2 text-gray-600">Now you can do any actions with your account.</p>
                            </div>
                )
                :
                <div className="text-center mb-12">
                    <Skeleton className="mx-auto h-16 w-16 rounded-full mb-4" />
                    <Skeleton className="h-9 w-[300px] mx-auto mb-2" />
                    <Skeleton className="h-5 w-[250px] mx-auto" />
                </div>
            }
        </div >
    );
};

export default VerifyEmailPage;