import { useState } from 'react';

export interface IProfilePhoto {
    file: File | null;
    url: string | undefined;
}

export function useImage(initialUrl: string | undefined) {
    const [profilePhoto, setProfilePhoto] = useState<IProfilePhoto>({
        file: null,
        url: initialUrl,
    });

    const isImageModified = profilePhoto.url !== initialUrl;

    const validateImage = () => {
        if (profilePhoto.file && !profilePhoto.url) {
            alert('Please upload the profile image before submitting.');
            return false;
        }
        return true;
    };

    return {
        profilePhoto,
        setProfilePhoto,
        isImageModified,
        validateImage,
    };
}
