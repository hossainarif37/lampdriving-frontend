import Image from 'next/image';
import { FC } from 'react';
import steeringImg from "@/assets/about-page-image/steering.png";
import { Calendar, ShieldCheck, Tag, User2 } from 'lucide-react';
import FeatureCard from './FeatureCard';

const WhyChooseUs: FC = () => {
    return (
        <section className="wrapper py-28 ">
            {/* Header Section */}

            <div className=" mb-12 flex flex-col justify-center items-center gap-3">
                <h3 className="w-[160px] bg-green-500 py-[7px] px-[15px] text-sm font-bold rounded-[4px] ml-2 relative before:absolute before:w-[5px] uppercase before:min-h-full before:bg-green-500 text-light before:top-0 before:rounded-[4px] before:-ml-6">
                    WHY CHOOSE US
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Reasons to Choose Us
                </h2>
            </div>

            {/* Main Content */}
            <div className="flex md:flex-row flex-col md:max-w-full max-w-lg mx-auto gap-10 w-full overflow-hidden">
                {/* Left Column */}
                <div className="relative text-right md:w-3/12 flex flex-col justify-between ">
                    <div className='group'>
                        <FeatureCard
                            Icon={ShieldCheck}
                            title="Licensed"
                            description="Take a trivial example, which of us ever undertakes laborious physical to some advantages."
                            alignment="right"
                        />
                        {/* Absolute Positioned Circle */}
                        <div className="absolute top-[65px] right-[-55px] w-[30px] h-[30px] rounded-full bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] flex items-center justify-center z-[10]">
                            <div className="absolute w-2 h-2 group-hover:w-5 group-hover:h-5 rounded-full bg-green-500 scale-100 transition-all duration-500 z-[15]" />
                        </div>
                    </div>
                    <div className="text-gray-100 md:text-8xl text-6xl font-bold">
                        {'«'.repeat(3)}
                    </div>
                    <div className='group'>
                        <FeatureCard
                            Icon={Calendar}
                            title="Flexible Scheduling"
                            description="Moment so blinded by desire, that cannot foresee the pain and trouble are bound to ensue."
                            alignment="right"
                        />
                        {/* Absolute Positioned Circle */}
                        <div className="absolute bottom-[65px] right-[-55px] w-[30px] h-[30px] rounded-full bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] flex items-center justify-center z-[10]">
                            <div className="absolute w-2 h-2 group-hover:w-5 group-hover:h-5 rounded-full bg-green-500 scale-100 transition-all duration-500 z-[15]" />
                        </div>
                    </div>
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
                    <div className="absolute top-[30px] left-0 right-0 text-center text-white/10 text-[100px] font-extrabold leading-[1em] uppercase font-primary">
                        Lamp driving
                    </div>
                    <div className="z-[4] animate-rotateSwing mb-6">
                        <Image src={steeringImg} alt="steering image" className="" />
                    </div>
                </div>

                {/* Right Column */}
                <div className="relative text-left md:w-3/12 flex flex-col justify-between">
                    <div className='group'>
                        <FeatureCard
                            Icon={User2}
                            title="Experienced"
                            description="Take a trivial example, which of us ever undertakes laborious physical to some advantages."
                            alignment="left"
                        />
                        {/* Absolute Positioned Circle */}
                        <div className="absolute top-[65px] left-[-55px] w-[30px] h-[30px] rounded-full bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] flex items-center justify-center z-[10]">
                            <div className="absolute w-2 h-2 group-hover:w-5 group-hover:h-5 rounded-full bg-green-500 scale-100 transition-all duration-500 z-[15]" />
                        </div>
                    </div>
                    <div className="text-gray-100 md:text-8xl text-6xl font-bold">
                        {'»'.repeat(3)}
                    </div>
                    <div className='group'>
                        <FeatureCard
                            Icon={Tag}
                            title="Affordable Rates"
                            description="Enjoy a pleasure that no annoying consequences, or one who avoids a produces."
                            alignment="left"
                        />
                        {/* Absolute Positioned Circle */}
                        <div className="absolute bottom-[65px] left-[-55] w-[30px] h-[30px] rounded-full bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] flex items-center justify-center z-[10]">
                            <div className="absolute w-2 h-2 group-hover:w-5 group-hover:h-5 rounded-full bg-green-500 scale-100 transition-all duration-500 z-[15]" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default WhyChooseUs;
