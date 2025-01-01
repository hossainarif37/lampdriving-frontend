import PersonalInfoFields, { IPersonalInfoInputs } from '@/components/shared/forms/PersonalInfoFields';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import UpdatePassword from '../shared-profile/UpdatePassword';
import { Button } from '@/components/ui/button';

const PersonalInfoForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<IPersonalInfoInputs>();
    const router = useRouter();

    const onSubmit = (data: IPersonalInfoInputs) => {
        console.log(data);
    };
    
    return (
        <div className='my-5'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <h1 className='text-2xl md:text-3xl font-bold text-secondary'>Personal Info</h1>
                <PersonalInfoFields
                    register={register}
                    errors={errors}
                    control={control}
                    isRequired={true}
                />

                <Button type='submit' className='w-full mt-7 gradient-color h-12'>Save</Button>
            </form>
        </div>
    );
};

export default PersonalInfoForm;