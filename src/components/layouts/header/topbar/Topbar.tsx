"use client"
import Bar from "@/components/shared/Bar";
import { toast } from "@/hooks/use-toast";
import { useLazyLogOutUserQuery } from "@/redux/api/authApi/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { removeUser } from "@/redux/slices/authSlice/authSlice";
import Link from "next/link";

const Topbar = () => {
    const { isAuthenticate } = useAppSelector(state => state.authSlice);

    const [logoutUser, { isLoading: isLogoutLoading }] = useLazyLogOutUserQuery();

    const dispatch = useAppDispatch();
    
    // logout button handler
    const handleLogout = () => {
        logoutUser().unwrap().then((res) => {
            dispatch(removeUser());
            toast({
                message: res.message
            })
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message || "Something went wrong"
            })
        });
    }

    return (
        <div className="bg-light p-4 border border-b border-gray-300">
            <div className="wrapper flex items-center justify-between text-secondary font-semibold">
                {/* Left Side */}
                <ul className="hidden md:flex items-center gap-x-4">
                    <li><Link href="#">Support</Link></li>
                    <Bar />
                    <li><Link href="#">Blog</Link></li>
                    <Bar />
                    <li><Link href="#">Instruct with LampDriving</Link></li>
                </ul>

                {/* Right Side */}
                <ul className="flex items-center gap-x-4">
                    {
                        isAuthenticate ? (
                            <button onClick={handleLogout} disabled={isLogoutLoading}>
                                Logout
                            </button>

                        )
                            :
                            <>
                                <li><Link href="/login">Login</Link></li>
                                <Bar />
                                <li><Link href="/register">Register</Link></li>
                            </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Topbar;