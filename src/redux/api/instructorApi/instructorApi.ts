import { IResponseWithData, IResponseWithPaginationData } from "@/types/response";
import baseApi from "../baseApi";
import { IInstructor } from "@/types/instructor";

interface IAllInstructorQueryFields {
    limit: string;
    page: string;
    searchKey: string;
    status?: "pending" | "verified" | "rejected";
    userStatus?: "blocked" | "active";
}

const instructorApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getAInstructor: builder.query<IResponseWithData<IInstructor>, { username: string }>({
            query: ({ username }) => `/instructor/${username}?populate=user`
        }),
        getAInstructorByAdmin: builder.query<IResponseWithData<IInstructor>, { id: string }>({
            query: ({ id }) => `/instructor/instructor-all-data/${id}?populate=wallet,user&fields=-bookings&walletFields=balance&userFields=-role,-isDeleted,-instructor`
        }),
        getAllInstructors: builder.query<IResponseWithPaginationData<IInstructor[]>, IAllInstructorQueryFields>({
            query:
                ({ status = '', searchKey, limit, page, userStatus = "active" }) =>
                    `/instructor/all?${status && `status=${status}&`}${userStatus && `userStatus=${userStatus}&`}${searchKey && `&searchKey=${searchKey}&`}populate=user&limit=${limit}&page=${page}`,
            providesTags: ["instructor"]
        }),
        updateInstructorStatus: builder.mutation<IResponseWithData<IInstructor>, { id: string, status: "pending" | "verified" | "rejected" }>({
            query: ({ id, status }) => ({
                url: `/instructor/status/${id}`,
                method: "PATCH",
                body: { status }
            }),
            invalidatesTags: ["instructor"]
        }),

        getInstructorsByServiceAreas: builder.query({
            query: (serviceAreas) => `/instructor/verified?populate=user&fields=user,serviceAreas&limit=4&userFields=name,profileImg,username&serviceAreas=${serviceAreas.join('|')}`,
        }),
    })
})


export const { useGetAInstructorQuery, useGetAInstructorByAdminQuery, useGetAllInstructorsQuery, useUpdateInstructorStatusMutation, useGetInstructorsByServiceAreasQuery } = instructorApi;