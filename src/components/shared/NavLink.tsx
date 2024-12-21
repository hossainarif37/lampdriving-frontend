"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { LinkHTMLAttributes } from "react";
import { Button } from "../ui/button";

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
    active: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "sidebar" | "activeSidebar";
    other: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "sidebar" | "activeSidebar";
}

const NavLink = ({ href, children, active, other, ...props }: NavLinkProps) => {
    const pathname = usePathname();
    return (
        <Link href={href} {...props}>
            <Button className="h-[40px] w-full justify-start px-3" variant={pathname === href ? active : other}>
                {children}
            </Button>
        </Link>
    );
};

export default NavLink;