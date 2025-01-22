import { IResponseWithData } from "@/types/response";
import baseApi from "../baseApi";

const walletApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getWalletBalance: builder.query({
            query: ({ instructorId }) => `/wallet/${instructorId}`
        }),

        getAllWallet: builder.query({
            query: () => `/wallet/all?populate=instructor,instructor.user&balance.currentBalance[$gt]=1&instructorFields=user,completedLessons`
        }),

        getAdminWallet: builder.query({
            query: () => `/wallet/admin`
        })
    })
})

export const { useGetWalletBalanceQuery, useGetAllWalletQuery, useGetAdminWalletQuery } = walletApi;