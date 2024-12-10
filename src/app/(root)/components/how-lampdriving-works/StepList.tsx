
import { FC } from "react";
import StepItem from "./StepItemDesign";

interface Step {
  stepNumber: number;
  title: string;
  description: string;
}

interface StepsListProps {
  steps: Step[];
}

const StepsList: FC<StepsListProps> = ({ steps }) => {
  return (
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
  );
};

export default StepsList;
