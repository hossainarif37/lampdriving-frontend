import { IResponseWithData } from "@/types/response";
import baseApi from "../baseApi";

const statsApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getLearnerStats: builder.query({
            query: () => `/stats/learner?populate=instructor`
        }),

        getAdminStats: builder.query({
            query: () => `/stats/admin`
        })
    })
})

export const { useGetLearnerStatsQuery, useGetAdminStatsQuery } = statsApi;