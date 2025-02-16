import { Input } from '@/components/ui/input';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Controller, FieldErrors, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IVehicle, IVehicleImages } from '@/types/instructor';
import { getPublicIdFromUrl } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Check, Image as ImageIcon, Upload, X } from 'lucide-react';
import { uploadFile } from '@/api/uploadFile';
import Image from 'next/image';
import ConfirmationModal from '../ConfirmationModal';
import { deleteFile } from '@/api/deleteFile';

interface ICarInfoFieldsProps {
    form: UseFormReturn<IVehicle>;
    fieldArray: UseFieldArrayReturn<IVehicle, 'images'>;
    carImages?: IVehicleImages[];
    setCarImages?: Dispatch<SetStateAction<IVehicleImages[]>>;
    defaultValues?: IVehicle | undefined;
    isRequired?: boolean;
}

const carTypes = ["auto", "manual"];

const CarInfoFields: FC<ICarInfoFieldsProps> = ({ form, fieldArray, carImages, setCarImages, defaultValues, isRequired }) => {
    const [imageUploadLoading, setImageUploadLoading] = useState<{ [key: number]: boolean }>({});
    const [imageRemoveLoading, setImageRemoveLoading] = useState(false);
    const errors = form?.formState?.errors as FieldErrors<IVehicle>;
    const [modalStates, setModalStates] = useState<{ isOpen: boolean; indexToDelete: number | null; urlToDelete: string | null }>({ isOpen: false, indexToDelete: null, urlToDelete: null });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageUploadLoading(prev => ({ ...prev, [index]: true }));

        try {
            if (!file) {
                throw new Error('No file selected.');
            }
            const url = await uploadFile(file);

            fieldArray.update(index, {
                id: fieldArray.fields[index].id,
                url: url
            });

            form.setValue(`images.${index}.url`, url, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true
            });

            if (setCarImages) {
                setCarImages(prevImages => {
                    const updatedImages = [...prevImages];
                    updatedImages[index] = { ...updatedImages[index], url: url };
                    return updatedImages;
                });
            }

            setTimeout(() => {
                form.clearErrors(`images.${index}.url`);
            }, 0);

        } catch (error) {
            console.error('Error uploading image:', error);
            form.setError(`images.${index}.url`, { type: 'manual', message: 'Failed to upload image' });
        } finally {
            setImageUploadLoading(prev => ({ ...prev, [index]: false }));
        }
    };

    const openDeleteModal = (index: number, url: string) => setModalStates({ isOpen: true, indexToDelete: index, urlToDelete: url });
    const closeDeleteModal = () => setModalStates({ isOpen: false, indexToDelete: null, urlToDelete: null });

    const handleDeleteImage = async () => {
        const { indexToDelete, urlToDelete } = modalStates;
        if (indexToDelete === null || !urlToDelete) {
            closeDeleteModal();
            return;
        }

        try {
            setImageRemoveLoading(true);
            await deleteFile(getPublicIdFromUrl(urlToDelete)!);

            fieldArray.update(indexToDelete, { url: '' });
            form.setValue(`images.${indexToDelete}.url`, '', { shouldValidate: true, shouldDirty: true });

            if (setCarImages) {
                setCarImages(prevImages => {
                    const updatedImages = [...prevImages];
                    updatedImages[indexToDelete] = { ...updatedImages[indexToDelete], url: '' };
                    return updatedImages;
                });
            }

        } catch (error) {
            console.error('Error deleting image:', error);
            form.setError(`images.${indexToDelete}.url`, { type: 'manual', message: 'Failed to delete image' });
        } finally {
            setImageRemoveLoading(false);
            closeDeleteModal();
        }
    };

    console.log('Errors:', errors);
    console.log('Car Images:', carImages);
    console.log('Fields:', fieldArray.fields);
    console.log('Values:', form.getValues());

    return (
        <div className='w-full mt-7'>
            <div className='flex flex-col gap-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {/* Brand Name */}
                    <div className='w-full'>
                        <label htmlFor="brand-name" className='font-semibold text-primary'>Brand Name</label>
                        <Input
                            {...form.register('name', {
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
                            {...form.register('model', {
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
                            {...form.register('year', {
                                required: "Year is required",
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
                            control={form.control}
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
                        {...form.register('rating', {
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
                <div className='flex gap-5'>
                    <div className='w-full space-y-1'>
                        {/* Car Images */}
                        <div className='w-full gap-5'>
                            <div className="space-y-4">
                                <label>Car Images</label>
                                <Card className="p-4">
                                    {fieldArray.fields.map((field, index) => (
                                        <div key={field.id} className="space-y-4">
                                            <div className="space-y-2">
                                                <Controller
                                                    name={`images.${index}.url`}
                                                    control={form.control}
                                                    rules={{ required: `Image ${index + 1} is required` }}
                                                    render={({ field: { onChange, value, ...rest } }) => (
                                                        <Input
                                                            {...rest}
                                                            type="file"
                                                            id={`image-${index}`}
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                handleFileChange(e, index);
                                                            }}
                                                            className="hidden"
                                                        />
                                                    )}
                                                />

                                                <div className='flex justify-between border border-dashed px-6 py-5'>
                                                    <div className='w-16 h-16 rounded-lg overflow-hidden shadow border flex items-center justify-center text-accent'>
                                                        {(field.url && typeof field.url === 'string') ? (
                                                            <Image src={field.url} alt="Car Image" width={100} height={100} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <ImageIcon size={30} />
                                                        )}
                                                    </div>

                                                    <div className="flex text-sm text-muted-foreground mt-2">
                                                        {(field.url && typeof field.url === 'string') ? (
                                                            <div className="px-3 flex items-center text-green-500 font-semibold gap-2">
                                                                <Check width={18} height={18} />
                                                                <span className="text-[15px]">Uploaded</span>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                disabled={imageUploadLoading[index]}
                                                                onClick={() => document.getElementById(`image-${index}`)?.click()}
                                                                className="px-3 flex items-center gap-2 text-accent"
                                                            >
                                                                <Upload width={16} height={16} />
                                                                <span className="text-[15px]">
                                                                    {imageUploadLoading[index] ? 'Uploading...' : 'Upload'}
                                                                </span>
                                                            </button>
                                                        )}

                                                        {(field.url && typeof field.url === 'string') && (
                                                            <button className="text-accent" type="button" onClick={() => openDeleteModal(index, field.url as string)}>
                                                                <X width={20} height={20} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {errors.images?.[index]?.url && <p className="text-sm text-red-500">{errors.images?.[index]?.url?.message}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </Card>
                                <ConfirmationModal onConfirm={handleDeleteImage} isOpen={modalStates.isOpen} setIsOpen={(isOpen) => !isOpen && closeDeleteModal()} isLoading={imageRemoveLoading} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarInfoFields;