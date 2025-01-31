"use client"
import { FC, useState } from "react"
import SendVerificationEmail from "./components/SendVerificationEmail"
import { useRouter } from "next/navigation";


const ForgotPassword: FC = () => {
    const [step, setStep] = useState<"send-otp" | "verify-otp" | "reset-password">("send-otp");
    const router = useRouter()
    return (
        <div className="min-h-[calc(100vh-56px)] flex items-center justify-center">
            <SendVerificationEmail />
        </div>
    );
};

export default ForgotPassword;