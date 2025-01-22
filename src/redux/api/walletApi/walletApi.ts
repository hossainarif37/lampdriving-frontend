import { IResponseWithData } from "@/types/response";
import baseApi from "../baseApi";

const walletApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getWalletBalance: builder.query({
            query: ({ id }) => `/wallet/${id}`
        }),
    })
})

export const { useGetWalletBalanceQuery } = walletApi;