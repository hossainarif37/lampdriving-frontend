"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: ReactNode;
    active: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "sidebar" | "activeSidebar";
    other: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "sidebar" | "activeSidebar";
}

const NavLink = ({ href, children, active, other, className, ...props }: NavLinkProps) => {
    const pathname = usePathname();
    return (
        <Link href={href} {...props}>
            <Button className={cn("md:h-10 xl:h-11 w-full justify-start font-semibold px-3 capitalize", className)} variant={pathname === href ? active : other}>
                {children}
            </Button>
        </Link>
    );
};

export default NavLink;