/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FileUpload from '@/components/shared/FileUpload';
import { useRouter } from 'next/navigation';


interface Inputs {
    name: string;
    model: string;
    type: "auto" | "manual";
    rating: string;
}

const carTypes = [
    "Auto",
    "Manual"
]

const CarInfoForm: FC = () => {
    const [isClicked, setIsClicked] = useState(false);
    const router = useRouter();

    // Car Image
    const [carImageURL, setCarImageURL] = useState<string>("");
    const [carImageError, setCarImageError] = useState<string>("");
    const [carImageFile, setCarImageFile] = useState<File | null>(null);

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
        console.log(carInfo);

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
                <h1 className='text-2xl md:text-3xl font-bold text-secondary'>Car Info</h1>
                <div className='w-full mt-7'>
                    <div className='flex flex-col gap-5'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            {/* Brand Name */}
                            <div className='w-full'>
                                <label htmlFor="brand-name" className='font-semibold text-secondary'>Brand Name</label>
                                <Input
                                    {...register('name', {
                                        required: "Brand name is required"
                                    })
                                    }
                                    type="text" id='brand-name' placeholder="Enter brand name" className='h-11 xl:h-14 mt-1'
                                />
                                {errors?.name && <p className='text-red-500 text-sm mt-1'>{errors?.name?.message}</p>}
                            </div>

                            {/* Car Model */}
                            <div className='w-full'>
                                <label htmlFor="model" className='font-semibold text-secondary'>Model</label>
                                <Input
                                    {...register('model', {
                                        required: "Model is required"
                                    })
                                    }
                                    type="text" id="model" placeholder="Enter car model" className='h-11 xl:h-14 mt-1'
                                />
                                {errors?.model && <p className='text-red-500 text-sm mt-1'>{errors?.model?.message}</p>}
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            {/* Cart Type */}
                            <div>
                                <label className="font-semibold text-secondary">Type</label>
                                <Controller
                                    name="type"
                                    control={control}
                                    rules={{ required: "Type is required" }}
                                    // defaultValue=""
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value || ''}>
                                            <SelectTrigger className="h-11 xl:h-14 mt-1">
                                                <SelectValue className="placeholder:text-[#00000012]" placeholder="Select Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    carTypes.map((type, i) => (
                                                        <SelectItem key={i} value={type.toLowerCase()}>
                                                            {type}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                {errors?.type && <p className='text-red-500 text-sm mt-1'>{errors?.type?.message}</p>}
                            </div>

                            {/* Car Rating */}
                            <div>
                                <label htmlFor="rating" className='font-semibold text-secondary'>Rating</label>
                                <Input
                                    {...register('rating', {
                                        required: "Rating is required",
                                        max: { value: 5, message: "Rating should be less than 5" }
                                    })
                                    }
                                    type="number" id="rating" placeholder="Enter car rating" className='h-11 xl:h-14 mt-1'
                                />
                                {errors?.rating && <p className='text-red-500 text-sm mt-1'>{errors?.rating?.message}</p>}
                            </div>
                        </div>

                        {/* Car Image */}
                        <div className='w-full space-y-1'>
                            <label htmlFor="first-name" className='font-semibold text-secondary'>Car Image</label>
                            <FileUpload
                                label="Click 1 file to upload"
                                maxSize="1500x1500px"
                                imageUrl={carImageURL}
                                setImageUrl={setCarImageURL}
                                setImageError={setCarImageError}
                                selectedFile={carImageFile}
                                setSelectedFile={setCarImageFile}
                                removeImage={removeCarImage}
                            />
                            {carImageError && <p className='text-red-500 text-sm mt-1'>{carImageError}</p>}
                        </div>
                    </div>
                </div>

                <div>
                    <StepNavigationButtons prev="experience" next="security" />
                </div>
            </form>
        </div>
    );
};

export default CarInfoForm;