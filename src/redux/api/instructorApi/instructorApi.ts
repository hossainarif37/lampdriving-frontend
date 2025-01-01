import { IResponseWithData } from "@/types/response";
import baseApi from "../baseApi";
import { IInstructor } from "@/types/instructor";

const instructorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAInstructor: builder.query<IResponseWithData<IInstructor>, { username: string }>({
            query: ({ username }) => `/instructor/${username}`
        }),
        getInstructorAvailability: builder.query<IResponseWithData<{ schedules: [{ date: string, time: [string] }] }>, { id: string, date: string }>({
            query: ({ id, date }) => `/instructor/availability/${id}/${date}`
        })
    })
})


export const { useGetAInstructorQuery, useGetInstructorAvailabilityQuery } = instructorApi;