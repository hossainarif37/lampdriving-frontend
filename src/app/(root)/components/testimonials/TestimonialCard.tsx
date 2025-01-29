import Image from 'next/image';
import { FC, useState } from 'react';
import { Star } from 'lucide-react';
import shape from "@/assets/testimonials-image/testimonial-v1-shape1.png"
import userImg from "@/assets/dummy-images/Users_Circle_Man-512.webp"

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
    const [isExpanded, setIsExpanded] = useState(false);


    // Split the description into words
    const words = description.split(" ");
    const truncatedDescription = words?.slice(0, 15).join(" ");
    const descriptionLength = words?.length;

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="relative border border-gray-200/90 gradient-to-b rounded-lg">

            {/* Content */}
            <div className='relative'>
                <h1 className="text-xl border-b p-3 px-6 text-primary">{title}</h1>
                {/* Quote */}
                <div className='absolute top-2 right-3'>
                    <Image src={shape} alt='quote' width={50} height={50} />
                </div>
            </div>

            <div className="relative flex md:flex-row flex-col md:gap-7 gap-2 p-4 lg:p-6">
                <div className="">
                    <div className='flex gap-4'>
                        <Image
                            alt={`${name} image`}
                            src={userImg}
                            width={120}
                            height={120}
                            className="rounded-full"
                        />
                        <h4 className='text-xl font-semibold mt-5 block md:hidden'>{name}</h4>
                    </div>
                    <div className="absolute md:top-24 md:left-24  lg:top-24 top-[82px] left-20 bg-secondary flex gap-1 text-light justify-center items-center px-3 py-1 rounded-full text-xl md:text-base lg:text-sm">
                        <Star className="md:w-4 lg:w-4 w-6 text-light" />
                        <p>{rating}</p>
                    </div>
                </div>
                <div className="md:w-2/3 text-accent md:mb-0 mb-4 ">
                    <h4 className='text-xl font-semibold mb-2 hidden md:block'>{name}</h4>
                    <p onClick={toggleDescription}>
                        {isExpanded ? <span>{description}</span> : <span>{truncatedDescription}...</span>}
                        {descriptionLength > 15 && <button onClick={toggleDescription} className="text-primary text-xs inline  underline font-semibold">
                            {isExpanded ? "Show less" : "Show more"}
                        </button>}
                    </p>
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
