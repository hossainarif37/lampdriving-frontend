"use client"
import { navLinks } from "@/constant/navLinks";
import useOutsideClick from "@/hooks/useOutsideClick";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useOutsideClick(() => setIsOpen(false), isOpen);
    return (
        <div className="relative md:hidden" ref={ref}>
            <button
                onClick={() => setIsOpen(() => !isOpen)}
                type="button">
                <Menu />
            </button>
            <ul className={`z-50 absolute origin-top duration-200 ${isOpen ? "scale-y-100" : "scale-y-0"} top-12 right-0 w-48 bg-light shadow rounded-lg p-5 flex flex-col gap-5 font-semibold text-primary`}>
                {
                    navLinks.map(({ title, href }) => (
                        <li key={title}>
                            <Link href={href}>{title}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default MobileNav;