import { IResponseWithData } from "@/types/response";
import baseApi from "../baseApi";

const walletApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getWalletBalance: builder.query({
            query: ({ id }) => `/wallet/${id}`
        }),

        getAllWallet: builder.query({
            query: () => `/wallet/all?populate=instructor,instructor.user&balance.currentBalance[$gt]=1&instructorFields=user,completedLessons`
        })
    })
})

export const { useGetWalletBalanceQuery, useGetAllWalletQuery } = walletApi;