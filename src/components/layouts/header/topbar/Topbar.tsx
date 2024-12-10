import Bar from "@/components/shared/Bar";
import Link from "next/link";

const Topbar = () => {
    return (
        <div className="bg-secondary p-4">
            <div className="flex items-center justify-between text-white font-medium">
                {/* Left Side */}
                <ul className="flex items-center gap-x-4">
                    <li><Link href="#">Support</Link></li>
                    <Bar />
                    <li><Link href="#">Blog</Link></li>
                    <Bar />
                    <li><Link href="#">Instruct with LampDriving</Link></li>
                </ul>

                {/* Right Side */}
                <ul className="flex items-center gap-x-4">
                    <li><Link href="#">Learner Login</Link></li>
                    <Bar />
                    <li><Link href="#">Instruct Login</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Topbar;