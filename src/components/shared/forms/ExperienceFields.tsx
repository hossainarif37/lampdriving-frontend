import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Textarea } from '@/components/ui/textarea';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Control, Controller, FieldErrors, UseFieldArrayReturn, UseFormRegister, UseFormReturn, UseFormSetError, UseFormSetValue } from 'react-hook-form';
import FileUpload from '../FileUpload';
import { languageList } from '@/constant/languageList';
import { IExperience, IExperienceCertificate } from '@/types/instructor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { months } from '@/constant/months';
import { getPublicIdFromUrl, getYears } from '@/lib/utils';
import { IPhoto } from '@/hooks/useImage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Image as ImageIcon, PlusCircle, Upload, X } from 'lucide-react';
import { uploadFile } from '@/api/uploadFile';
import Image from 'next/image';
import ConfirmationModal from '../ConfirmationModal';
import { deleteFile } from '@/api/deleteFile';


interface IExperienceFieldsProps {
    form: UseFormReturn<IExperience>;
    fieldArray: UseFieldArrayReturn<IExperience, 'documents.experienceCertificates'>;
    instructorLicense: IPhoto;
    setInstructorLicense: Dispatch<SetStateAction<IPhoto>>;
    drivingLicense: IPhoto;
    setDrivingLicense: Dispatch<SetStateAction<IPhoto>>;
    experienceCertificates?: IExperienceCertificate[];
    setExperienceCertificates?: Dispatch<SetStateAction<IExperienceCertificate[]>>;
    defaultValues?: IExperience | undefined;
    setDefaultValues?: Dispatch<SetStateAction<IExperience | undefined>>;
    isRequired?: boolean;
    selectedLanguages: string[];
    setSelectedLanguages: Dispatch<SetStateAction<string[]>>;
}

