import { IResponseWithData } from "@/types/response";
import baseApi from "../baseApi";
import { IInstructor } from "@/types/instructor";

const instructorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAInstructor: builder.query<IResponseWithData<IInstructor>, { username: string }>({
            query: ({ username }) => `/instructor/${username}`
        })
    })
})


export const { useGetAInstructorQuery } = instructorApi;