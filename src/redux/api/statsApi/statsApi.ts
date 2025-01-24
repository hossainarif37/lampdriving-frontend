import { IResponseWithData } from "@/types/response";
import baseApi from "../baseApi";
import { IInstructorStats } from "@/types/stats";

const statsApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getLearnerStats: builder.query({
            query: () => `/stats/learner?populate=instructor`
        }),

        getInstructorStats: builder.query<IResponseWithData<IInstructorStats>, { instructorId: string }>({
            query: () => `/stats/instructor?populate=learner.user&userFields=name&learnerFields=user`
        }),

        getAdminStats: builder.query({
            query: () => `/stats/admin?populate=learner.user&learnerFields=user`
        })
    })
})

export const { useGetLearnerStatsQuery, useGetAdminStatsQuery, useGetInstructorStatsQuery } = statsApi;