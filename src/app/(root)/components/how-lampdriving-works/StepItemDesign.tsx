import { FC } from 'react';

interface StepItemProps {
  stepNumber: number;
  title: string;
  description: string;
}

const StepItemDesign: FC<StepItemProps> = ({ stepNumber, title, description }) => {
  return (
    <div className="flex gap-3">
      {/* Step Number Circle */}
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary2 text-textCol lg:text-xl flex-shrink-0">
        {stepNumber}
      </div>

      {/* Title and Description */}
      <div>
        <h2 className="text-[#1F2A37] font-semibold text-xl lg:text-2xl">
          {title}
        </h2>
        <p className="text-[#24303f] text-sm lg:w-9/12 tracking-wide lg:leading-6">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepItemDesign;
