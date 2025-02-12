"use client"

import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { ImagePlus, LoaderIcon, User, X } from 'lucide-react';
import { getPublicIdFromUrl } from '@/lib/utils';
import { Path, PathValue, UseFormRegister, UseFormSetError, UseFormSetValue } from 'react-hook-form';
import { uploadFile } from '@/api/uploadFile';
import { deleteFile } from '@/api/deleteFile';
import ConfirmationModal from './ConfirmationModal';

export interface IPhoto {
    file: File | null;
    url: string | undefined;
}

interface IPhotoUploadProps<T extends { profileImg?: string }> {
    profilePhoto: IPhoto;
    setProfilePhoto: Dispatch<SetStateAction<IPhoto>>;
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
    setError: UseFormSetError<T>;
    isRemoveUrl?: boolean;
}

const PhotoUpload = <T extends { profileImg?: string }>({
    profilePhoto,
    setProfilePhoto,
    register,
    setValue,
    setError,
    isRemoveUrl,
}: IPhotoUploadProps<T>) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const [imageRemoveLoading, setImageRemoveLoading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        setIsSuccess(false);
        const file = e.target.files?.[0];

        if (setValue && isRemoveUrl) {
            setValue('profileImg' as Path<T>, "" as PathValue<T, Path<T>>);
        }

        setProfilePhoto((prev) => (
            {
                ...prev,
                file: file || null,
                url: isRemoveUrl ? undefined : prev.url
            }
        ));

        try {
            if (!file) {
                throw new Error('No file selected.');
            }

            setImageUploadLoading(true);
            const url = await uploadFile(file);

            if (setValue) {
                setValue('profileImg' as Path<T>, url as PathValue<T, Path<T>>);
            }
            if (setError) {
                setError('profileImg' as Path<T>, {
                    type: 'manual',
                    message: ''
                });
            }

            setProfilePhoto((prev) => ({
                ...prev,
                url: url
            }));

            setIsSuccess(true);
            setIsError(false);

        } catch (error) {

            console.error('Error uploading image to Cloudinary:', error);
        }
        finally {
            setImageUploadLoading(false);
        }
    }



    const handleDeleteImage = async () => {
        try {
            if (!profilePhoto?.url) throw new Error('No image url to delete.');
            setImageRemoveLoading(true);

            const publicId = getPublicIdFromUrl(profilePhoto.url);

            if (!publicId) {
                throw new Error('Invalid image public ID.');
            }

            // Make a DELETE request to Cloudinary
            await deleteFile(publicId);

            // Reset form and state
            if (setValue) {
                setValue('profileImg' as Path<T>, "" as PathValue<T, Path<T>>);
            }
            setProfilePhoto({ file: null, url: "" });
            setIsModalOpen(false);

        } catch (error) {
            console.error('Error deleting image from Cloudinary:', error);
        }
        finally {
            setImageRemoveLoading(false);
        }
    };


    console.log('profilePhoto', profilePhoto);


    return (
        <div className='w-full flex justify-center mt-10'>
            <div className='relative'>
                {/* Image */}
                <div className={`w-[170px] h-[170px] rounded-2xl overflow-hidden shadow-lg border flex items-center justify-center text-accent`}>
                    {
                        profilePhoto?.file || profilePhoto?.url ?
                            <Image
                                src={profilePhoto?.url || (profilePhoto?.file ?
                                    URL.createObjectURL(profilePhoto.file) : '')}
                                alt="Profile Image"
                                className='w-full'
                                width={150}
                                height={150}
                            />
                            :
                            <User size={60} />
                    }
                </div>

                {/* File Input */}
                <input
                    accept='image/*'
                    {...register?.('profileImg' as Path<T>, {
                        required: !profilePhoto?.url ? "Please upload a profile photo" : false
                    })}
                    onChange={handleFileUpload}
                    className='hidden'
                    type="file"
                    name="image"
                    id="image"
                />

                {
                    !profilePhoto?.url && (
                        <Button
                            type='button'
                            disabled={imageUploadLoading}
                            onClick={() => document.getElementById('image')?.click()} className='text-primary border cursor-pointer font-bold bg-light hover:bg-light shadow-lg mx-auto text-sm capitalize w-36 h-9 rounded-lg flex justify-center items-center gap-2 -translate-y-5'>
                            {
                                imageUploadLoading ?
                                    <span className='flex items-center gap-x-2'>
                                        <LoaderIcon className='animate-spin' width={16} height={16} /><span>Uploading..</span>
                                    </span>
                                    :
                                    <span className='flex items-center gap-x-2'>
                                        <ImagePlus width={16} height={16} /><span>Choose</span>
                                    </span>
                            }

                        </Button>
                    )
                }

                {
                    profilePhoto?.file || profilePhoto?.url ? (
                        <Button
                            disabled={imageUploadLoading}
                            size={"icon"}
                            type='button'
                            title='Remove Image'
                            onClick={() => setIsModalOpen(true)}
                            className='absolute top-0 right-0 shadow-lg bg-primary hover:bg-red-500 -translate-y-3 translate-x-3 rounded-lg flex justify-center items-center'
                        >
                            <X />
                        </Button>
                    ) : null
                }

                <ConfirmationModal
                    onConfirm={handleDeleteImage}
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    isLoading={imageRemoveLoading}
                />

            </div>
        </div>
    );
};

export default PhotoUpload;