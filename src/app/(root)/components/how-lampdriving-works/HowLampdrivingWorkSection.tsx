import Image from 'next/image';
import { FC } from 'react';
import lampdrivingWordImage from '@/assets/home-page-image/image-how-lampdriving-work.png';
import StepItem from './StepItem';
import { Button } from '@/components/ui/button';
import { CirclePlay } from 'lucide-react';

const steps = [
  {
    stepNumber: 1,
    title: "Find Your Driving Instructors",
    description:
      "Choose from a wide variety of instructors in your area. Check rating & reviews from real learners.",
  },
  {
    stepNumber: 2,
    title: "Book Your Driving Lessons",
    description:
      "Choose from a wide variety of instructors in your area. Check rating & reviews from real learners.",
  },
  {
    stepNumber: 3,
    title: "Learn to Drive",
    description:
      "Choose from a wide variety of instructors in your area. Check rating & reviews from real learners.",
  },
];

const HowLampdrivingWorkSection: FC = () => {
  return (
    <section className="my-44 px-4 lg:px-0">
      {/* Section Heading */}
      <div className="text-center flex flex-col lg:gap-2">
        <h1 className="text-[#1F2A37] font-semibold lg:text-3xl text-2xl mb-1">How Lamp Driving Works</h1>
        <p className="lg:text-xl text-[#24303f] lg:tracking-widest tracking-wide w-2/3 mx-auto">
          Simple, Trusted & Flexible Booking System
        </p>
      </div>

      <div className="wrapper flex lg:justify-between gap-10 flex-col lg:flex-row mt-12">
        {/* Image Section */}
        <div className="relative">
          <Image
            src={lampdrivingWordImage.src}
            alt="How Lamp Driving Works"
            width={400}
            height={400}
            priority={false}
          />
          <div className="flex items-center text-secondary absolute top-[128px] left-[125px] cursor-pointer">
            <p className="w-14 h-14 rounded-full bg-primary2 flex justify-center items-center z-50 shadow-lg">
              <CirclePlay className="w-8 h-8" />
            </p>
            <Button className="bg-primary2 rounded-full h-12 ml-[-32px] z-0 text-secondary hover:bg-primary2">
              Play video
            </Button>
          </div>
        </div>

        {/* Steps Section */}
        <div className="flex flex-col gap-5 lg:gap-10">
          {steps.map((step) => (
            <StepItem
              key={step.stepNumber}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>

      <div className="text-center lg:mt-10 mt-6">
        <Button className="bg-primary2">Start learning to drive now</Button>
      </div>
    </section>
  );
};

export default HowLampdrivingWorkSection;
