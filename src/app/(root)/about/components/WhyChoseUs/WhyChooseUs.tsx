import Image from 'next/image';
import { FC } from 'react';
import steeringImg from "@/assets/about-page-image/steering.png";
import { Calendar, ShieldCheck, Tag, User2 } from 'lucide-react';
import FeatureCard from './FeatureCard';

const WhyChooseUs: FC = () => {
    return (
        <section className="wrapper py-16">
            {/* Header Section */}
            <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 bg-emerald-500 text-white rounded-md text-sm font-medium mb-4">
                    WHY CHOOSE US
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Reasons to Choose Us
                </h2>
            </div>

            {/* Main Content */}
            <div className="flex md:flex-row flex-col md:max-w-full max-w-lg mx-auto gap-10 w-full">
                {/* Left Column */}
                <div className="text-right md:w-3/12 flex flex-col justify-between">
                    <FeatureCard
                        Icon={ShieldCheck}
                        title="Licensed"
                        description="Take a trivial example, which of us ever undertakes laborious physical to some advantages."
                        alignment="right"
                    />
                    <div className="text-gray-100 md:text-8xl text-6xl font-bold">
                        {'«'.repeat(3)}
                    </div>
                    <FeatureCard
                        Icon={Calendar}
                        title="Flexible Scheduling"
                        description="Moment so blinded by desire, that cannot foresee the pain and trouble are bound to ensue."
                        alignment="right"
                    />
                </div>

                {/* Main Content Container */}
                <div className="relative overflow-hidden flex flex-col items-center justify-end md:w-[570px] w-full h-[500px] mx-auto bg-[#04bf61] z-[1]">
                    <div
                        style={{ position: "absolute", left: "-180px", right: "-180px", bottom: "-510px", height: "570px", backgroundColor: "#ffffff", zIndex: 2, borderRadius: "50%", }}
                    />
                    <div
                        style={{
                            position: "absolute", top: "-510px", left: "-180px", right: "-180px", height: "570px", backgroundColor: "#ffffff", zIndex: 2, borderRadius: "50%",
                        }}
                    />
                    <div className="absolute top-[30px] left-0 right-0 text-center text-white/10 text-[100px] font-extrabold leading-[1em] uppercase font-secondary">
                        Lamp driving
                    </div>
                    <div className="z-[100] animate-rotateSwing mb-6">
                        <Image src={steeringImg} alt="steering image" className="" />
                    </div>
                </div>

                {/* Right Column */}
                <div className="text-left md:w-3/12 flex flex-col justify-between">
                    <FeatureCard
                        Icon={User2}
                        title="Experienced"
                        description="Take a trivial example, which of us ever undertakes laborious physical to some advantages."
                        alignment="left"
                    />
                    <div className="text-gray-100 md:text-8xl text-6xl font-bold">
                        {'»'.repeat(3)}
                    </div>
                    <FeatureCard
                        Icon={Tag}
                        title="Affordable Rates"
                        description="Enjoy a pleasure that no annoying consequences, or one who avoids a produces."
                        alignment="left"
                    />
                </div>
            </div>
        </section>
    );
};
export default WhyChooseUs;
