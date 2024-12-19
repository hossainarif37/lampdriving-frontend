import { FC } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';

const PersonalInfoForm: FC = () => {
    return (
        <div>
            PersonalInfoForm
            <div>
                <StepNavigationButtons prev="" next="experience" />
            </div>
        </div>
    );
};

export default PersonalInfoForm;