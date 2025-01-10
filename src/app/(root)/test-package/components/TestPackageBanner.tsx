import { FC } from 'react';
import bannerImg from '@/assets/about-page-image/inner-banner-min-2.jpg';
const TestPackageBanner: FC = () => {
    return (
        <>
            <div className=" relative lg:py-40 py-36 bg-cover bg-no-repeat bg-center -z-10" style={{ backgroundImage: `url(${bannerImg.src})` }}>
                {/* <div className="absolute inset-0 bg-primary opacity-40"></div> */}
                <div className="absolute lg:top-32 top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto px-4">
                    <div className="text-center text-light-green/70">
                        <h1 className="text-2xl md:text-4xl font-bold mb-5 whitespace-nowrap">Book a Driving Test Package Now!</h1>
                        <p className="text-xl text-light-green/60 mb-8 hidden md:block">
                            Get a pre-test warm-up lesson before your driving test and use your driving instructors vehicle on the day.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestPackageBanner;