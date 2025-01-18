import { FC } from 'react';
import bannerBg from "@/assets/banner-img/slide-v1-3.jpg";
// import bannerBg from "@/assets/about-page-image/inner-banner-min-2.jpg"
import SearchBoxDesign from './BannerSearch';
import BannerHeading from './BannerHeading';

const Banner: FC = () => {
    return (
        <section
            className="relative md:h-[650px] xl:min-h-[820px] py-20 md:py-0 bg-primary bg-cover bg-center"
            style={{ backgroundImage: `url(${bannerBg.src})` }}
        >
            {/* transparent overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-primary opacity-50" />

            {/* Content layer */}
            <div className="relative wrapper mx-auto md:flex items-center justify-between h-full space-y-8" >

                {/* Left content */}
                <BannerHeading />

                {/* Search feild based on location*/}
                <div>
                    <SearchBoxDesign />
                </div>
            </div>
        </section>
    );
};

export default Banner;