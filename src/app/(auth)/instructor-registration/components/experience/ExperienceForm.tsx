import { FC } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';

const ExperienceForm: FC = () => {
    return (
        <div>
            ExperienceForm

            <div>
                <StepNavigationButtons prev="personal-info" next="car-info" />
            </div>
        </div>
    );
};

export default ExperienceForm;