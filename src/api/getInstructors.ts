import { envConfigs } from "@/configs/envConfigs";
import { IInstructor } from "@/types/instructor";
import { IResponseWithPaginationData } from "@/types/response";

export const getInstructors = async (): Promise<IResponseWithPaginationData<IInstructor[]>> => {
    const res = await fetch(`${envConfigs.apiUrl}/instructor/verified?populate=user`);
    const data = await res.json();
    return data;
};