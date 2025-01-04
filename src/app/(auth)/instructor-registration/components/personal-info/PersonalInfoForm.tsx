/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, FC, SetStateAction, useContext } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import PersonalInfoFields from '@/components/shared/forms/PersonalInfoFields';
import { useInstructorRegister } from '@/providers/InstructorRegisterProvider';
import { IPersonalInfo } from '@/types/instructor';

// interface IPersonalInfoFormProps {
//     personalInfo: IPersonalInfo | undefined;
//     setPersonalInfo: Dispatch<SetStateAction<IPersonalInfo | undefined>>;
// }

const PersonalInfoForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<IPersonalInfo>();
    const router = useRouter();
    const { setPersonalInfo, personalInfo } = useInstructorRegister();
    const onSubmit = (data: IPersonalInfo) => {
        setPersonalInfo(data);
        router.push("/instructor-registration?step=experience");
    };

    return (
        <div className='border p-5 md:p-16 md:shadow-lg md:rounded-lg mt-5'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <h1 className='text-2xl md:text-3xl font-bold text-secondary'>Personal Info</h1>
                <PersonalInfoFields
                    register={register}
                    errors={errors}
                    defaultValues={personalInfo}
                    control={control}
                    isRequired={true}
                />
                <div>
                    <StepNavigationButtons prev="" next="experience" />
                </div>
            </form>
        </div>
    );
};

export default PersonalInfoForm;