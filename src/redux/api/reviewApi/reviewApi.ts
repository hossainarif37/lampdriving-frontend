import { IResponseWithPaginationData } from "@/types/response";
import baseApi from "../baseApi";
import { IReview } from "@/types/review";


const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query<IResponseWithPaginationData<IReview[]>, { id: string }>({
            query: ({ id }) => `/review/${id}`
        })
    })
})

export const { useGetReviewsQuery } = reviewApi;