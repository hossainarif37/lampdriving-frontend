"use client";
import React, { FC, useEffect, useState } from 'react';
import SectionHeading from '../shared/section-heading/SectionHeading';
import TestimonialCard, { Testimonial } from './TestimonialCard';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

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
        <div className='bg-gradient-to-b from-[#F0F7F3] to-[#ffff] via-custom-white  md:p-24'>
            <SectionHeading title='Testimonials' subtitle='Our Learner Experiences' />
            <Carousel opts={{ align: "start", loop: true }} className="max-w-7xl w-full mx-auto ">
                <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                            <div className='p-0'>
                                <Card className='p-0'>
                                    <CardContent className="p-0 ">
                                        <TestimonialCard testimonial={testimonial} />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Slider previous and next button area*/}
                <div className='hidden md:block'>
                    <CarouselPrevious className='bg-[#F0F7F3] text-secondary' />
                    <CarouselNext />
                </div>

            </Carousel>
            <div className="relative mt-12 text-center hidden">
                {/* Horizontal border */}
                <hr className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-3/4 z-0" />

                {/* Centered button */}
                <Button
                    variant="outline"
                    className="bg-gray-50 hover:bg-gray-100 h-12 rounded-3xl relative z-10"
                >
                    <span className="text-gray-600 mr-2">Discover what others are saying.</span>
                    <ChevronRight />
                    <span className="font-semibold">VIEW ALL</span>
                </Button>
            </div>

        </div>
    );
};

export default Testimonials;
