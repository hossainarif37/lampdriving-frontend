import { FC } from 'react';
import bannerImg from '@/assets/about-page-image/inner-banner-min-2.jpg';
const TestPackageBanner: FC = () => {
    return (
        <>
            <div className=" relative lg:py-40 py-32 bg-cover bg-no-repeat bg-center -z-10" style={{ backgroundImage: `url(${bannerImg.src})` }}>
                <div className="absolute inset-0 bg-primary opacity-50"></div>
                <div className="absolute lg:top-32 top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto">
                    <div className="text-center text-light-green/70">
                        <h1 className="text-xl md:text-4xl font-bold md:mb-5 mb-2 whitespace-nowrap">Book a Driving Test Package Now!</h1>
                        <p className="md:text-xl text-sm text-light-green/60 mb-8">
                            Get a pre-test warm-up lesson before your driving test and use your driving instructors vehicle on the day.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestPackageBanner;