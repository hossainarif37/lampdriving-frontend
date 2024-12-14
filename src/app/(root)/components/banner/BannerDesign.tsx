import { FC } from 'react';
import bannerBg from "@/assets/banner-img/slide-v1-3.jpg";
import SearchBoxDesign from './SearchBoxDesign';
import BannerLeftContent from './BannerLeftContent';

const BannerDesign: FC = () => {
    return (
        <div
            className="relative md:h-[650px] py-20 md:py-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bannerBg.src})` }}
        >
            {/* transparent overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-950 to-gray-700 opacity-60"></div>

            {/* Content layer */}
            <div className="relative wrapper mx-auto md:flex items-center justify-between h-full space-y-8" >

                {/* Left content */}
                <BannerLeftContent />

                {/* Search feild based on location*/}
                <div>
                    <SearchBoxDesign />
                </div>
            </div>
        </div>
    );
};

export default BannerDesign;
