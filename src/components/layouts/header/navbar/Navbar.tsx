"use client"

import LampLogo from "@/components/shared/LampLogo";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/constant/navLinks";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";
import useWindowScroll from "@/hooks/useWindowScroll";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = () => {
    const pathname = usePathname();
    const visible = useWindowScroll(10);


    return (
        <nav
            className={`sticky bg-light z-50 top-0 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div className="wrapper flex justify-between items-center py-2 w-full">
                <LampLogo />

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