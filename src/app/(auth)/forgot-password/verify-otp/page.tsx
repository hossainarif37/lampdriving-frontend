"use client"
import { FC } from 'react';
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const VerifyOtp: FC = () => {
    const router = useRouter()
    const [otp, setOtp] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Verifying OTP:", otp)
        router.push("/forgot-password/reset-password")
    }
    return (
        <div className="max-w-md mx-auto mt-32 p-6 border md:shadow-lg md:rounded-md md:border">
            <h1 className="text-2xl font-bold mb-4 text-center text-primary/90">Verify OTP</h1>
            <p className="mb-2 text-sm">Enter the OTP sent to your email.</p>
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
                    Verify OTP
                </Button>
            </form>
        </div>
    );
};

export default VerifyOtp;