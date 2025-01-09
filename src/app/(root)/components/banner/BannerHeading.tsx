import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';
import arrowImg from "@/assets/banner-img/main-slider-style1__arrow.png";

const BannerHeading: FC = () => {
    return (
        <div className="text-light">
            {/* Main heading */}
            <h2 className="uppercase md:text-5xl text-3xl flex flex-col font-bold md:gap-4 gap-1">
                <span>Drive safe</span>
                <span className="leading-9">& smart with</span>
                <span>Lamp Driving</span>
            </h2>

            {/* Content section */}
            <div className="relative md:flex justify-between items-center lg:gap-8 md:gap-4 font-bold">

                {/* Left content: Reviews and button */}
                <div className="space-y-8 my-8">
                    {/* Review block */}
                    <div className="flex gap-3 items-center">
                        <p className="w-14 h-14 rounded-full bg-secondary flex justify-center items-center text-light font-bold">
                            4.9
                        </p>
                        <div>
                            {/* Star rating */}
                            <div className="text-secondary font-bold flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className='fill-secondary' />
                                ))}
                            </div>
                            <p className='md:text-base text-xs'>2.8k Reviews by Trustpilot</p>
                        </div>
                    </div>

                    {/* Button */}
                    <Button className="h-12 w-44 md:w-52 hover:bg-secondary/90">Discover courses</Button>
                </div>

                {/* Center content: Pricing */}
                <div>
                    <p className="md:flex flex-col md:mt-14 mb-4 md:mb-0">
                        Courses Start <span>from</span>
                    </p>
                </div>

                {/* Pricing badge */}
                <div
                    className="flex flex-col justify-center items-center bg-secondary w-28 h-28 text-light font-bold lg:text-base text-sm"
                    style={{
                        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    }}
                >
                    <h4>$59</h4>
                    <span>Per hour</span>
                </div>

                {/* Decorative arrow image */}
                <div className="absolute top-0 right-40 animate-slide hidden md:block">
                    <Image src={arrowImg.src} alt="Decorative arrow" width={100} height={100} />
                </div>
            </div>
        </div>
    );
};

export default BannerHeading;
