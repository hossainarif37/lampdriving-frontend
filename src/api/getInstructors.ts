import { envConfigs } from "@/configs/envConfigs";
import { IInstructor } from "@/types/instructor";
import { IResponseWithPaginationData } from "@/types/response";

export const getInstructors = async (searchedParams: Record<string, string> | undefined): Promise<IResponseWithPaginationData<IInstructor[]>> => {
    const formattedParams = new URLSearchParams(searchedParams).toString();
    const res = await fetch(`${envConfigs.apiUrl}/instructor/verified?populate=user&${formattedParams}`);
    const data = await res.json();
    return data;
};


export const getInstructorByName = async (name: string): Promise<IInstructor | null> => {
  try {
    const res = await fetch(`${envConfigs.apiUrl}/instructor/verified?populate=user&name=${name}`);
    if (!res.ok) {
      console.error("Failed to fetch instructor details");
      return null;
    }
    const data = await res.json();
    // Assuming the API returns an array of instructors
    return data?.data?.[0] || null; // Return the first instructor if found
  } catch (error) {
    console.error("Error fetching instructor details:", error);
    return null;
  }
};