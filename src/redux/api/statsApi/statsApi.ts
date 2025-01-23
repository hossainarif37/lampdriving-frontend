import { IResponseWithData } from "@/types/response";
import baseApi from "../baseApi";

const statsApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getLearnerStats: builder.query({
            query: () => `/stats/learner?populate=instructor`
        }),

        getInstructorStats: builder.query({
            query: () => `/stats/instructor?populate=learner.user&userFields=name&learnerFields=user`
        }),

        getAdminStats: builder.query({
            query: () => `/stats/admin?populate=learner.user&learnerFields=user`
        })
    })
})

export const { useGetLearnerStatsQuery, useGetAdminStatsQuery, useGetInstructorStatsQuery } = statsApi;