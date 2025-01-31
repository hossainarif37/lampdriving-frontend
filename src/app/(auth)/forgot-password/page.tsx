"use client"
import { FC } from "react"
import SendVerificationEmail from "./components/SendVerificationEmail"


const ForgotPassword: FC = () => {
    
    return (
        <div className="min-h-[calc(100vh-56px)] flex items-center justify-center">
            <SendVerificationEmail />
        </div>
    );
};

export default ForgotPassword;