"use client"
import { FC } from 'react';
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeClosed } from 'lucide-react';
const ResetPassword: FC = () => {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert("Passwords don't match")
            return
        }
        console.log("Resetting password")
        alert("Password reset successfully!")
        router.push("/login")
    }
    const handlePasswordToggle = (field: string) => {
        if (field === 'password') {
            setPasswordVisible((prev) => !prev);
        } else if (field === 'confirm-password') {
            setConfirmPasswordVisible((prev) => !prev);
        }
    }
    return (
        <div className="max-w-md mx-auto mt-32 p-6 border md:shadow-lg md:rounded-md md:border">
            <h1 className="text-2xl font-bold mb-4 text-center text-primary/90">Reset Password</h1>
            <p className="mb-2 text-sm text-accent">Enter your new password.</p>
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
                <Button className="w-full" type="submit">
                    Reset Password
                </Button>
            </form>
        </div>
    );
};

export default ResetPassword;