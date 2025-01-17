"use client"

import LampLogo from "@/components/shared/LampLogo";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/constant/navLinks";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    return (
        <nav className="bg-light-green">
            <div className="wrapper flex justify-between items-center py-2 w-full">
                <div>
                    <Link href={'/'}>
                        <LampLogo />
                    </Link>
                </div>


                <ul className="hidden md:flex items-center gap-x-7 font-semibold text-primary">
                    {
                        navLinks.map(({ title, href }) => (
                            <li key={title} className={`${pathname === href ? "text-secondary" : ""}`}>
                                <Link href={href}>{title}</Link>
                            </li>
                        ))
                    }
                </ul>

                <Link href={'/instructors'}>
                    <Button className="hidden md:block gradient-color">Book Lesson</Button>
                </Link>

                {/* Mobile Nav */}
                <MobileNav />
            </div>
        </nav>
    );
};

export default Navbar;