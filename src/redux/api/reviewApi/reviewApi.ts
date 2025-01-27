import { IResponseBase, IResponseWithPaginationData } from "@/types/response";
import baseApi from "../baseApi";
import { ICreateAReviewReqData, IReview } from "@/types/review";


const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query<IResponseWithPaginationData<IReview[]>, { id: string }>({
            query: ({ id }) => `/review/${id}`
        }),
        createAReview: builder.mutation<IResponseBase, ICreateAReviewReqData>({
            query: (reqData) => ({
                url: `/review`,
                method: 'POST',
                body: reqData
            })
        }),

        getInstructorReviews: builder.query<IResponseWithPaginationData<IReview[]>, { username: string }>({
            query: ({ username }) => `/review/instructor/${username}`
        }),
    })
})

export const { useGetReviewsQuery, useCreateAReviewMutation, useGetInstructorReviewsQuery } = reviewApi;