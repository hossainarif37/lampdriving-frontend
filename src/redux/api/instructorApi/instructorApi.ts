import { IResponseWithData, IResponseWithPaginationData } from "@/types/response";
import baseApi from "../baseApi";
import { IInstructor } from "@/types/instructor";

const instructorApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getAInstructor: builder.query<IResponseWithData<IInstructor>, { username: string }>({
            query: ({ username }) => `/instructor/${username}`
        }),
        getInstructorAvailability: builder.query<IResponseWithData<{ schedules: [{ date: string, time: [string] }] }>, { id: string }>({
            query: ({ id }) => `/instructor/availability/${id}`
        }),
        getAllInstructors: builder.query<IResponseWithPaginationData<IInstructor[]>, { status: "pending" | "verified" | "rejected", searchKey: string, limit: string, page: string }>({
            query:
                ({ status, searchKey, limit, page }) =>
                    `/instructor/all?status=${status}${searchKey && `&searchKey=${searchKey}`}&populate=user&limit=${limit}&page=${page}`,
            providesTags: ["instructor"]
        }),
        updateInstructorStatus: builder.mutation<IResponseWithData<IInstructor>, { id: string, status: "pending" | "verified" | "rejected" }>({
            query: ({ id, status }) => ({
                url: `/instructor/status/${id}`,
                method: "PATCH",
                body: { status }
            }),
            invalidatesTags: ["instructor"]
        })
    })
})


export const { useGetAInstructorQuery, useGetInstructorAvailabilityQuery, useGetAllInstructorsQuery, useUpdateInstructorStatusMutation } = instructorApi;