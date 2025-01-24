import { IResponseBase, IResponseWithData } from "@/types/response";
import baseApi from "../baseApi";
import { IWallet } from "@/types/wallet";

const walletApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getInstructorWallet: builder.query<IResponseWithData<IWallet>, { instructorId: string }>({
            query: ({ instructorId }) => `/wallet/instructor/${instructorId}`,
            providesTags: ["wallet"]
        }),
        getAllWallet: builder.query({
            query: () => `/wallet/all?populate=instructor,instructor.user&balance.currentBalance[$gt]=1&instructorFields=user,completedLessons`,
            providesTags: ["wallet"]
        }),
        getAdminWallet: builder.query({
            query: () => `/wallet/admin`,
            providesTags: ["wallet"]
        }),
        addBankAccount: builder.mutation<IResponseBase, { walletId: string, payId: string }>({
            query: ({ walletId, payId }) => ({
                url: `/wallet/bank-account/${walletId}`,
                method: "PATCH",
                body: { payId }
            }),
            invalidatesTags: ["wallet"]
        })
    })
})

export const { useGetInstructorWalletQuery, useGetAllWalletQuery, useGetAdminWalletQuery, useAddBankAccountMutation } = walletApi;