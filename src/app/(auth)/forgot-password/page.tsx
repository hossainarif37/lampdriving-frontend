"use client"
import { useState, FC } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const ForgotPassword: FC = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Sending reset OTP to:", email)
        router.push("/forgot-password/verify-otp")
    }
    return (
        <div className="w-full md:w-[450px] xl:w-[500px] max-w-[500px] mx-auto mt-32 p-6 border md:shadow-lg md:rounded-md md:border">
            <h1 className="text-2xl font-bold text-primary/90 text-center mb-4">Forgot Password</h1>
            <p className="mb-2 text-sm text-accent">Enter your email to receive a password reset OTP.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='w-full xl:h-12 mt-1 pr-10'
                />
                <Button className="w-full" type="submit">
                    Send Reset OTP
                </Button>
            </form>
        </div>
    );
};

export default ForgotPassword;