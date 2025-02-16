/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { Check, Image as ImageIcon, Upload, X } from 'lucide-react';
import { getPublicIdFromUrl } from '@/lib/utils';
import { UseFormRegister, UseFormSetError, UseFormSetValue } from 'react-hook-form';
import { IPhoto } from '@/hooks/useImage';
import { uploadFile } from '@/api/uploadFile';
import ConfirmationModal from './ConfirmationModal';
import { deleteFile } from '@/api/deleteFile';

interface FileUploadProps {
    register: UseFormRegister<any>;
    name: string;
    setValue: UseFormSetValue<any>;
    setError: UseFormSetError<any>;
    image: IPhoto;
    setImage: Dispatch<SetStateAction<IPhoto>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ register, name, setValue, setError, image, setImage }) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const [imageRemoveLoading, setImageRemoveLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setValue(name, "");

        console.log('Name: ', name);

        try {
            if (!file) {
                throw new Error('No file selected.');
            }

            setImageUploadLoading(true);
            const url = await uploadFile(file);

            if (setValue) {
                setValue(name, url);
            }

            if (setError) {
                setError(name, {
                    type: 'manual',
                    message: ''
                });
            }

            setImage((prevImage) => ({
                ...prevImage,
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
    };

    const handleDeleteImage = async () => {
        try {
            if (!image?.url) throw new Error('No image url to delete.');
            setImageRemoveLoading(true);

            const publicId = getPublicIdFromUrl(image?.url);

            if (!publicId) {
                throw new Error('Invalid image public ID.');
            }

            // Make a DELETE request to Cloudinary
            await deleteFile(publicId);

            // Reset form and state
            if (setValue) {
                setValue(name, "");
            }
            setImage({ file: null, url: "" });
            setIsModalOpen(false);

        } catch (error) {
            console.error('Error deleting image from Cloudinary:', error);
        }
        finally {
            setImageRemoveLoading(false);
        }
    };

    return (
        <div className="w-full mx-auto bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
            {/* Upload Area */}
            <div
                className={`border-2 flex justify-between border-dashed rounded-lg w-full px-6 py-5 text-center relative`}
            >
                <input
                    type="file"
                    {...register(name, { required: !image?.url ? "Please upload the photo" : false })}
                    accept='image/*'
                    id={name}
                    name={name}
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className='w-16 h-16 rounded-lg overflow-hidden shadow border flex items-center justify-center text-accent'>
                    {
                        image?.url ?
                            <Image
                                src={image.url}
                                alt="Profile"
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                            /> :
                            <ImageIcon size={30} />
                    }
                </div>

                <div className="flex items-center space-x-2">
                    {
                        image?.url ?
                            <div className="px-3 flex items-center text-green-500 font-semibold gap-2">
                                <Check width={18} height={18} />
                                <span className="text-[15px]">Uploaded</span>
                            </div>
                            :
                            <button
                                type="button"
                                disabled={imageUploadLoading}
                                onClick={() => document.getElementById(name)?.click()}
                                className="px-3 flex items-center gap-2 text-accent">
                                <Upload width={16} height={16} />
                                <span className="text-[15px]">{isError ? 'Re-Upload' : `${imageUploadLoading ? 'Uploading...' : 'Upload'}`}</span>
                            </button>
                    }

                    {image?.url && <button className='text-accent'
                        type='button'
                        onClick={() => setIsModalOpen(true)}
                    >
                        <X width={20} height={20} />
                    </button>}
                </div>
            </div>

            <ConfirmationModal
                onConfirm={handleDeleteImage}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                isLoading={imageRemoveLoading}
            />
        </div>
    );
};

export default FileUpload;