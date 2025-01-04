// import Image from 'next/image';
// import { FC } from 'react';
import leftImg from "@/assets/about-page-image/man_1.jpg"
import carImg from "@/assets/about-page-image/about-car.png"
import badgeImg from "@/assets/about-page-image/badge.png"

// const AboutSection: FC = () => {
//     return (
//         <div>
//             <div>
//             <Image src={leftImg} alt='about-image' />
//             </div>

//             <div>

//             </div>
//         </div>
//     );
// };

// export default AboutSection;




import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText } from 'lucide-react'

export default function AboutSection() {
    return (
        <>
            <div className="wrapper py-12">
                <div className="flex md:flex-row flex-col gap-14 justify-between">
                    {/* Left Column with Image */}
                    <div className="relative sm:w-1/2 gap-8">
                        {/* Background image with person */}
                        <div className="relative overflow-hidden w-full">
                            <Image
                                src={leftImg}
                                alt="Driving instructor"
                                // width={400}
                                // height={350}
                                className="object-cover rounded-lg"
                                priority
                            />
                        </div>

                        {/* Award badge - positioned to overlap */}
                        <div className="absolute right-16 top-16  bg-white p-7 rounded-full shadow-lg">
                            <Image
                                src={badgeImg}
                                alt="Best Driving School Award"
                                width={120}
                                height={120}
                                className="object-contain"
                            />
                        </div>

                        {/* Circular green border with car */}
                        <div className="absolute bottom-0 left-0 w-full">
                            <div className="relative aspect-square w-full">
                                {/* Rotating border with text */}


                                {/* Car image */}
                                <div className="absolute bottom-0 md:-left-10 md:w-7/8 w-5/7">
                                    <Image
                                        src={carImg}
                                        alt="Mercedes AMG"
                                        // width={500}
                                        // height={300}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column Content */}
                    <div className="space-y-4 sm:w-1/2">
                        <Badge variant="secondary" className="bg-[#1B2534] text-white hover:bg-[#1B2534]/90 rounded px-4 py-1">
                            ABOUT US
                        </Badge>

                        <h1 className="md:text-5xl text-xl font-bold leading-tight text-[#1B2534]">
                            Experience, Quality and Trust in Driving Education
                        </h1>

                        <p className="text-gray-600 text-sm md:text-base ">
                            Certain circumstances and owing to the claims of duty or the obliga- tions
                            of business it will frequently occur that pleasures have to be repudiated and
                            annoyances accepted.
                        </p>

                        <div className="md:space-y-6 space-y-3  ">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-50 rounded">
                                        <FileText className="w-6 h-6 text-[#1B2534]" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#1B2534]">
                                        Our History
                                    </h3>
                                </div>
                                <p className="text-gray-600 pl-[52px]">
                                    Duty or the obligations of business matters.
                                </p>
                            </div>

                            <div className="space-y-2 pl-[52px] text-sm md:text-base">
                                {[
                                    "Established in 2005.",
                                    "In 2008, we expanded our services.",
                                    "2012 marked a significant milestone.",
                                    "Online learning platform in 2015.",
                                ].map((text, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        <span className="text-gray-600">{text}</span>
                                    </div>
                                ))}
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <Button
                    className="bg-[#1B2534] text-white hover:bg-[#1B2534]/90 mt-4"
                >
                    READ MORE
                </Button>
            </div>
        </>
    )
}

