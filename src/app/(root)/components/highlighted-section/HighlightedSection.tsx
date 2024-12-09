import { FC } from 'react';
import bgImage from "@/assets/home-page-image/image-highlighted-section-bg.jpg";
import { CalendarCheck, Scale } from 'lucide-react';
import FeatureBox from './FeatureBox';

const HighlightedSection: FC = () => {
  return (
    <div
      className="md:h-[135px] w-full bg-center"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      {/* Content Overlay */}
      <div className="flex overflow-x-auto md:grid grid-cols-1 md:grid-cols-4 md:px-28 md:skew-x-[-22deg]">
        
        {/* First Box */}
        <div className="flex-shrink-0 w-full">
          <FeatureBox
            Icon={Scale}
            title="Licensed Driving School"
            backgroundColor="bg-[#23232366]"
          />
        </div>

        {/* Second Box */}
        <div className="flex-shrink-0 w-full">
          <FeatureBox
            Icon={CalendarCheck}
            title="Licensed Driving School"
            backgroundColor="bg-[#4D4D4D66]"
          />
        </div>

        {/* Third Box */}
        <div className="flex-shrink-0 w-full">
          <FeatureBox
            Icon={CalendarCheck}
            title="Licensed Driving School"
            backgroundColor="bg-[#23232366]"
          />
        </div>

        {/* Fourth Box */}
        <div className="flex-shrink-0 w-full">
          <FeatureBox
            Icon={CalendarCheck}
            title="Licensed Driving School"
            backgroundColor="bg-[#4D4D4D66]"
          />
        </div>
      </div>
    </div>
  );
};

export default HighlightedSection;
