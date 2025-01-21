import { IResponseWithData } from "@/types/response";
import baseApi from "../baseApi";

const scheduleApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getInstructorAvailability: builder.query<IResponseWithData<{ schedules: [{ date: string, time: [string] }] }>, { id: string }>({
            query: ({ id }) => `/schedule/availability/${id}`
        })
    })
})


export const { useGetInstructorAvailabilityQuery } = scheduleApi; 