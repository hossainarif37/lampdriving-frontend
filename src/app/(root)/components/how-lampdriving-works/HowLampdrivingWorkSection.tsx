import { FC } from "react";
import VideoSection from "./VideoSection";
import { Button } from "@/components/ui/button";
import lampdrivingWordImage from "@/assets/home-page-image/image-how-lampdriving-work.png";
import StepsList from "./StepList";
import SectionHeading from "../shared/section-heading/SectionHeading";

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
    <section className="my-16 px-4 lg:px-0">
      <SectionHeading
        title="How Lamp Driving Works"
        subtitle="Simple, Trusted & Flexible Booking System"
      />

      <div className="wrapper flex lg:justify-between gap-10 flex-col lg:flex-row mt-12">
        <VideoSection
          imageSrc={lampdrivingWordImage.src}
          videoSrc="https://www.youtube.com/embed/d1tf9MMDfWw"
          altText="How Lamp Driving Works"
        />

        <StepsList steps={steps} />
      </div>

      {/* CTA Button */}
      <div className="text-center lg:mt-10 mt-6">
        <Button className="bg-primary">Start learning to drive now</Button>
      </div>
    </section>
  );
};

export default HowLampdrivingWorkSection;
