import { FC } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';

const ServicesForm: FC = () => {
    return (
        <div>
            ServicesForm

            <div>
                <StepNavigationButtons prev="personal-info" next="car-info" />
            </div>
        </div>
    );
};

export default ServicesForm;