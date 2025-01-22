import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import personImg from "@/assets/home-page-image/test-image.webp"
import { Button } from '@/components/ui/button';

const SuccessStories: FC = () => {
    const stories = [
        {
            title: "Transforming Education Through Technology",
            description: "Discover innovative approaches to digital learning and student engagement",
            image: personImg,
        },
        {
            title: "Building Sustainable Learning Communities",
            description: "Creating lasting impact through collaborative educational environments",
            image: personImg,
        },
        {
            title: "Transforming Education Through Technology",
            description: "Discover innovative approaches to digital learning and student engagement",
            image: personImg,
        },
        {
            title: "Transforming Education Through Technology",
            description: "Discover innovative approaches to digital learning and student engagement",
            image: personImg,
        }
    ]
    return (
        <section className="py-10 md:py-20 bg-light">
            <div className="wrapper">
                <h2 className="text-3xl font-semibold mb-8 text-primary">
                    Instructor Success Stories
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 px-2">
                    {stories.map((item, index) => (
                        <div key={item.title} className="group relative">
                            {/* Background decorative elements */}
                            <div className="absolute inset-0 bg-secondary/20 rounded-3xl rotate-3 opacity-50"></div>
                            <div className="absolute inset-0 bg-secondary/20 rounded-3xl -rotate-2 opacity-70"></div>

                            {/* Main content card */}
                            <div className="relative bg-white rounded-3xl md:p-6 p-4 shadow-md">
                                {/* Number indicator */}
                                <div className="absolute -top-6 -right-4 md:w-14 w-10 md:h-14 h-10 icon-gradient rounded-2xl flex items-center justify-center text-light text-2xl font-bold rotate-12">
                                    {(index + 1).toString().padStart(2, '0')}
                                </div>

                                {/* Content */}
                                <div className="mb-6">
                                    <div className="w-24 h-24 md:mb-6 mb-4">
                                        <Image
                                            alt="Instructor story image"
                                            src={item.image}
                                            className="w-full rounded-3xl h-full"
                                            width={150}
                                            height={150}
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 md:pr-12 pr-0 text-primary">
                                        {item.title}
                                    </h3>
                                    <p className="text-accent text-sm md:text-base">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Interactive element */}
                                <div className="relative">
                                    <Link href="#" className="inline-flex items-center gap-2 text-primary">
                                        Learn more
                                        <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                    <div className="absolute h-1 w-0 bg-gradient-to-r from-primary/30 to-primary/40 bottom-0 left-0 transition-all duration-300 group-hover:w-24"></div>
                                </div>

                                {/* Decorative corner accent */}
                                <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden rounded-br-3xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-secondary/10 transform rotate-45 translate-y-12 translate-x-12"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/*CTA button*/}
                <div className="text-center mt-14">
                    <Button>
                        See all <ArrowRight />
                    </Button>
                </div>
            </div>
        </section>

    );
};

export default SuccessStories;
