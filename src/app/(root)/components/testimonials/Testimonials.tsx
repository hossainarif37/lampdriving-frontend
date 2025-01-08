"use client";
import React, { FC, useEffect, useState } from 'react';
import SectionHeading from '../shared/section-heading/SectionHeading';
import TestimonialCard, { Testimonial } from './TestimonialCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay"

const Testimonials: FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const response = await fetch('/testimonials.json');
            const data = await response.json();
            setTestimonials(data);
        };
        fetchTestimonials();
    }, []);

    return (
        <div className='relative md:p-16 py-16 px-8 bg-light-green'>
            <SectionHeading title='Testimonials' subtitle='Our Learner Experiences' />
            <Carousel
                opts={{ align: "start", loop: true, }}
                className="wrapper"
                plugins={[
                    Autoplay({
                        delay: 3000,
                    }),
                ]}
            >
                <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="lg:h-[300px] h-[400px] md:basis-1/1 lg:basis-1/2">
                            <div className='md:px-4'>
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Slider previous and next button area*/}
                <div className='hidden md:block'>
                    <CarouselPrevious className='bg-[#F0F7F3] text-primary' />
                    <CarouselNext className='bg-[#F0F7F3] text-primary' />
                </div>
            </Carousel>

            {/*========= CTA Button section ========= */}
            <div className="relative md:mt-12 mt-6 text-center wrapper">
                {/* Horizontal border */}
                <hr className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-full z-0" />

                {/* Centered button */}
                <Button
                    variant="outline"
                    className="bg-gray-50 hover:bg-gray-100 h-12 rounded-3xl relative z-10"
                >
                    <span className="text-gray-600 mr-2 md:block hidden">Discover what others are saying.</span>
                    <ChevronRight />
                    <span className="font-bold">VIEW ALL</span>
                </Button>
            </div>

        </div>
    );
};

export default Testimonials;
