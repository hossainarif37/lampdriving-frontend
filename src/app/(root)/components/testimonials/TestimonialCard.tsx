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

interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: FC<TestimonialCardProps> = ({ testimonial }) => {
    const { name, title, rating, description, } = testimonial;

    return (
        <div className="relative border border-gray-100 rounded-lg bg-white pb-8">


            {/* Content */}
            <div className='relative'>
                <h1 className="text-xl border-b p-3 px-6 text-secondary font-bold">{title}</h1>
                <p className='absolute top-2 right-3'>
                    <Image src={shape} alt='shape-img' width={50} height={50} />
                </p>
            </div>

            <div className="relative flex lg:flex-row flex-col gap-3 lg:items-center p-4 lg:p-6">
                <div className="md:w-1/5">
                    <Image
                        alt={`${name} image`}
                        src={myImg}
                        width={150}
                        height={150}
                        className="rounded-full"
                    />
                    <div className="absolute bottom-8 left-20  gradient-color  flex gap-1 text-textCol justify-center items-center px-3 py-1 rounded-full">
                        <Star className="w-4 text-white" />
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
