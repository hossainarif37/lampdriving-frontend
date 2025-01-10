/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FileUpload from '@/components/shared/FileUpload';
import { useRouter } from 'next/navigation';
import { IVehicle } from '@/types/instructor';
import CarInfoFields from '@/components/shared/forms/CarInfoFields';
import { useInstructorRegister } from '@/providers/InstructorRegisterProvider';


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

const carTypes = [
    "Auto",
    "Manual"
]

const CarInfoForm: FC<ICarInfoFormProps> = ({ carImageFile, setCarImageFile }) => {
    const [isClicked, setIsClicked] = useState(false);
    const router = useRouter();
    const { carInfo, setCarInfo } = useInstructorRegister();

    // Car Image
    const [carImageURL, setCarImageURL] = useState<string>(carInfo?.image || '');
    const [carImageError, setCarImageError] = useState<string>("");


    const { register, handleSubmit, formState: { errors }, control } = useForm<Inputs>();

    const removeCarImage = () => {
        setCarImageFile(null);
        setCarImageURL('');
    };

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
        <div className='border p-5 md:p-16 md:shadow-lg md:rounded-lg mt-5'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full flex flex-col'
            >
                <h1 className='text-2xl md:text-3xl font-bold text-primary'>Car Info</h1>
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

                <div>
                    <StepNavigationButtons prev="services" next="security" />
                </div>
            </form>
        </div>
    );
};

export default CarInfoForm;