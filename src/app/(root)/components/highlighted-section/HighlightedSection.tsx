import { FC } from 'react';
import bgImage from "@/assets/home-page-image/image-highlighted-section-bg.jpg";
import { CalendarCheck } from 'lucide-react';
import FeatureBox from './FeatureBox';

const HighlightedSection: FC = () => {
  const featureBoxes = [
    { title: "Licensed Driving School", bgColor: "#23232366" },
    { title: "Professional Instructors", bgColor: "#4D4D4D66" },
    { title: "Flexible Scheduling", bgColor: "#23232366" },
    { title: "Affordable Pricing", bgColor: "#4D4D4D66" },
  ];

  return (
    <div
      style={{ backgroundImage: `url(${bgImage.src})` }}
      className="relative"
    >
      <div className="flex overflow-x-auto md:grid grid-cols-1 lg:grid-cols-4 md:px-28">
        {featureBoxes.map((box, index) => (
          <div key={index} className="relative">
            {/* Skewed Background */}
            <div
              className="flex-shrink-0 w-full md:h-[135px] h-[110px] md:skew-x-[-22deg]"
              style={{ backgroundColor: box.bgColor }}
            />
            {/* Feature Box */}
            <div className="absolute top-0 right-28">
              <FeatureBox Icon={CalendarCheck} title={box.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighlightedSection;
