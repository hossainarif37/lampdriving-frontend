import { envConfigs } from "@/configs/envConfigs";
import { IInstructor } from "@/types/instructor";
import { IResponseWithData } from "@/types/response";

export const getAInstructor = async (username: string): Promise<IResponseWithData<IInstructor>> => {
    const response = await fetch(`${envConfigs.apiUrl}/instructor/${username}?populate=user&fields=-workingHour`)
    const data = await response.json();
    return data;
}