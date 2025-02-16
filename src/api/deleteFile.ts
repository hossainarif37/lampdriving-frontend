import { envConfigs } from "@/configs/envConfigs";

export const deleteFile = async (publicId: string) => {
    const response = await fetch(`${envConfigs.apiUrl}/media/delete-image`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Delete failed");
    return data;
};