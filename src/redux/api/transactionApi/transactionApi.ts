import { IResponseBase, IResponseWithData } from "@/types/response";
import baseApi from "../baseApi";

const transactionApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createPaymentIntent: builder.mutation<IResponseWithData<{ clientSecret: string }>, { price: number }>({
            query: (data) => ({
                url: '/payment/payment-intent',
                method: "POST",
                body: data
            }),
        }),

        createInstructorPayout: builder.mutation<IResponseWithData<{ instructorId: string, transactionId: string }>, { instructorId: string, transactionId: string }>({
            query: (data) => ({
                url: `/payment/pay-instructor/${data.instructorId}`,
                method: "POST",
                body: { transactionId: data.transactionId }
            }),
            invalidatesTags: ["wallet"]
        }),

        getTransactionHistory: builder.query({
            query: () => `/payment/my`,
        })
    })
})

export const { useCreatePaymentIntentMutation, useCreateInstructorPayoutMutation, useGetTransactionHistoryQuery } = transactionApi