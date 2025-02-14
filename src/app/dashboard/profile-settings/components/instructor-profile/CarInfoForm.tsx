import CarInfoFields from '@/components/shared/forms/CarInfoFields';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useUpdateInstructorMutation } from '@/redux/api/instructorApi/instructorApi';
import { useAppSelector } from '@/redux/hook';
import { IVehicle } from '@/types/instructor';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

interface ICarInfoFormProps {
    instructor: any
}


const CarInfoForm: FC<ICarInfoFormProps> = ({ instructor }) => {
    const form = useForm<IVehicle>({
        defaultValues: {
            ...instructor?.vehicle,
            images: [
                { id: '', url: instructor?.images?.[0]?.url || undefined },
                { id: '', url: instructor?.images?.[1]?.url || undefined },
                { id: '', url: instructor?.images?.[2]?.url || undefined },
            ]
        },
        mode: 'onChange' // This will trigger validation on each change
    });
    const fieldArray = useFieldArray({ name: 'images', control: form.control });

    // Car Image
    const [carImageURL, setCarImageURL] = useState<string>(instructor?.vehicle?.image || '');
    const [carImageError, setCarImageError] = useState<string>("");


    const { register, handleSubmit, formState: { errors }, control } = useForm<IVehicle>();
    const [updateInstructor, { isLoading: isUpdating }] = useUpdateInstructorMutation();

    const onSubmit = (data: IVehicle) => {
        if (!carImageURL) {
            setCarImageError(`${carImageError ? carImageError : 'Car Image is required'}`);
            return;
        }

        updateInstructor({ vehicle: data }).unwrap()
            .then((res) => {
                toast({ message: res.message })
            })
            .catch((error) => {
                console.error('Failed to update profile:', error);
                toast({ success: false, message: error.data.message as string || 'Failed to update profile.' });
            })
    }

    return (
        <div className=''>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <h1 className='text-2xl font-bold text-primary'>Car Info</h1>

                <CarInfoFields
                    form={form}
                    fieldArray={fieldArray}
                />

                <Button type='submit' className='w-full mt-7 gradient-color h-12'>Save</Button>
            </form>
        </div>
    );
};

export default CarInfoForm;