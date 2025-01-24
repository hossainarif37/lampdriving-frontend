import { IResponseWithData } from "@/types/response";
import baseApi from "../baseApi";
import { IWallet } from "@/types/wallet";

const walletApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getInstructorWallet: builder.query<IResponseWithData<IWallet>, { instructorId: string }>({
            query: ({ instructorId }) => `/wallet/instructor/${instructorId}`
        }),

        getAllWallet: builder.query({
            query: () => `/wallet/all?populate=instructor,instructor.user&balance.currentBalance[$gt]=1&instructorFields=user,completedLessons`,
            providesTags: ["wallet"]
        }),

        getAdminWallet: builder.query({
            query: () => `/wallet/admin`,
            providesTags: ["wallet"]
        })
    })
})

export const { useGetInstructorWalletQuery, useGetAllWalletQuery, useGetAdminWalletQuery } = walletApi;