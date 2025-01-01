import CarInfoFields from '@/components/shared/forms/CarInfoFields';
import { Button } from '@/components/ui/button';
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
    carInfo: IVehicle | undefined;
    setCarInfo: Dispatch<SetStateAction<IVehicle | undefined>>
    carImageFile: File | null;
    setCarImageFile: Dispatch<SetStateAction<File | null>>
}



const CarInfoForm: FC<ICarInfoFormProps> = ({carInfo, setCarInfo, carImageFile, setCarImageFile}) => {
    const [isClicked, setIsClicked] = useState(false);
        const router = useRouter();
    
        // Car Image
        const [carImageURL, setCarImageURL] = useState<string>(carInfo?.image || '');
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
            setCarInfo(carInfo);
    
            router.push("/instructor-registration?step=security");
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
        <div className='my-5'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <h1 className='text-2xl md:text-3xl font-bold text-secondary'>Experience</h1>
                
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
                    defaultValues={carInfo}
                />

                <Button type='submit' className='w-full mt-7 gradient-color h-12'>Save</Button>
            </form>
        </div>
    );
};

export default CarInfoForm;