import LampLogo from "@/components/shared/LampLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav >
            <div className="wrapper flex justify-between items-center py-5 w-full">
                <div>
                    <LampLogo />
                </div>


                <ul className="flex items-center gap-x-7 font-semibold text-secondary">
                    <li>
                        <Link href="#">Driving Lessons</Link>
                    </li>
                    <li>
                        <Link href="#">Test Packages</Link>
                    </li>
                    <li>
                        <Link href="#">Gallery</Link>
                    </li>
                    <li>
                        <Link href="#">Pricing</Link>
                    </li>
                </ul>

                <Button size={"lg"}>Book Lesson</Button>
            </div>
        </nav>
    );
};

export default Navbar;