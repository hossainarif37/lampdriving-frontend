"use client"

import logo from "@/assets/logo-image/logo.png"
import Image from "next/image";
import Link from "next/link";
const LampLogo = () => {
    return (
        <div>
            <Link href="/">
                <Image src={logo} alt="logo image" width={150} height={100} />
            </Link>
        </div>
    );
};

export default LampLogo;