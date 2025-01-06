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
      <div className="w-8 h-8 flex items-center justify-center rounded-full gradient-color text-light lg:text-xl flex-shrink-0">
        {stepNumber}
      </div>

      {/* Title and Description */}
      <div>
        <h2 className="text-secondary font-semibold text-xl lg:text-2xl">
          {title}
        </h2>
        <p className="text-accent text-sm lg:w-10/12 tracking-wide lg:leading-6">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepItemDesign;
