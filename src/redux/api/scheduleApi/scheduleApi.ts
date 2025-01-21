import { IResponseWithData } from "@/types/response";
import baseApi from "../baseApi";
import { ISchedule } from "@/types/schedule";

const scheduleApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getInstructorAvailability: builder.query<IResponseWithData<{ schedules: [{ date: string, time: [string] }] }>, { id: string }>({
            query: ({ id }) => `/schedule/availability/${id}`
        }),
        getInstructorsSchedules: builder.query<IResponseWithData<ISchedule>, { id: string }>({
            query: ({ id }) => `/schedule/instructor/${id}`
        })
    })
})


export const { useGetInstructorAvailabilityQuery, useGetInstructorsSchedulesQuery } = scheduleApi; 