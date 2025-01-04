import { FC } from 'react';
import bannerBg from "@/assets/about-page-image/about-banner.jpg"

const Banner: FC = () => {
    return (
        <div className='relative md:h-[460px] h-[350px] bg-cover bg-center' style={{ backgroundImage: `url(${bannerBg.src})` }}>
            {/* <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-gray-900 opacity-50 " /> */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-300 mix-blend-multiply" />
        </div>
    );
};

export default Banner;