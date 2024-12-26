import { FC } from "react";
import VideoSection from "./VideoSection";
import { Button } from "@/components/ui/button";
import lampdrivingWordImage from "@/assets/home-page-image/illustration-image.png";
import StepsList from "./StepList";
import SectionHeading from "../shared/section-heading/SectionHeading";
import { ChevronRight } from "lucide-react";

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
    <section className="md:py-16 py-14 bg-gradient-to-r from-primary/5 px-4 lg:px-0">
      <SectionHeading
        title="How Lamp Driving Works"
        subtitle="Simple, Trusted & Flexible Booking System"
      />

      <div className="wrapper flex justify-center mx-auto gap-10 flex-col md:flex-row lg:flex-row mt-12">
        <div className="md:w-1/2">
          <div className="w-full flex justify-center">
            <VideoSection
              imageSrc={lampdrivingWordImage.src}
              videoSrc="https://www.youtube.com/embed/d1tf9MMDfWw"
              altText="How Lamp Driving Works"
            />
          </div>
        </div>

        <div className="md:w-1/2">

          <StepsList steps={steps} />
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center lg:mt-10 mt-6">
        <Button className="gradient-color h-12 md:h-14">Start learning to drive now <ChevronRight strokeWidth={3} /> </Button>
      </div>
    </section>
  );
};

export default HowLampdrivingWorkSection;
