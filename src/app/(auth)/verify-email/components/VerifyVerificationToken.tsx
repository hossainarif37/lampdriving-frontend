"use client";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { useVerifyEmailMutation } from '@/redux/api/authApi/authApi';
import { useAppSelector } from '@/redux/hook';
import { ShieldBan, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
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
    }, [token, isAuthenticate]);

    return (
        <div className='w-full md:w-[450px] xl:w-[500px] max-w-[500px] p-3 md:p-10 md:shadow-lg md:rounded-md md:border'>
            {
                (user?.isEmailVerified) ?
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-3">
                            <span className="p-5 bg-secondary/30 rounded-full flex  items-center justify-center">
                                <ShieldCheck className="text-primary size-10 " />
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-primary/90 text-center">Email Verified Successfully</h1>
                        <p className="mb-4 text-sm text-accent text-center">Your email has been successfully verified.</p>
                        <Link href={`/dashboard/${user?.role === "learner" ? "learner" : "instructor"}`}>
                            <Button className="w-full mt-3">
                                Go to Dashboard
                            </Button>
                        </Link>
                    </div> : (
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
                                    <h1 className="text-2xl font-bold text-primary/90 text-center">Email Verified Successfully</h1>
                                    <p className="mb-4 text-sm text-accent text-center">Your email has been successfully verified.</p>
                                    <Link href={`/dashboard/${user?.role === "learner" ? "learner" : "instructor"}`}>
                                        <Button className="w-full mt-3">
                                            Go to Dashboard
                                        </Button>
                                    </Link>
                                </div>
                    )
            }
        </div>
    );
};

export default VerifyVerificationToken;