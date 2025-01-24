import { Dispatch, FC, SetStateAction } from 'react';
import FileUpload from '../FileUpload';
import { Input } from '@/components/ui/input';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IVehicle } from '@/types/instructor';

interface Inputs {
    name: string;
    model: string;
    type: "auto" | "manual";
    rating: number;
    year: number;
}

const carTypes = [
    "Auto",
    "Manual"
]

interface ICarInfoFieldsProps {
    register: UseFormRegister<Inputs>;
    control: Control<Inputs>;
    errors: FieldErrors<Inputs>;
    defaultValues?: IVehicle | undefined;
    setCarImageFile: Dispatch<SetStateAction<File | null>>;
    setCarImageURL: Dispatch<SetStateAction<string>>;
    carImageURL: string;
    setCarImageError: Dispatch<SetStateAction<string>>;
    carImageFile: File | null;
    carImageError: string;
    isRequired: boolean
}

const CarInfoFields: FC<ICarInfoFieldsProps> = ({ register, control, errors, defaultValues, setCarImageFile, setCarImageURL, carImageURL, setCarImageError, carImageFile, carImageError, isRequired }) => {
    const removeCarImage = () => {
        setCarImageFile(null);
        setCarImageURL('');
    };
    return (
        <div className='w-full mt-7'>
            <div className='flex flex-col gap-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {/* Brand Name */}
                    <div className='w-full'>
                        <label htmlFor="brand-name" className='font-semibold text-primary'>Brand Name</label>
                        <Input
                            {...register('name', {
                                required: "Brand name is required"
                            })
                            }
                            defaultValue={defaultValues?.name}
                            type="text" id='brand-name' placeholder="Enter brand name" className='h-11 xl:h-14 mt-1'
                        />
                        {errors?.name && <p className='text-red-500 text-sm mt-1'>{errors?.name?.message}</p>}
                    </div>

                    {/* Car Model */}
                    <div className='w-full'>
                        <label htmlFor="model" className='font-semibold text-primary'>Model</label>
                        <Input
                            {...register('model', {
                                required: "Model is required"
                            })
                            }
                            defaultValue={defaultValues?.model}
                            type="text" id="model" placeholder="Enter car model" className='h-11 xl:h-14 mt-1'
                        />
                        {errors?.model && <p className='text-red-500 text-sm mt-1'>{errors?.model?.message}</p>}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {/* Car Manufacture Year */}
                    <div>
                        <label htmlFor="year" className='font-semibold text-primary'>Manufacture Year</label>
                        <Input
                            {...register('year', {
                                required: {
                                    value: isRequired,
                                    message: "Year is required",
                                },
                                max: {
                                    value: new Date().getFullYear(),
                                    message: "Year should be less than current year"
                                },
                                min: {
                                    value: new Date().getFullYear() - 10,
                                    message: "Year should be greater than 10 years ago"
                                }
                            })}
                            defaultValue={defaultValues?.year}
                            type="number"
                            placeholder="Enter Manufacture Year"
                            className='h-11 xl:h-14 mt-1'
                        />
                        {errors?.year && <p className='text-red-500 text-sm mt-1'>{errors.year.message}</p>}
                    </div>

                    {/* Car Type */}
                    <div>
                        <label className="font-semibold text-primary">Type</label>
                        <Controller
                            name="type"
                            control={control}
                            rules={{ required: "Type is required" }}
                            defaultValue={defaultValues?.type}
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
                </div>

                {/* Car Rating */}
                <div>
                    <label htmlFor="rating" className='font-semibold text-primary'>Rating</label>
                    <Input
                        {...register('rating', {
                            required: "Rating is required",
                            max: { value: 5, message: "Rating should be less than 5" }
                        })
                        }
                        defaultValue={defaultValues?.rating}
                        type="number" id="rating" placeholder="Enter car rating" className='h-11 xl:h-14 mt-1'
                    />
                    {errors?.rating && <p className='text-red-500 text-sm mt-1'>{errors?.rating?.message}</p>}
                </div>

                {/* Car Image */}
                <div className='w-full space-y-1'>
                    <label htmlFor="first-name" className='font-semibold text-primary'>Car Image</label>
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
    );
};

export default CarInfoFields;