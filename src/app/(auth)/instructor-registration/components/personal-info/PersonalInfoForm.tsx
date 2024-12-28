/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, FC, SetStateAction } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { IPersonalInfo } from '../InstructorRegistration';
import { genderOptions } from '@/constant/gender';
import PersonalInfoFields from '@/components/shared/forms/PersonalInfoFields';




interface IPersonalInfoFormProps {
    personalInfo: IPersonalInfo | undefined;
    setPersonalInfo: Dispatch<SetStateAction<IPersonalInfo | undefined>>;
}

const PersonalInfoForm: FC<IPersonalInfoFormProps> = ({ personalInfo, setPersonalInfo }) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<IPersonalInfo>();
    const router = useRouter();

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
                    personalInfo={personalInfo}
                    control={control}
                />
                <div>
                    <StepNavigationButtons prev="" next="experience" />
                </div>
            </form>
        </div>
    );
};

export default PersonalInfoForm;