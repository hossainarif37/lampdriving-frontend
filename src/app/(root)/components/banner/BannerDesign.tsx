import { FC } from 'react';
import bannerBg from "@/assets/banner-img/slide-v1-3.jpg";
import SearchBoxDesign from './SearchBoxDesign';

const BannerDesign: FC = () => {
    return (
        <div
            className="relative md:h-[600px] bg-cover bg-center"
            style={{ backgroundImage: `url(${bannerBg.src})` }}
        >
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 to-gray-6x00 opacity-50"></div>

            {/* Content layer */}
            <div className="relative wrapper mx-auto flex items-center justify-between h-full">
                <div>
                    <h2 className="uppercase text-textCol text-4xl flex flex-col font-bold gap-4 ">
                        <span>Drive safe</span> <span className='leading-9'>& smart with </span><span>our school</span>
                    </h2>
                </div>
                <div>
                    <SearchBoxDesign />
                </div>
            </div>
        </div>
    );
};

export default BannerDesign;
