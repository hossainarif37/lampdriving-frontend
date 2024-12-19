import { FC } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';

const CarInfoForm: FC = () => {
    return (
        <div>
            CarInfoForm

            <div>
                <StepNavigationButtons prev="experience" next="security" />
            </div>
        </div>
    );
};

export default CarInfoForm;