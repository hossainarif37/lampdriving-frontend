import { IResponseWithData } from "@/types/response";
import baseApi from "../baseApi";

const statsApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getLearnerStats: builder.query({
            query: () => `/stats/learner?populate=instructor`
        })
    })
})

export const { useGetLearnerStatsQuery } = statsApi;