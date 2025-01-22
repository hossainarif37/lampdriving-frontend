"use client"
import Bar from "@/components/shared/Bar";
import { toast } from "@/hooks/use-toast";
import { useLazyLogOutUserQuery } from "@/redux/api/authApi/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { removeUser } from "@/redux/slices/authSlice/authSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Topbar = () => {
    const { isAuthenticate, user } = useAppSelector(state => state.authSlice);

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

    const dashboardURL = isAuthenticate && user?.role === "admin" ? "/dashboard/admin" : user?.role === "instructor" ? "/dashboard/instructor" : "/dashboard/learner";

    return (
        <div className={`p-4 border border-b border-gray-200 bg-light`}>
            <div className="wrapper flex items-center justify-between text-primary font-semibold">
                {/* Left Side */}
                <ul className="hidden md:flex items-center gap-x-4">
                    <li><Link href="#">Support</Link></li>
                    <Bar />
                    <li><Link href="/blog">Blog</Link></li>
                    {
                        !user &&
                        <>
                            <Bar />
                            <li><Link href="/instruct">Instruct with LampDriving</Link></li>
                        </>
                    }
                </ul>

                {/* Right Side */}
                <ul className="flex items-center gap-x-4">
                    {
                        isAuthenticate ? (
                            <>
                                <li>
                                    <Link href={dashboardURL}>Dashboard</Link>
                                </li>
                                <Bar />
                                <li>
                                    <button onClick={handleLogout} disabled={isLogoutLoading}>
                                        Logout
                                    </button>
                                </li>
                            </>

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