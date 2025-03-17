import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';
import arrowImg from "@/assets/banner-img/main-slider-style1__arrow.png";
import Link from 'next/link';

const BannerHeading: FC = () => {
    return (
        <div className="text-light">
            {/* Main heading */}
            <h2 className="uppercase md:text-5xl text-4xl text-center md:text-left flex flex-col font-bold md:gap-4 gap-1">
                <span>Drive safe</span>
                <span className="leading-10">& smart with</span>
                <span>Lamp Driving</span>
            </h2>

            {/* Content section */}
            <div className="relative md:flex justify-between items-center lg:gap-8 md:gap-4 font-bold">

                {/* Left content: Reviews and button */}
                <div className="md:space-y-8 space-y-5 md:my-8 my-5 text-center md:text-left">
                    {/* Review block */}
                    <div className="flex gap-3 items-center justify-center md:justify-start">
                        <p className="w-14 h-14 rounded-full bg-secondary/50 backdrop-blur-sm flex justify-center items-center text-light font-bold">
                            4.9
                        </p>
                        <div>
                            {/* Star rating */}
                            <div className="text-secondary/50 font-bold flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className='fill-secondary' />
                                ))}
                            </div>
                            <p className='md:text-base text-xs'>159 Reviews on Google</p>
                        </div>
                    </div>

                    {/* Button */}
                    <Link href={'/instructors'}>
                        <Button className="h-12 w-44 md:w-52 mt-7 bg-secondary/70 backdrop-blur-sm">
                            Discover Lesson
                        </Button>
                    </Link>
                </div>

                <div className='flex flex-col lg:flex-row gap-4'>
                    {/* Center content: Pricing */}
                    <div className='text-center lg:text-left '>
                        <p className="md:flex flex-col md:mt-14 mb-4 md:mb-0">
                            Courses Start <span>from</span>
                        </p>
                    </div>

                    {/* Pricing badge */}
                    <div className=' flex md:flex-none justify-center '>
                        <div
                            className="flex flex-col justify-center items-center bg-secondary/50 backdrop-blur-sm w-28 h-28 text-light font-bold lg:text-base text-sm"
                            style={{
                                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                            }}
                        >
                            <h4>$68</h4>
                            <span>Per hour</span>
                        </div>
                    </div>
                </div>

                {/* Decorative arrow image */}
                <div className="absolute top-0 right-40 animate-slide hidden lg:block">
                    <Image src={arrowImg.src} alt="Decorative arrow" width={100} height={100} />
                </div>
            </div>
        </div>
    );
};

export default BannerHeading;
