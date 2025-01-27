import { FC } from 'react';
import Image from "next/image"
import { Mountain, Diamond } from 'lucide-react'
import missionImg from "@/assets/about-page-image/statement-v1-1.jpg"
import bg from "@/assets/about-page-image/inner-banner-min-2.jpg"

const MissionVisionSection: FC = () => {
    return (
        <section style={{ backgroundImage: `url(${bg.src})` }} className="relative -z-10 py-16 md:py-24 flex items-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-primary opacity-50 z-0" />
            <div className="lg:max-w-7xl z-10 mx-auto md:max-w-4xl max-w-md flex flex-col md:flex-row gap-8 px-4 lg:items-start items-center w-full">
                {/* Left Column - Icons (Visible on Large Screens) */}
                <div className="lg:w-2/12 lg:flex hidden flex-col">
                    <div className="border border-green-900 p-6">
                        <div className="flex flex-col items-center text-center">
                            <Mountain className="w-12 h-12 text-emerald-400 mb-2" />
                            <span className="text-light uppercase text-sm font-medium">Our Mission</span>
                        </div>
                    </div>
                    <div className="border border-green-900 p-6">
                        <div className="flex flex-col items-center text-center">
                            <Diamond className="w-12 h-12 text-emerald-400 mb-2" />
                            <span className="text-light uppercase text-sm font-medium">Our Vision</span>
                        </div>
                    </div>
                </div>

                {/* Middle Column - Content */}
                <div className="space-y-6 lg:w-7/12 md:w-8/12">
                    {/* Title Section */}
                    <div className="space-y-4">
                        <h3 className="w-[120px] bg-secondary py-[6px] px-[15px] text-sm font-bold rounded-[4px] ml-2 relative before:absolute before:w-[5px] uppercase before:min-h-full before:bg-secondary text-light before:top-0 before:rounded-[4px] before:-ml-6">
                            Statements
                        </h3>
                        <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold leading-[2.3rem] lg:leading-[3.5rem] md:leading-[2.7rem] text-light">
                            Our Commitment to Excellence
                        </h1>
                    </div>

                    {/* Icons (Visible on Small and Medium Screens) */}
                    <div className="flex w-10/12 lg:hidden">
                        <div className="border border-green-900 p-6">
                            <div className="flex flex-col items-center text-center">
                                <Mountain className="w-12 h-12 text-emerald-400 mb-2" />
                                <span className="text-light uppercase text-sm font-medium">Our Mission</span>
                            </div>
                        </div>
                        <div className="border border-green-900 p-6">
                            <div className="flex flex-col items-center text-center">
                                <Diamond className="w-12 h-12 text-emerald-400 mb-2" />
                                <span className="text-light uppercase text-sm font-medium">Our Vision</span>
                            </div>
                        </div>
                    </div>

                    {/* Mission Content */}
                    <div className="space-y-4">
                        <h2 className="text-white text-xl font-semibold">Mission</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Beguiled and demoralized by the charms of pleasure of the moment, so blinded by
                            desire, that they cannot foresee pain and trouble that are bound to ensue equal
                            blame belongs to those who fail their duty through same as saying through
                            shrinking.
                        </p>
                    </div>

                    {/* Achievement Box */}
                    <div className="bg-white/10 p-6 rounded-lg flex items-center gap-4 max-w-full md:max-w-md">
                        <div className="bg-emerald-500 p-3 rounded-lg">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </div>
                        <div>
                            <div className="text-white text-3xl font-bold">100%</div>
                            <div className="text-gray-400">Driver&apos;s license exam pass rate.</div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Image */}
                <div className="relative lg:w-3/12 md:w-4/12 w-full ">
                    <Image
                        src={missionImg}
                        alt="Success Road"
                        width={400}
                        height={400}
                        className="object-cover w-full h-[400px] rounded-lg"
                    />
                </div>
            </div>
        </section>
    );
};

export default MissionVisionSection;