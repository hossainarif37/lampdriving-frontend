import { IResponseWithData, IResponseWithPaginationData } from "@/types/response";
import baseApi from "../baseApi";
import { ILearner } from "@/types/learner";

const learnerApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getAllLearners: builder.query<IResponseWithPaginationData<ILearner[]>, { limit: string, page: string }>({
            query:
                ({ limit, page }) =>
                    `/learner?populate=user&limit=${limit}&page=${page}`,
            providesTags: ["learner"]
        }),
        getALearner: builder.query<IResponseWithData<ILearner>, { id: string }>({
            query: ({ id }) => `/learner/${id}?populate=user`
        })
    })
})


export const { useGetAllLearnersQuery, useGetALearnerQuery } = learnerApi;