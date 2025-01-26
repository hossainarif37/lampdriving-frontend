import { IResponseWithData, IResponseWithPaginationData } from "@/types/response";
import baseApi from "../baseApi";
import { ILearner } from "@/types/learner";

interface ILearnerQueryFields {
    limit: string;
    page: string;
    searchKey: string;
    userStatus: "active" | "blocked" | "";
}

const learnerApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getAllLearners: builder.query<IResponseWithPaginationData<ILearner[]>, ILearnerQueryFields>({
            query:
                ({ limit, page, searchKey, userStatus }) =>
                    `/learner?${searchKey && `searchKey=${searchKey}&`}${userStatus && `userStatus=${userStatus}&`}populate=user&limit=${limit}&page=${page}`,
            providesTags: ["learner"]
        }),
        getALearner: builder.query<IResponseWithData<ILearner>, { id: string }>({
            query: ({ id }) => `/learner/${id}?populate=user`
        })
    })
})


export const { useGetAllLearnersQuery, useGetALearnerQuery } = learnerApi;