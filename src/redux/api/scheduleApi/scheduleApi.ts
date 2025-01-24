import { IResponseWithData, IResponseWithPaginationData } from "@/types/response";
import baseApi from "../baseApi";
import { ISchedule } from "@/types/schedule";
import { IAddress } from "@/types/user";

interface IGetSchedulesQuery {
    id: string;
    type: "lesson" | "test" | "mock-test" | "blank";
    status?: "upcoming" | "ongoing" | "completed" | "rescheduled" | "cancelled";
    searchKey: string;
    limit: string;
    page: string;
}

interface IRescheduleASchedule {
    id: string,
    data: {
        date: Date,
        time: string[],
        pickupAddress: IAddress,
        dropOffAddress?: IAddress
    }
}

const scheduleApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getInstructorAvailability: builder.query<IResponseWithData<{ schedules: [{ date: string, time: [string] }] }>, { id: string }>({
            query: ({ id }) => `/schedule/availability/${id}`,
            providesTags: ["schedule"]
        }),
        getInstructorsSchedules: builder.query<IResponseWithPaginationData<ISchedule[]>, IGetSchedulesQuery>({
            query: ({ id, type, status, searchKey, limit, page }) => `/schedule/instructor/${id}?populate=learner.user&learnerFields=user&userFields=name,email&type=${type}${status ? `&status=${status}` : "&sort=date,-status&status=upcoming&status=ongoing&status=rescheduled&status=completed"}${searchKey && `&searchKey=${searchKey}`}&limit=${limit}&page=${page}`,
            providesTags: ["schedule"]
        }),
        getASchedule: builder.query<IResponseWithData<ISchedule>, { id: string }>({
            query: ({ id }) => `/schedule/${id}?populate=learner.user,instructor.user,booking&learnerFields=user,localLicense&userFields=name,email,profileImg&instructorFields=user&bookingFields=bookingHours,price,status`,
        }),
        rescheduleASchedule: builder.mutation<IResponseWithData<ISchedule>, IRescheduleASchedule>({
            query: ({ id, data }) => ({
                url: `/schedule/reschedule/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["schedule", "booking"]
        }),
        updateAScheduleStatus: builder.mutation<IResponseWithData<ISchedule>, { id: string, status: "ongoing" | "completed" }>({
            query: ({ id, status }) => ({
                url: `/schedule/status/${id}`,
                method: "PATCH",
                body: { status }
            }),
            invalidatesTags: ["schedule", "booking"]
        }),
        createASchedule: builder.mutation<IResponseWithData<ISchedule>, Partial<ISchedule>>({
            query: (data) => ({
                url: '/schedule',
                method: "POST",
                body: data
            }),
            invalidatesTags: ["schedule", "booking"]
        })
    })
})


export const {
    useGetInstructorAvailabilityQuery,
    useGetInstructorsSchedulesQuery,
    useRescheduleAScheduleMutation,
    useUpdateAScheduleStatusMutation,
    useCreateAScheduleMutation,
    useGetAScheduleQuery } = scheduleApi; 
