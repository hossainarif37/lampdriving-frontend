import { IResponseWithData } from "@/types/response";
import baseApi from "../baseApi";
import { IInstructor } from "@/types/instructor";

const instructorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAInstructor: builder.query<IResponseWithData<IInstructor>, { username: string }>({
            query: ({ username }) => `/instructor/${username}`
        }),
        getInstructorAvailability: builder.query<IResponseWithData<{ schedules: [{ date: string, time: [string] }] }>, { id: string }>({
            query: ({ id }) => `/instructor/availability/${id}`
        })
    })
})


export const { useGetAInstructorQuery, useGetInstructorAvailabilityQuery } = instructorApi;