const ExperienceFields: FC<IExperienceFieldsProps> = ({ defaultValues, setDefaultValues, isRequired, selectedLanguages, setSelectedLanguages, form, instructorLicense, setInstructorLicense, drivingLicense, setDrivingLicense, experienceCertificates, setExperienceCertificates, fieldArray }) => {
    const [imageUploadLoading, setImageUploadLoading] = useState<{ [key: number]: boolean }>({});
    const [imageRemoveLoading, setImageRemoveLoading] = useState(false);
    const errors = form?.formState?.errors as FieldErrors<IExperience>;
    // Track modal state for each certificate
    const [modalStates, setModalStates] = useState<{
        isOpen: boolean;
        indexToDelete: number | null;
        urlToDelete: string | null;
    }>({
        isOpen: false,
        indexToDelete: null,
        urlToDelete: null
    });

    const certificateType1Exist = form.watch('documents.experienceCertificates.0.experienceType');
    const certificateType2Exist = form.watch('documents.experienceCertificates.1.experienceType');

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];

        try {
            if (!file) {
                throw new Error('No file selected.');
            }

            setImageUploadLoading(prev => ({ ...prev, [index]: true }));
            const url = await uploadFile(file);

            // Update the field while preserving the existing type
            const currentType = form.getValues(`documents.experienceCertificates.${index}.experienceType`);


            fieldArray.update(index, {
                experienceType: currentType, // Use the current type value from the form
                url: url
            });

            // Update form value for URL only
            form.setValue(`documents.experienceCertificates.${index}.url`, url, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true
            });


            if (setExperienceCertificates) {
                // Update experience certificates state while preserving type
                setExperienceCertificates(prevCertificates => {
                    const updatedCertificates = [...prevCertificates];
                    updatedCertificates[index] = {
                        ...updatedCertificates[index],
                        experienceType: currentType,
                        url: url
                    };
                    return updatedCertificates;
                });
            }


            // Clear any existing errors
            form.clearErrors(`documents.experienceCertificates.${index}.url`);

        } catch (error) {
            console.error('Error uploading image:', error);
            form.setError(`documents.experienceCertificates.${index}.url`, {
                type: 'manual',
                message: 'Failed to upload image'
            });
        } finally {
            // Clear loading state for specific index
            setImageUploadLoading(prev => ({ ...prev, [index]: false }));
        }
    };

    const openDeleteModal = (index: number, url: string) => {
        setModalStates({
            isOpen: true,
            indexToDelete: index,
            urlToDelete: url
        });
    };

    const closeDeleteModal = () => {
        setModalStates({
            isOpen: false,
            indexToDelete: null,
            urlToDelete: null
        });
    };

    const handleDeleteImage = async () => {
        const { indexToDelete, urlToDelete } = modalStates;

        if (indexToDelete === null || !urlToDelete) {
            closeDeleteModal();
            return;
        }

        try {
            setImageRemoveLoading(true);

            const publicId = getPublicIdFromUrl(urlToDelete);

            if (!publicId) {
                throw new Error('Invalid image public ID.');
            }

            await deleteFile(publicId);

            // Keep the type but clear the URL for the specific index
            const currentType = form.getValues(`documents.experienceCertificates.${indexToDelete}.experienceType`);

            fieldArray.update(indexToDelete, {
                experienceType: currentType,
                url: ''
            });

            form.setValue(`documents.experienceCertificates.${indexToDelete}.url`, '', {
                shouldValidate: true,
                shouldDirty: true
            });

        } catch (error) {
            console.error('Error deleting image:', error);
            form.setError(`documents.experienceCertificates.${indexToDelete}.url`, {
                type: 'manual',
                message: 'Failed to delete image'
            });
        } finally {
            setImageRemoveLoading(false);
            fieldArray.remove(indexToDelete);
            closeDeleteModal();
        }
    };

    console.log(errors.documents?.experienceCertificates?.[0]?.experienceType?.message);

    return (
        <div className='w-full mt-7'>
            <div className='flex flex-col gap-5'>
                <div className='w-full'>
                    <label htmlFor="experience" className='font-semibold text-primary'>Instructing Experience</label>
                    <div className='flex gap-5'>
                        <div className='w-full'>
                            <Controller
                                name="experience.month"
                                control={form.control}
                                defaultValue={defaultValues?.experience?.month}
                                rules={{ required: "Month is required" }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value || ''}>
                                        <SelectTrigger id='experience-month' className="xl:h-12  mt-1">
                                            <SelectValue className="placeholder:text-[#00000012]" placeholder="Select Month" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {months.map((month) => (
                                                <SelectItem key={month.value} value={month.value}>
                                                    {month.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            {
                                errors.experience?.month && (
                                    <p className='text-red-500 text-sm mt-1'>{errors.experience.month.message}</p>
                                )
                            }
                        </div>

                        <div className='w-full'>
                            <Controller
                                name="experience.year"
                                control={form.control}
                                defaultValue={defaultValues?.experience?.year}
                                rules={{ required: "Year is required" }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value || ''}>
                                        <SelectTrigger id='experience-year' className="xl:h-12  mt-1">
                                            <SelectValue className="placeholder:text-[#00000012]" placeholder="Select Year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                getYears(1980).map((year) => (
                                                    <SelectItem key={year} value={year.toString()}>
                                                        {year}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            {
                                errors.experience?.year && (
                                    <p className='text-red-500 text-sm mt-1'>{errors.experience.year.message}</p>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className='w-full'>
                    <label htmlFor="experience" className='font-semibold text-primary'>Description</label>
                    <Textarea
                        placeholder="Enter your description"
                        rows={5}
                        {...form.register('description', { required: 'Description is required' })}
                        className='mt-1'
                        defaultValue={defaultValues?.description}
                    />
                    {form.formState.errors?.description && <span className="text-red-500">{form.formState.errors?.description?.message}</span>}
                </div>

                <div className='w-full'>
                    <label htmlFor="experience" className='font-semibold text-primary'>Languages</label>
                    <MultiSelect
                        options={languageList}
                        onValueChange={setSelectedLanguages}
                        defaultValue={defaultValues?.languages || selectedLanguages}
                        value={defaultValues?.languages}
                        placeholder="Select Languages"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                        className='mt-1'
                    />
                    {/* {selectedLanguagesError && <p className='text-red-500 text-sm mt-1'>{selectedLanguagesError}</p>} */}
                </div>

                {/* Instructor License */}
                <div className='w-full space-y-1'>
                    <label className='font-semibold text-primary'>Instructor License</label>
                    <FileUpload
                        register={form.register}
                        name="documents.instructorLicense"
                        setValue={form.setValue}
                        setError={form.setError}
                        image={instructorLicense}
                        setImage={setInstructorLicense}
                    />
                    {form.formState.errors?.documents?.instructorLicense && <p className='text-red-500 text-sm mt-1'>{form.formState.errors?.documents?.instructorLicense?.message}</p>}
                </div>

                {/* Driving License */}
                <div className='w-full space-y-1'>
                    <label className='font-semibold text-primary'>Driving License</label>
                    <FileUpload
                        register={form.register}
                        name="documents.drivingLicense"
                        setValue={form.setValue}
                        setError={form.setError}
                        image={drivingLicense}
                        setImage={setDrivingLicense}
                    />
                    {form.formState.errors?.documents?.drivingLicense && <p className='text-red-500 text-sm mt-1'>{form.formState.errors?.documents?.drivingLicense?.message}</p>}
                </div>

                {/* Experience Certificate */}
                <div className='w-full gap-5'>
                    <div className="space-y-4">
                        {fieldArray.fields.length > 0 && <label>Experience Certificates</label>}
                        {fieldArray.fields.map((field, index) => (
                            <Card key={field.id} className="p-4">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label htmlFor={`certificateType${index}`}>Certificate Type</label>
                                        {index >= 0 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => field.url ? openDeleteModal(index, field.url as string) : fieldArray.remove(index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>

                                        )}
                                    </div>

                                    <Input
                                        id={`certificateType${index}`}
                                        placeholder="e.g., Teaching Certification"
                                        {...form.register(`documents.experienceCertificates.${index}.experienceType`, {
                                            required: field.url ? "Certificate type is required" : false,
                                        })}
                                    />
                                    {errors.documents?.experienceCertificates?.[index]?.experienceType && (
                                        <p className="text-sm text-red-500">
                                            {errors.documents?.experienceCertificates?.[index]?.experienceType?.message}
                                        </p>
                                    )}

                                    <div className="space-y-2">
                                        <label htmlFor={`certificateUrl${index}`}>Upload Certificate</label>

                                        <Input
                                            id={`certificateUrl${index}`}
                                            {...form.register(`documents.experienceCertificates.${index}.url`, {
                                                validate: (value) => {
                                                    if (index === 0 && certificateType1Exist && !value) {
                                                        return "Certificate Photo is required";
                                                    }
                                                    if (index === 1 && certificateType2Exist && !value) {
                                                        return "Certificate Photo is required";
                                                    }
                                                    return true;
                                                }
                                            })}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, index)}
                                            className="hidden"
                                        />

                                        <div className='flex justify-between border border-dashed px-6 py-5'>
                                            <div
                                                className='w-16 h-16 rounded-lg overflow-hidden shadow border flex items-center justify-center text-accent'
                                            >
                                                {
                                                    field.url ? (
                                                        <Image
                                                            src={field.url}
                                                            alt="Certificate"
                                                            width={100}
                                                            height={100}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <ImageIcon size={30} />
                                                    )
                                                }
                                            </div>

                                            <div className="flex text-sm text-muted-foreground mt-2">
                                                {
                                                    field?.url ?
                                                        <div className="px-3 flex items-center text-green-500 font-semibold gap-2">
                                                            <Check width={18} height={18} />
                                                            <span className="text-[15px]">Uploaded</span>
                                                        </div> :
                                                        <button
                                                            type="button"
                                                            disabled={imageUploadLoading[index]}
                                                            onClick={() => document.getElementById(`certificateUrl${index}`)?.click()}
                                                            className="px-3 flex items-center gap-2 text-accent"
                                                        >
                                                            <Upload width={16} height={16} />
                                                            <span className="text-[15px]">{
                                                                imageUploadLoading[index] ? 'Uploading...' : 'Upload'
                                                            }
                                                            </span>
                                                        </button>
                                                }

                                                {field?.url && (
                                                    <button
                                                        className="text-accent"
                                                        type="button"
                                                        onClick={() => openDeleteModal(index, field.url as string)}
                                                    >
                                                        <X width={20} height={20} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {errors.documents?.experienceCertificates?.[index]?.url && (
                                        <p className="text-sm text-red-500">
                                            {errors.documents?.experienceCertificates?.[index]?.url?.message}
                                        </p>
                                    )}
                                </div>
                            </Card>
                        ))}

                        {fieldArray.fields.length < 2 && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fieldArray.append({ experienceType: "", url: "" })}
                                className="w-full"
                            >
                                <PlusCircle className="mr-2 h-4 w-4" />
                                {fieldArray.fields.length === 0
                                    ? "Add Experience Certificate"
                                    : "Add Another Certificate"
                                }
                            </Button>
                        )}

                        <ConfirmationModal
                            onConfirm={handleDeleteImage}
                            isOpen={modalStates.isOpen}
                            setIsOpen={(isOpen) => !isOpen && closeDeleteModal()}
                            isLoading={imageRemoveLoading}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperienceFields;