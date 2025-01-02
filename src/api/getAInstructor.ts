import { envConfigs } from "@/configs/envConfigs";
import { IInstructor } from "@/types/instructor";
import { IResponseWithData } from "@/types/response";

export const getAInstructor = async (username: string): Promise<IResponseWithData<IInstructor>> => {
    const response = await fetch(`${envConfigs.apiUrl}/instructor/${username}`)
    const data = response.json();
    return data;
}