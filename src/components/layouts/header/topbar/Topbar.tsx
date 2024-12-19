import Bar from "@/components/shared/Bar";
import Link from "next/link";

const Topbar = () => {
    return (
        <div className="bg-white p-4 border border-b border-gray-300">
            <div className="wrapper flex items-center justify-between text-secondary font-semibold">
                {/* Left Side */}
                <ul className="hidden md:flex items-center gap-x-4">
                    <li><Link href="#">Support</Link></li>
                    <Bar />
                    <li><Link href="#">Blog</Link></li>
                    <Bar />
                    <li><Link href="/instructor-registration?step=personal-info">Instruct with LampDriving</Link></li>
                </ul>

                {/* Right Side */}
                <ul className="flex items-center gap-x-4">
                    <li><Link href="/login">Login</Link></li>
                    <Bar />
                    <li><Link href="/register">Register</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Topbar;