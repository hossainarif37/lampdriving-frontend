import { IResponseWithData, IResponseWithPaginationData } from "@/types/response";
import baseApi from "../baseApi";
import { ISchedule } from "@/types/schedule";

interface IGetSchedulesQuery {
    id: string;
    type: "lesson" | "test" | "mock-test" | "blank";
    status: "upcoming" | "ongoing" | "completed" | "rescheduled" | "cancelled";
    searchKey: string;
    limit: string;
    page: string;
}


const scheduleApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getInstructorAvailability: builder.query<IResponseWithData<{ schedules: [{ date: string, time: [string] }] }>, { id: string }>({
            query: ({ id }) => `/schedule/availability/${id}`
        }),
        getInstructorsSchedules: builder.query<IResponseWithPaginationData<ISchedule[]>, IGetSchedulesQuery>({
            query: ({ id, type, status, searchKey, limit, page }) => `/schedule/instructor/${id}?populate=learner.user&learnerFields=user&userFields=name,email&type=${type}&status=${status}${searchKey && `&searchKey=${searchKey}`}&limit=${limit}&page=${page}`
        })
    })
})


export const { useGetInstructorAvailabilityQuery, useGetInstructorsSchedulesQuery } = scheduleApi; 