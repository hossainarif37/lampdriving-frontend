import { envConfigs } from "@/configs/envConfigs";
import { IInstructor } from "@/types/instructor";
import { IResponseWithPaginationData } from "@/types/response";

export const getInstructors = async (searchedParams: Record<string, string> | undefined): Promise<IResponseWithPaginationData<IInstructor[]>> => {
    const formattedParams = new URLSearchParams(searchedParams).toString();
    const res = await fetch(`${envConfigs.apiUrl}/instructor/verified?populate=user&${formattedParams}`);
    const data = await res.json();
    return data;
};