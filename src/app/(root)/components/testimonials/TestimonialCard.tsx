import Image from 'next/image';
import { FC } from 'react';
import myImg from "@/assets/home-page-image/test-image.webp"
import { Star } from 'lucide-react';
import shape from "@/assets/testimonials-image/testimonial-v1-shape1.png"

export interface Testimonial {
    name: string;
    title: string;
    image: string;
    rating: number;
    description: string;
    position: string;
}

interface ITestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: FC<ITestimonialCardProps> = ({ testimonial }) => {
    const { name, title, rating, description, } = testimonial;

    return (
        <div className="relative border border-gray-100 bg-gradient-to-r from-indigo/10 rounded-lg">

            {/* Content */}

            <div className='relative'>
                <h1 className="text-xl border-b p-3 px-6 bg-gradient-to-r from-primary to-indigo bg-clip-text text-transparent font-bold">{title}</h1>
                <p className='absolute top-2 right-3'>
                    <Image src={shape} alt='shape-img' width={50} height={50} />
                </p>
            </div>

            <div className="relative flex md:flex-row flex-col md:gap-7 gap-5 md:items-center p-4 lg:p-6">
                <div className="">
                    <Image
                        alt={`${name} image`}
                        src={myImg}
                        width={120}
                        height={120}
                        className="rounded-full"
                    />
                    <div className="absolute md:top-24 md:left-24  lg:top-24 top-[82px] left-20  gradient-color flex gap-1 text-light justify-center items-center px-3 py-1 rounded-full text-xl md:text-base lg:text-sm">
                        <Star className="md:w-4 lg:w-4 w-6 text-light" />
                        <p>{rating}</p>
                    </div>
                </div>
                <div className="md:w-2/3 text-accent md:mb-0 mb-4 ">
                    <p>{description}</p>
                </div>
            </div>

            {/* Background element */}
            <div
                className="absolute w-full h-full top-[14px] left-4 -bottom-2 -right-2 -z-10"
                style={{
                    backgroundColor: '#F0F7F3',
                    borderRadius: '3px',
                }}
            ></div>

            {/* Decorative corner triangle */}
            <div
                className="absolute left-[35px] -bottom-[59px] w-[45px] h-[45px] bg-[#F0F7F3] z-50"
                style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
            ></div>
        </div>

    );
};

export default TestimonialCard;
