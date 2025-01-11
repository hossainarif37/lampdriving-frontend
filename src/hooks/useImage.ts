import { useState, useEffect } from 'react';

export interface IProfilePhoto {
    file: File | null;
    url: string | undefined;
}

export function useImage(initialUrl: string | undefined) {
    const [profilePhoto, setProfilePhoto] = useState<IProfilePhoto>(() => {
        console.log('Initializing profilePhoto state with:', initialUrl);
        return {
            file: null,
            url: initialUrl
        };
    });

    useEffect(() => {
        if (initialUrl !== profilePhoto.url) {
            console.log('Updating profilePhoto due to initialUrl change:', initialUrl);
            setProfilePhoto(prev => ({
                ...prev,
                url: initialUrl
            }));
        }
    }, [initialUrl]);

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
