import CarInfoFields from '@/components/shared/forms/CarInfoFields';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hook';
import { IVehicle } from '@/types/instructor';
import { useRouter } from 'next/navigation';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Inputs {
    name: string;
    model: string;
    type: "auto" | "manual";
    rating: string;
}


interface ICarInfoFormProps {
    carImageFile: File | null;
    setCarImageFile: Dispatch<SetStateAction<File | null>>
}



const CarInfoForm: FC<ICarInfoFormProps> = ({ carImageFile, setCarImageFile }) => {
    const [isClicked, setIsClicked] = useState(false);
        const router = useRouter();
    const { instructor } = useAppSelector(state => state.authSlice);

    const defaultValues = {
        name: instructor?.vehicle?.name || '',
        model: instructor?.vehicle?.model || '',
        type: instructor?.vehicle?.type || 'auto',
        rating: instructor?.vehicle?.rating || '',
        image: instructor?.vehicle?.image || ''
    }

    console.log('defaultValues', defaultValues);
    
        // Car Image
    const [carImageURL, setCarImageURL] = useState<string>(instructor?.vehicle?.image || '');
        const [carImageError, setCarImageError] = useState<string>("");
        
    
        const { register, handleSubmit, formState: { errors }, control } = useForm<Inputs>();

        const onSubmit = (data: Inputs) => {
            setIsClicked(true);
            if (!carImageURL) {
                setCarImageError(`${carImageError ? carImageError : 'Car Image is required'}`);
                return;
            }
    
            const carInfo = {
                ...data,
                image: carImageURL
            }
            console.log(carInfo);
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
                <h1 className='text-2xl font-bold text-secondary'>Car Info</h1>
                
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