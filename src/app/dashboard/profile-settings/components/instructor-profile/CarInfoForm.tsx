import CarInfoFields from '@/components/shared/forms/CarInfoFields';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useUpdateInstructorMutation } from '@/redux/api/instructorApi/instructorApi';
import { useAppSelector } from '@/redux/hook';
import { IVehicle } from '@/types/instructor';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Inputs {
    name: string;
    model: string;
    type: "auto" | "manual";
    rating: number;
    year: number;
}


interface ICarInfoFormProps {
    carImageFile: File | null;
    setCarImageFile: Dispatch<SetStateAction<File | null>>,
    instructor: any
}


const CarInfoForm: FC<ICarInfoFormProps> = ({ carImageFile, setCarImageFile, instructor }) => {
    const [isClicked, setIsClicked] = useState(false);

    const defaultValues: IVehicle = {
        name: instructor?.vehicle?.name,
        model: instructor?.vehicle?.model,
        type: instructor?.vehicle?.type,
        rating: instructor?.vehicle?.rating,
        image: instructor?.vehicle?.image,
        year: instructor?.vehicle?.year
    }

    // Car Image
    const [carImageURL, setCarImageURL] = useState<string>(instructor?.vehicle?.image || '');
    const [carImageError, setCarImageError] = useState<string>("");


    const { register, handleSubmit, formState: { errors }, control } = useForm<Inputs>();
    const [updateInstructor, { isLoading: isUpdating }] = useUpdateInstructorMutation();

    const onSubmit = (data: Inputs) => {
        setIsClicked(true);
        if (!carImageURL) {
            setCarImageError(`${carImageError ? carImageError : 'Car Image is required'}`);
            return;
        }

        const carInfo = {
            name: data.name,
            model: data.model,
            type: data.type,
            rating: Number(data.rating),
            year: Number(data.year),
            image: carImageURL
        }

        updateInstructor({ vehicle: carInfo }).unwrap()
            .then((res) => {
                console.log('res', res);
                toast({ message: res.message })
            })
            .catch((error) => {
                console.error('Failed to update profile:', error);
                toast({ success: false, message: error.data.message as string || 'Failed to update profile.' });
            })
    }

    useEffect(() => {
        if (isClicked) {
            if (carImageURL) {
                setCarImageError('');
            } else {
                setCarImageError(`${carImageFile ? 'Upload Car Image' : 'Car Image is required'}`);
            }
        }
    }, [carImageFile, carImageURL, isClicked]);
    return (
        <div className=''>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <h1 className='text-2xl font-bold text-primary'>Car Info</h1>

                <CarInfoFields
                    register={register}
                    errors={errors}
                    control={control}
                    isRequired={true}
                    carImageError={carImageError}
                    setCarImageFile={setCarImageFile}
                    setCarImageURL={setCarImageURL}
                    carImageURL={carImageURL}
                    setCarImageError={setCarImageError}
                    carImageFile={carImageFile}
                    defaultValues={defaultValues}
                />

                <Button type='submit' className='w-full mt-7 gradient-color h-12'>Save</Button>
            </form>
        </div>
    );
};

export default CarInfoForm;