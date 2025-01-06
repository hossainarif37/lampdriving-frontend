import Image from 'next/image';
import { FC } from 'react';
import steeringImg from "@/assets/about-page-image/steering.png"

const WhyChooseUs: FC = () => {
    return (
        <div className='min-h-screen'>
            <div className="relative flex flex-col items-center justify-end max-w-[555px] h-[500px] mx-auto overflow-hidden bg-[#04bf61] z-[1]"
            >
                <div className=" before:absolute before:left-[-130px] before:right-[-130px] before:bottom-[-510px] before:h-[570px] before:bg-white before:rounded-full before:z-[100] w-full" />


                <div className=" before:absolute before:top-[-510px] before:left-[-130px] before:right-[-130px] before:h-[570px] before:bg-white before:z-[2] before:rounded-full" />

                <div className="absolute top-[30px] left-0 right-0 text-center text-white/10 text-[100px] font-extrabold leading-[1em] uppercase font-secondary">
                    Lamp driving
                </div>

                <div className='z-[3]'>
                    <Image src={steeringImg} alt='steeing image' className='' />
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;