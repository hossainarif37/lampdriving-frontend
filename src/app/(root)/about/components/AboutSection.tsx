import { FC } from "react";
import leftImg from "@/assets/about-page-image/man_1.jpg";
import carImg from "@/assets/about-page-image/about-car.png";
import badgeImg from "@/assets/about-page-image/badge.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronsRight, FileText } from "lucide-react";

const AboutSection: FC = () => {
    return (
        <div className="py-16">
            <div className="wrapper py-12">
                <div className="flex md:flex-row flex-col gap-14 justify-between  md:max-w-full max-w-lg mx-auto">
                    {/* Left Column with Image */}
                    <div className="relative md:w-1/2">
                        {/* Background image with person */}
                        <div className="md:max-w-[425px]">
                            <Image
                                src={leftImg}
                                alt="Driving instructor"
                                className="object-cover rounded-lg w-full"
                                priority
                            />
                        </div>

                        {/* Award badge - positioned to overlap */}
                        <div className="absolute right-8 top-16 bg-white p-7 rounded-full shadow-lg">
                            <Image
                                src={badgeImg}
                                alt="Best Driving School Award"
                                width={120}
                                height={120}
                                className="object-contain"
                            />
                        </div>

                        {/* Circular green border with car */}
                        <div className="absolute -bottom-10 md:-left-9 md:w-7/8 w-full animate-carSlide">
                            <Image
                                src={carImg}
                                alt="Mercedes AMG"
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Right Column Content */}
                    <div className="space-y-8 md:w-1/2">
                        <div className="space-y-4">
                            <h3 className="w-[105px] bg-secondary py-[6px] px-[15px] text-sm font-bold rounded-[4px] ml-2 relative before:absolute before:w-[5px] uppercase before:min-h-full before:bg-secondary text-light before:top-0 before:rounded-[4px] before:-ml-6">
                                ABOUT US
                            </h3>

                            <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold leading-[2.3rem] lg:leading-[3.5rem] md:leading-[2.7rem] text-[#1B2534]">
                                Experience, Quality and Trust in Driving Education
                            </h1>

                            <p className="text-gray-600 text-sm md:text-base leading-6 md:leading-7">
                                Certain circumstances and owing to the claims of duty or the
                                obligations of business it will frequently occur that pleasures
                                have to be repudiated and annoyances accepted.
                            </p>
                        </div>

                        <div className="md:space-y-6 space-y-3">
                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gray-50 rounded">
                                        <FileText className="w-14 h-14 text-indigo" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-secondary">
                                            Our History
                                        </h3>
                                        <p className="text-accent">
                                            Duty or the obligations of business matters.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 pl-[70px] text-sm md:text-base">
                                {[
                                    "Established in 2005.",
                                    "In 2008, we expanded our services.",
                                    "2012 marked a significant milestone.",
                                    "Online learning platform in 2015.",
                                ].map((text, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <ChevronsRight className="text-primary" />
                                        <span className="text-gray-600">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-8">
                <Button className="bg-secondary hover:bg-secondary/90">
                    READ MORE
                </Button>
            </div>
        </div>
    );
};

export default AboutSection;
