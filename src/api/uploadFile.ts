import { envConfigs } from "@/configs/envConfigs";

export const uploadFile = async (file: File) => {
    // Create a FormData object
    const formData = new FormData();
    formData.append('image', file!);

    // Make a POST request to Cloudinary's upload API
    const response = await fetch(`${envConfigs.apiUrl}/media/upload-image`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Upload failed");

    return data?.data;
};