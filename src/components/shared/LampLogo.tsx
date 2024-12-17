import logo from "@/assets/logo-image/logo.png"
import Image from "next/image";
const LampLogo = () => {
    return (
        <div>
            <Image src={logo} alt="logo image" width={150} height={100} />
        </div>
    );
};

export default LampLogo;