import LampLogo from "@/components/shared/LampLogo";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/constant/navLinks";
import Link from "next/link";
import MobileNav from "./MobileNav";

const Navbar = () => {
    return (
        <nav className="bg-light">
            <div className="wrapper flex justify-between items-center py-2 w-full">
                <div>
                    <LampLogo />
                </div>


                <ul className="hidden md:flex items-center gap-x-7 font-semibold text-secondary">
                    {
                        navLinks.map(({ title, href }) => (
                            <li key={title}>
                                <Link href={href}>{title}</Link>
                            </li>
                        ))
                    }
                </ul>

                <Button className="hidden md:block gradient-color" size={"lg"}>Book Lesson</Button>

                {/* Mobile Nav */}
                <MobileNav />
            </div>
        </nav>
    );
};

export default Navbar;