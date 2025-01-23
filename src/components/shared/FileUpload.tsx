/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Check, CloudUpload, Upload, X } from 'lucide-react';
import { extractFileDetails, generateUniqueIdentifier, toFixedNumber } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface FileUploadProps {
    label?: string;
    maxSize?: string;
    setImageUrl?: (url: string) => void;
    setImageError?: (error: string) => void;
    selectedFile: File | null;
    setSelectedFile: (file: File | null) => void;
    imageUrl: string | null;
    removeImage: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ label = "Click to upload", maxSize = "1500×1500px", setImageUrl, setImageError, selectedFile, setSelectedFile, imageUrl, removeImage }) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isError, setIsError] = useState(false);
    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const [imageDetails, setImageDetails] = useState({
        fileName: '',
        size: ''
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (setSelectedFile) {
                setSelectedFile(file);
            }
        }
    };

    const handleUploadFile = async () => {
        try {
            const uniqueIdentifier = generateUniqueIdentifier(selectedFile!);
            setImageUploadLoading(true);
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
            if (!cloudName || !uploadPreset) {
                throw new Error('Cloudinary credentials are missing.');
            }
            // Create a FormData object
            const formData = new FormData();
            formData.append('file', selectedFile!);
            formData.append('upload_preset', uploadPreset);
            formData.append('cloud_name', cloudName);
            formData.append('public_id', uniqueIdentifier);

            // Make a POST request to Cloudinary's upload API
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (setImageUrl) {
                setImageUrl(data.secure_url);
            }

            setIsSuccess(true);
            setIsError(false);
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            toast({
                success: false,
                message: 'Error uploading image to Cloudinary',
            })
        }
        finally {
            setImageUploadLoading(false);
        }
    };


    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };


    useEffect(() => {
        if (imageUrl && imageUrl.startsWith('blob:')) {
            blobUrlToFile(imageUrl);
        }
    }, [imageUrl]);

    useEffect(() => {
        if (imageUrl) {
            const decodeImageURI = decodeURIComponent(imageUrl);
            const fileDetails = extractFileDetails(decodeImageURI);

            if (fileDetails) {
                setImageDetails(fileDetails);
            }
        }
    }, [imageUrl]);

    const blobUrlToFile = async (blobUrl: string) => {
        try {
            const response = await fetch(blobUrl);
            const blob = await response.blob();

            // Create a File object from the Blob
            const fileName = 'image'; // You might want to generate a more meaningful name
            const fileExtension = blob.type.split('/')[1];
            const file = new File([blob], `${fileName}.${fileExtension}`, { type: blob.type });

            // Update the selectedFile state with the new File object
            setSelectedFile(file);

        } catch (error) {
            console.error('Error converting Blob URL to File:', error);
        }
    };

    return (
        <div className="w-full mx-auto bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            {/* Upload Area */}
            {(!imageUrl && !selectedFile) && (
                <div
                    className={`border-2 ${isDragging ? 'border-blue-400' : 'border-gray-300'} border-dashed rounded-lg w-full px-6 py-5 text-center relative`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                >
                    <input
                        type="file"
                        accept='image/*'
                        ref={inputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <label className="flex flex-col justify-center items-center cursor-pointer">
                        <span className="mb-2 text-primary"><CloudUpload /></span>
                        <span className="text-primary text-sm"><span className="font-semibold">{label}</span> or drag and drop</span>
                        <span className="text-gray-500 mt-2">SVG, PNG or JPG (max. {maxSize})</span>
                    </label>
                </div>
            )}

            {/* File Info (only if a file is selected) */}
            {(imageUrl || selectedFile) && (
                <div className={`border ${isError ? 'bg-[#FFF5F3] border-[#E12525]' : 'border-gray-300'}  rounded-lg w-full ${(!isSuccess || selectedFile) ? 'mt-4' : 'mt-0'} p-4 flex items-center justify-between`}>
                    <div className="flex items-center">
                        <Image
                            src={imageUrl || (selectedFile ? URL.createObjectURL(selectedFile) : '')}
                            alt={selectedFile?.name || 'Selected file'}
                            width={48}
                            height={48}
                            className="object-cover rounded-md mr-4 border"
                        />

                        <div>
                            <p className="font-medium">{selectedFile?.name || imageDetails?.fileName}</p>
                            <p className="text-gray-500 text-sm">
                                {selectedFile?.size ? (toFixedNumber(selectedFile.size / 1024)) : (toFixedNumber(Number(imageDetails?.size) / 1024))}kb, Added just now
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        {
                            imageUrl ?
                                <div className="px-3 flex items-center text-green-500 font-semibold gap-2">
                                    <Check width={18} height={18} />
                                    <span className="text-[15px]">Uploaded</span>
                                </div>
                                :
                                <button type="button" onClick={handleUploadFile} className="px-3 flex items-center gap-2 text-accent">
                                    <Upload width={16} height={16} />
                                    <span className="text-[15px]">{isError ? 'Re-Upload' : `${imageUploadLoading ? 'Uploading...' : 'Upload'}`}</span>
                                </button>
                        }

                        {/* Edit Image Button */}
                        {/* <button type='button' className='text-accent'>
                            <SquarePen width={17} height={17} />
                        </button> */}
                        <button className='text-accent'
                            type='button'
                            onClick={removeImage}
                        >
                            <X width={20} height={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;