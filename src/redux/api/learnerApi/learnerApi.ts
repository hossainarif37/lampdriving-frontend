import { IResponseWithPaginationData } from "@/types/response";
import baseApi from "../baseApi";
import { ILearner } from "@/types/learner";

const learnerApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getAllLearners: builder.query<IResponseWithPaginationData<ILearner[]>, { status: "pending" | "verified" | "rejected", searchKey: string, limit: string, page: string }>({
            query:
                ({ status, searchKey, limit, page }) =>
                    `/learner/all?status=${status}${searchKey && `&searchKey=${searchKey}`}&populate=user&limit=${limit}&page=${page}`,
            providesTags: ["learner"]
        })

    })
})


export const { useGetAllLearnersQuery } = learnerApi;