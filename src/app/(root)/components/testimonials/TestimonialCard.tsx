import Image from 'next/image';
import { FC } from 'react';
import myImg from "@/assets/home-page-image/test-image.webp"
import { Star } from 'lucide-react';

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
    const { name, title, rating, description, position } = testimonial;

    return (
        <div className="border border-gray-300 rounded-lg">
            {/* Box part */}
            <h1 className='md:text-xl border-b p-3 text-secondary font-semibold'>{title}</h1>
            <div className='md:p-6 flex gap-3 items-center p-4 relative' >
                <div className='md:w-1/5 '>
                    <Image alt={`${name} image`} src={myImg} width={150} height={150} className='rounded-full' />
                    <div className='absolute top-2 right-3 flex gap-2 bg-secondary text-textCol justify-center items-center  px-3 py-1 rounded-lg '>
                        <Star className='w-5' />
                        <p>{rating}</p>
                    </div>
                </div>
                <div className='md:w-2/3'>
                    <p>{description}</p>
                </div>
            </div>

            {/* Reviewer position part */}
            <div className=" p-4">
                <h1 className="font-medium text-xl text-secondary" >{name} <span className="text-sm text-primary">{position}</span></h1>
            </div>
        </div>
    );
};

export default TestimonialCard;
