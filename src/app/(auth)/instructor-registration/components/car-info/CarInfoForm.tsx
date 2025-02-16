/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';
import { useFieldArray, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useInstructorRegister } from '@/providers/InstructorRegisterProvider';
import CarInfoFields from '@/components/shared/forms/CarInfoFields';
import { IPhoto } from '@/hooks/useImage';
import { IVehicle, IVehicleImages } from '@/types/instructor';
interface ICarInfoFormProps {
    carImages: IVehicleImages[];
    setCarImages: Dispatch<SetStateAction<IVehicleImages[]>>;
}

const CarInfoForm: FC<ICarInfoFormProps> = ({ carImages, setCarImages }) => {
    const router = useRouter();
    const { carInfo, setCarInfo } = useInstructorRegister();

    const form = useForm<IVehicle>({
        defaultValues: {
            images: [
                { id: '', url: carInfo?.images?.[0]?.url || undefined },
                { id: '', url: carInfo?.images?.[1]?.url || undefined },
                { id: '', url: carInfo?.images?.[2]?.url || undefined },
            ]
        },
        mode: 'onChange' // This will trigger validation on each change
    });
    const fieldArray = useFieldArray({ name: 'images', control: form.control });

    const onSubmit = (data: IVehicle) => {
        setCarInfo(data);
        router.push("/instructor-registration?step=security");
    }

    return (
        <div className='md:border md:p-16 md:shadow-lg md:rounded-lg mt-5'>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full flex flex-col'
            >
                <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-primary'>Car Info</h1>
                <CarInfoFields
                    form={form}
                    fieldArray={fieldArray}
                    isRequired={true}
                    defaultValues={carInfo}
                    carImages={carImages}
                    setCarImages={setCarImages}
                />

                <div>
                    <StepNavigationButtons prev="services" next="security" />
                </div>
            </form>
        </div>
    );
};

export default CarInfoForm;