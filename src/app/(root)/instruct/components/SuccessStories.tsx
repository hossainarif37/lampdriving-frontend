import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import personImg from "@/assets/dummy-images/successStorise-girl.jpg"

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
            title: "Pioneering New Teaching Methods",
            description: "Exploring creative approaches to modern education challenges",
            image: personImg,
        }
    ]
    return (
        <section className="py-16 px-3 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-semibold mb-8 text-secondary">
                    Educational Excellence
                </h2>

                <div className="space-y-6 ">
                    {stories.map((story, index) => (
                        <Link
                            href="#"
                            key={index}
                            className="group block"
                        >
                            <div className="relative flex items-center md:gap-8 gap-4 p-6 bg-gray-50 rounded-2xl transition-all duration-300 hover:bg-gray-100">
                                {/* Left side - Image */}
                                <div className="relative flex-shrink-0 overflow-hidden rounded-xl">
                                    <Image
                                        src={story.image}
                                        alt={story.title}
                                        width={150}
                                        height={150}
                                        className="object-cover"
                                    />
                                </div>

                                {/* Right side - Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-4">
                                        <h3 className="md:text-2xl text-xl font-semibold text-gray-900 mb-2">
                                            {story.title}
                                        </h3>
                                        <ArrowUpRight
                                            className="w-6 h-6 text-indigo transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                        />
                                    </div>
                                    <p className="text-gray-600 line-clamp-2">
                                        {story.description}
                                    </p>
                                </div>

                                {/* Hover effect border */}
                                <div className="absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-300 group-hover:border-gray-200" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;
