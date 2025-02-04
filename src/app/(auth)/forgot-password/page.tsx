import { FC } from "react"
import ForgotPassword from "./components/ForgotPassword";


const ForgotPasswordPage: FC = () => {
    return (
        <div className="min-h-[calc(100vh-56px)] flex items-center justify-center">
            <ForgotPassword />
        </div>
    );
};

export default ForgotPasswordPage;